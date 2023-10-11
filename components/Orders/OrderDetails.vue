<template>
    <Modal :open="showDetails" @onClose="closed">
        <div>
            <img :src="order?order?.logo:''" class="w-28 m-auto"/>
        </div>
        <div class="text-gray-900 font-semibold text-center my-4 text-xl">{{ order?$t(order?.order_type.name_translation_key):'' }}</div>
        
        <BuyOrder :order="order" v-if="isPurchaseOrder"/>
    </Modal>
</template>
<script lang="ts" setup>
import {ref,defineProps,PropType} from 'vue';
import { Order } from '@/lib/models';
import Modal from '@/components/common/Modal';
import ListItem from '@/components/common/ListItem';
import BuyOrder from '@/components/Orders/OrderDetails/BuyOrder'
import { OrderTypes } from '@/lib/contants';
const props = defineProps({
    showDetails:{
        type:Boolean,
        default:false
    },
    order:{
        type: Object as PropType<Order>
    }
})
const isPurchaseOrder = computed(()=>{
    return (props.order && props.order.order_type && props.order.order_type.name_translation_key.includes('purchase'));
});
const emit = defineEmits<{
  (e: 'onClose'): void
}>()
 const closed = ()=>{
  emit('onClose');
 }
</script>