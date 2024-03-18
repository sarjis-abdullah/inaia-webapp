<template>
    <div class="divide-y">
        <ListItem :title="$t('status')"><OrderStatus :order="order"/></ListItem>
        <ListItem :title="$t('date')"><span>{{ $d(date) }}</span></ListItem>
        <ListItem :title="$t('depot')"><span>{{ order?.depotName }}</span></ListItem>
        <PaymmentMethod :order="order"/>
        <ListItem :title="$t('amount_gram')" v-if="gramAmount"><span>{{ $n(gramAmount/1000) }} g</span></ListItem>
    </div>
</template>
<script lang="ts" setup>
import ListItem from '@/components/common/ListItem';
import {ref,computed} from 'vue';
import { type Order } from '@/lib/models';
import { OrderStatuses } from '~~/lib/contants';
import { OrderService,CurrencyService } from '@/lib/services';
import OrderStatus from '@/components/Orders/OrderStatus';
import PaymmentMethod from '@/components/Orders/OrderDetails/PaymentMethod';
const props = defineProps({
    order:{
        type: Object as PropType<Order>
    }
})
const date = computed(()=>{
    if(props.order)
        return OrderService.getExecutionDate(props.order);
})
const gramAmount = computed(()=>{
    return OrderService.getGramAmountOfAnOrder(props.order);
})
</script>