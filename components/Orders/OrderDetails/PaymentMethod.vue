<template>
    <div>
        <ListItem :title="$t('payment_method')" v-if="paymentMethodName"><span>{{$t(paymentMethodName)}}</span></ListItem>
    </div>
</template>
<script lang="ts" setup>
import ListItem from '@/components/common/ListItem';
import {computed,PropType} from 'vue';
import { Order } from '@/lib/models';
import { OrderService } from '@/lib/services';
const props = defineProps({
    order:{
        type: Object as PropType<Order>
    }
})
const paymentMethodName = computed(()=>{
    return OrderService.getPaymentMethodName(props.order);
})
</script>
