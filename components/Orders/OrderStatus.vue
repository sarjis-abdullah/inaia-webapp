<template>
  <template>
    <div v-if="props && props.order && props.order.order_status && props.order.order_status.name_translation_key" :class="theStyle">{{ $t(props.order.order_status.name_translation_key) }}</div>
</template>  
</template>
<script lang="ts" setup>
import { PropType,computed,onMounted,ref,Ref } from 'vue';
import { Order } from '@/lib/models';
import { OrderStatuses } from '~~/lib/contants';
const props = defineProps({
    order:{
        type: Object as PropType<Order>
    }
});
    const theStyle = computed(()=>{
    if(props.order && props.order.order_status)
    {
        switch ( props.order.order_status.name_translation_key) {
            case OrderStatuses.completed:
                return 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20'
            case OrderStatuses.paymentFailed:
                return 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'
            case OrderStatuses.processing:
                return 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20' 
            case OrderStatuses.paid:
                return 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20' 
            case OrderStatuses.outstanding:
                return 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'
            case OrderStatuses.refunded:
                return 'inline-flex items-center rounded-md bg-red-30 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'
            case OrderStatuses.canceled:
                return 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20'
            case OrderStatuses.inProgress:
                return 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20'
            case OrderStatuses.pending:
                return 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20'
            default:
                return 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20' 
        }
    }
})
</script>