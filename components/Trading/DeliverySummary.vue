<template>
    <div>
        <h2 class="text-center mb-8 text-2xl font-bold">{{ $t('orderOverview') }}</h2>
        <div>
            <img :src="orderPreview?.logo" class="w-32 h-auto mb-5 mx-auto" />
        </div>
        <h2 class="text-center mb-8 text-2xl mt-3">{{ title }}</h2>
        <div class="divide-y">
            <ListItem :title="$t('depot')">{{ depot?.name }}</ListItem>
            <ListItem :title="$t('execution')">{{ $t('asSoonAsPossible') }}</ListItem>
            
            <ListItem :title="$t('deliveryAddress')">{{ deliveryAddress }}</ListItem>
            <ListItem :title="$t('shippingCost')">{{ $n(orderPreview?.fee / 100) }} {{currency}}</ListItem>
            <ListItem :title="$t('delivery')"><span class="font-semibold">{{ $n(orderPreview?.amount / 1000) }} g</span></ListItem>
        </div>
        <div class="relative flex items-start py-4" v-for="c in conditions" :key="c.id">
            <div class="min-w-0 flex-1 text-sm">
                <label for="comments" class="text-gray-700">{{ c.title }}</label>
                <a class="block text-xs text-blue-600 cursor-pointer flex" v-if="c.document" :href="c.document.link"
                    target="_blank">
                    <ArrowDownTrayIcon class="h-4 w-4 text-blue-600 mr-1" />{{ $t('download_document') }}
                </a>
            </div>
            <div class="ml-3 flex h-5 items-center">
                <Switch @change="(value) => checkCondition(value, c)" />
            </div>
        </div>
        <div>
           
            <p class="text-sm font-thin text-gray-400 mt-3">*) {{ $t('TakingIntoAccountTheValidWorkingHours') }}</p>
        </div>
        <div class="mt-8">
            <button type="submit" :disabled="isSubmitting || !activateConfirmation" @click.prevent="execute"
                :class="(isSubmitting || !activateConfirmation) ? 'opacity-50' : 'opacity-100'"
                class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{
                    $t('confirm') }}</button>
            <InLineApiError :err="submitErr" />
        </div>

    </div>
</template>
<script lang="ts" setup>
import { ref, PropType } from 'vue';
import { OrderPreview, Depot, Condition, PlaceOrderModel } from '@/lib/models';
import ListItem from '@/components/common/ListItem';
import { AssetTradingService, CurrencyService } from '~~/lib/services';
import InLineApiError from '@/components/common/InLineApiError'
const currency = CurrencyService.getCurrencySymbol();
import Switch from '@/components/common/AppSwitch.vue';
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import { AssetTypes, OrderTypes, TransactionTypes } from '@/lib/contants';
import { AccountStorage } from '@/storage';
import { PlaceOrderRequest } from '@/lib/requests';
const {t} = useI18n();
const props = defineProps({
    orderPreview: {
        type: Object as PropType<OrderPreview>
    },
    depot: {
        type: Object as PropType<Depot>
    },
    title: {
        type: String
    },
    type: {
        type: String
    },
    confirmationMethod: {
        type: String
    },
    comment: {
        type: String
    }
})
onMounted(()=>{
    try{
        const account = AccountStorage.getAccount();
        if(account && account.address){
            deliveryAddress.value = account.address.line1+'\n' + account.address.postal_code +' '+ account.address.city
        }
        else{
            deliveryAddress.value = t('noAddressAvailable');
        }
    }
    catch(err){
        console.log(err);
    }
})
const deliveryAddress = ref('');
const activateConfirmation = computed(() => {
    if (checkedConditions.value.length == conditions.value.length) {
        return true
    } else {
        return false;
    }
})
const checkedConditions = ref(new Array<number>());
const isSubmitting = ref(false);
const submitErr = ref(null);
const checkCondition = (value: boolean, c: Condition) => {
    if (value) {
        checkedConditions.value.push(c.id);
    }
    else {
        let index = checkedConditions.value.indexOf(c.id);
        if (index >= 0) {
            checkedConditions.value.splice(index, 1);
        }
    }
}
const emit = defineEmits<{
    (e: 'onPlace', { }): void
}>()
const execute = async () => {
    const request: PlaceOrderRequest = {
        order_type_id: props.orderPreview?.order_type_id,
        amount: props.orderPreview?.amount,
        unit: "gram",
        depot_id: props.depot?.id,
        conditions: checkedConditions.value.join(','),
        
        order_approval_method: props.confirmationMethod,
        comment:props.comment
    };
    
    try {
        isSubmitting.value = true;

        const PlaceOrderInfo: PlaceOrderModel = await AssetTradingService.placeOrder(request);
        emit("onPlace", {
            placedOrderinfo: PlaceOrderInfo,
            placeOrderRequest: request
        })

    }
    catch (err: any) {
        submitErr.value = err;
    }
    finally {
        isSubmitting.value = false
    }
}
const conditions = computed(() => {
    if (props.orderPreview) {
        if (props.type == TransactionTypes.sell && props.depot?.depot_type?.name_translation_key.toLocaleUpperCase() == AssetTypes.gold.toLocaleUpperCase()) {
            return props.orderPreview.conditions.gold_one_time
        }
        else{
            return props.orderPreview.conditions.silver_one_time
        }
    }
    return []
})
</script>