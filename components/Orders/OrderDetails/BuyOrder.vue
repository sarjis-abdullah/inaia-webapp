<template>
    <div class="divide-y">
        <ListItem :title="$t('status')"><OrderStatus :order="order"/></ListItem>
        <ListItem :title="$t('date')"><span>{{ $d(date) }}</span></ListItem>
        <ListItem :title="$t('depot')"><span>{{ order?.depotName }}</span></ListItem>
        <ListItem :title="$t('course')" v-if="course"><span>{{ $n(course/100) }} {{ currency }}</span></ListItem>
        <ListItem :title="$t(purchaseText)" v-if="purchaseAmount"><span>{{ $n(purchaseAmount/100) }} {{ currency }}</span></ListItem>
        <ListItem :title="$t('agio')" v-if="agioFee"><span>{{ $n(agioFee/100) }} {{ currency }}</span></ListItem>
        <ListItem :title="$t('storage_fee')" v-if="storageFee"><span>{{ $n(storageFee/100) }} {{ currency }}</span></ListItem>
        <ListItem :title="$t('gold_amount')" v-if="gramAmount"><span>{{ $n(gramAmount/100) }} {{ currency }}</span></ListItem>
    </div>
</template>
<script lang="ts" setup>
import ListItem from '@/components/common/ListItem';
import {ref,defineProps,PropType} from 'vue';
import { Order } from '@/lib/models';
import { OrderStatuses } from '~~/lib/contants';
import OrderStatus from '@/components/Orders/OrderStatus';
import { OrderService,CurrencyService } from '~~/lib/services';
const currency = CurrencyService.getCurrencySymbol();
const props = defineProps({
    order:{
        type: Object as PropType<Order>
    }
})
const date = computed(()=>{
    if(props.order)
        return OrderService.getExecutionDate(props.order);
})
const course = computed(()=>{
    return OrderService.getTheOrderTransactionCourse(props.order);
})
const purchaseAmount = computed(()=>{
    return OrderService.getMoneyAmountOfAnOrder(props.order);
})
const purchaseText = computed(()=>{
    if(props.order && props.order.order_status?.name_translation_key == OrderStatuses.completed){
        return 'purchase_amount';
    }
    else{
        return 'amount'
    }
})
const agioFee = computed(()=>{
    return OrderService.getTransactionFee(props.order);
})
const storageFee = computed(()=>{
    return OrderService.getStorageFee(props.order);
})
const gramAmount = computed(()=>{
    return OrderService.getGramAmountOfAnOrder(props.order);
})

</script>