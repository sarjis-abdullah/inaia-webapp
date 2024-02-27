<template>
    <div>
        <h2 class="text-center mb-8 text-2xl font-bold">{{ $t('orderOverview') }}</h2>
        <div>
            <img src="~/assets/img/icons/gold_sell.png" class="w-32 h-auto mb-5 mx-auto" v-if="depot?.depot_type?.name_translation_key.toLocaleUpperCase() == AssetTypes.gold.toLocaleUpperCase()"/>
            <img src="~/assets/img/icons/silver_sell.png" class="w-32 h-auto mb-5 mx-auto" v-if="depot?.depot_type?.name_translation_key.toLocaleUpperCase() == AssetTypes.silver.toLocaleUpperCase()"/>
        </div>
        <h2 class="text-center mb-8 text-2xl mt-3">{{ title }}</h2>
        <div class="divide-y">
            <ListItem :title="$t('depot')">{{ depot?.name }}</ListItem>
            <ListItem :title="$t('execution')">{{ $t('direct') }}</ListItem>
            
            <ListItem :title="$t('receiverDepot')">{{ receiver?.name }}</ListItem>
            
            <ListItem :title="$t('amount')"><span class="font-semibold">{{ $n(amount / 1000) }} g</span></ListItem>
        </div>
        <div class="mt-8">
            <button type="submit" :disabled="isSubmitting" @click.prevent="execute"
                :class="(isSubmitting) ? 'opacity-50' : 'opacity-100'"
                class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{
                    $t('confirm') }}</button>
            <InLineApiError :err="submitErr" />
        </div>

    </div>
</template>
<script lang="ts" setup>
import { ref, PropType } from 'vue';
import {  Depot, PlaceOrderModel } from '@/lib/models';
import ListItem from '@/components/common/ListItem';
import { AssetTradingService, CurrencyService } from '~~/lib/services';
import InLineApiError from '@/components/common/InLineApiError'

import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import { AssetTypes, TransactionTypes } from '@/lib/contants';
import { PlaceOrderRequest, TransferAssetRequest } from '@/lib/requests';
import { AccountStorage } from '~~/storage';
const {t} = useI18n();
const props = defineProps({
    receiver: {
        type: Object as PropType<Depot>
    },
    depot: {
        type: Object as PropType<Depot>
    },
    title: {
        type: String
    },
    confirmationMethod: {
        type: String
    },
    amount: {
        type: Number
    }
})
const isSubmitting = ref(false);
const submitErr = ref(null);
const emit = defineEmits<{
    (e: 'onPlace', { }): void
}>()
const execute = async () => {
    const account = AccountStorage.getAccount();
    const request: TransferAssetRequest = {
        source_depot_id:props.depot?.id,
        destination_depot_id:props.receiver?.id,
        account_id:account?.account.id,
        gram_amount:props.amount,
        order_approval_method:props.confirmationMethod
    };
    
    try {
        isSubmitting.value = true;

        const PlaceOrderInfo: PlaceOrderModel = await AssetTradingService.transferOrder(request);
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
</script>