<template>
    <div v-if="tradeableInfo">
        <h2 class="text-center mt-3 text-2xl font-bold">{{ $t('blockedAmountdetails') }}</h2>
        <p class="text-center mt-8 mb-8 text-gray-900">{{ $t('blockedAmountExplanation',{blockedAmount:$n(tradeableInfo?.total_blocked_gram_amount/1000).toString()}) }}</p>
        <div class="divide-y">
            <ListItem :title="$t('blockedAmount')">{{ $n(tradeableInfo?.total_blocked_gram_amount/1000) }} g</ListItem>
            <ListItem :title="$t('tradeableAmount')">{{ $n(tradeableInfo?.tradeable_gram_amount/1000) }} g</ListItem>
        </div>
        <h2 class="mt-8 font-semibold">{{ $t('blockedAmountdetails',) }}</h2>
        <div class="divide-y w-full">
            <div v-for="order in tradeableInfo.blocked_orders" :key="order.id" class="flex flex-row py-4 w-full items-center">
                <img :src="order?.logo" class="w-12 h-12 h-auto" />
                <div class="ml-3">
                    <div class="font-semibold">{{ $t(order.order_type.name_translation_key) }}</div>
                    <div class="flex flex-row">
                        <div class="text-gray-400">{{ $d(getExecutionDate(order)) }}</div>
                        <VTooltip :triggers="['click']" :placements="'top-start'" class="ml-2 cursor-pointer active:opacity-50">
                            <a>
                                <InformationCircleIcon class="w-6 text-gray-400" />
                            </a>

                            <template #popper>
                                {{ getAvailableIn(order) }}
                            </template>
                        </VTooltip>
                    </div>
                    
                </div>
                <div class="flex flex-col items-end float-right w-6/12">
                        <div class="font-semibold">{{ $n(getAmountMoney(order)) }} {{ currency }}</div>
                        <div class="text-gray-400">{{ $n(getAmountGram(order)) }} g</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import { TradeableAmount,Order } from "@/lib/models";
import ListItem from '@/components/common/ListItem';
import { CurrencyService, OrderService } from "@/lib/services";
import {InformationCircleIcon } from '@heroicons/vue/24/solid';
const props = defineProps({
    tradeableInfo : {
        type : Object as PropType<TradeableAmount>
    }
})
const {t} = useI18n();
const currency = CurrencyService.getCurrencySymbol();
const getExecutionDate = (order:Order)=>{

return OrderService.getExecutionDate(order);
}
const getAmountMoney = (order:Order) => {
  return OrderService.getMoneyAmountOfAnOrder(order);
}
const getAmountGram = (order:Order) =>{
  return OrderService.getGramAmountOfAnOrder(order);
}
const getAvailableIn = (order:Order)=>{
    let days = "";
    if(order.blocked_days > 9){
        days = t('day')
    }
    else{
        days = t('days');
    }
    if(order.blocked_days >0){
        return t('availableIn') + ' ' + order.blocked_days + ' ' + days;
    }
    else{
        return t('available') + ' ' + t('tomorrow');
    }
}

</script>