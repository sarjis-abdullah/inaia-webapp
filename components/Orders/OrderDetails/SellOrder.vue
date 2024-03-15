<template>
    <div class="divide-y">
        <ListItem :title="$t('status')"><OrderStatus :order="order"/></ListItem>
        <ListItem :title="$t('date')"><span>{{ $d(date) }}</span></ListItem>
        <ListItem :title="$t('depot')"><span>{{ order?.depotName }}</span></ListItem>
        <ListItem :title="$t('course')" v-if="course"><span>{{ $n(course/100) }} {{ currency }}</span></ListItem>
        <PaymmentMethod :order="order"/>
        <ListItem :title="$t('amount')" v-if="moneyAmount"><span>{{ $n(moneyAmount/100) }} {{ currency }}</span></ListItem>
        <ListItem :title="$t('amount_gram')" v-if="gramAmount"><span>{{ $n(gramAmount/1000) }} g</span></ListItem>
    </div>
</template>
<script lang="ts" setup>
import ListItem from '@/components/common/ListItem';
import {ref,defineProps,PropType} from 'vue';
import { type Order } from '@/lib/models';
import { OrderStatuses } from '~~/lib/contants';
import OrderStatus from '@/components/Orders/OrderStatus';
import { OrderService,CurrencyService } from '@/lib/services';
import PaymmentMethod from '@/components/Orders/OrderDetails/PaymentMethod';
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
const moneyAmount = computed(()=>{
    return OrderService.getMoneyAmountOfAnOrder(props.order);
})
const gramAmount = computed(()=>{
    return OrderService.getGramAmountOfAnOrder(props.order);
})

</script>