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
            <div class="px-0 py-2 flex">
                <div class="px-0 flex justify-center font-semibold">
                    {{ $t('course') }} <VTooltip :triggers="['click']" :placements="'top-start'" class="ml-2 cursor-pointer active:opacity-50">
                        <a>
                            <InformationCircleIcon class="w-6 text-gray-400" />
                        </a>

                        <template #popper>
                            {{ $t('buygoldtooltip') }}
                        </template>
                    </VTooltip>
                </div>
                <div class="px-0 text-sm text-right justify-center flex-1">
                    {{ $n(orderPreview?.gram_price_trading/100) }} {{ currency }}
                </div>
            </div>


            <ListItem :title="$t('totalAmount')">{{ $n(orderPreview?.amount / 1000) }} g</ListItem>
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
            <p class="text-sm font-thin text-gray-400">{{ $t('purchaseSellNote') }}</p>
            <p class="text-sm font-thin text-gray-400 mt-3">*) {{ $t('sellingNoteOnExecutionDate') }}</p>
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
import { OrderPreview, Depot, PaymentAccount, Condition, PlaceOrderModel, ConfirmationMethod } from '@/lib/models';
import ListItem from '@/components/common/ListItem';
import { AssetTradingService, CurrencyService } from '~~/lib/services';
import { PaymentMethods } from '~~/lib/contants/PaymentMethods';
import InLineApiError from '@/components/common/InLineApiError'
const currency = CurrencyService.getCurrencySymbol();
const { t } = useI18n();
import Switch from '@/components/common/AppSwitch.vue';
import { ArrowDownTrayIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';
import { AssetTypes, OrderTypes, TransactionTypes } from '@/lib/contants';
import { formatIban } from '@/lib/Formatters';
import { PaymentAccountSpecs } from '@/lib/contants';
import { PlaceOrderRequest } from '@/lib/requests';
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
    }
})

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

        order_approval_method: props.confirmationMethod
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
