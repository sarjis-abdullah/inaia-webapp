<template>
    <Modal :open="showDetails" @onClose="closed">
        <div>
            <img :src="order?order?.logo:''" class="w-28 m-auto"/>
        </div>
        <div class="text-gray-900 font-semibold text-center my-4 text-xl">{{ order?$t(order?.order_type.name_translation_key):'' }}</div>
        
        <BuyOrder :order="order" v-if="isPurchaseOrder"/>
        <DeliverOrder :order="order" v-if="isDeliverOrder"/>
        <SellOrder :order="order" v-if="isSaleOrder"/>
        <GiftOrder :order="order" v-if="isGiftOrder"/>
        <TransferOrder :order="order" v-if="isTransferOrder"/>
    </Modal>
</template>
<script lang="ts" setup>
import {ref,PropType} from 'vue';
import { Order } from '@/lib/models';
import Modal from '@/components/common/Modal';
import ListItem from '@/components/common/ListItem';
import BuyOrder from '@/components/Orders/OrderDetails/BuyOrder';
import DeliverOrder from '@/components/Orders/OrderDetails/DeliverOrder';
import SellOrder from '@/components/Orders/OrderDetails/SellOrder'
import GiftOrder from '@/components/Orders/OrderDetails/GiftOrder';
import TransferOrder from '@/components/Orders/OrderDetails/TransferOrder';
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
const isDeliverOrder = computed(()=>{
    return (props.order && props.order.order_type && props.order.order_type.name_translation_key == OrderTypes.gold_delivery);
});
const isSaleOrder = computed(()=>{
    return (props.order && props.order.order_type && (props.order.order_type.name_translation_key == OrderTypes.gold_sell || props.order.order_type.name_translation_key == OrderTypes.silver_sell));
});
const isGiftOrder = computed(()=>{
    return (props.order && props.order.order_type && (props.order.order_type.name_translation_key == OrderTypes.gold_gift || props.order.order_type.name_translation_key == OrderTypes.silver_gift));
});
const isTransferOrder = computed(()=>{
    return (props.order && props.order.order_type && 
    (props.order.order_type.name_translation_key.includes('transfer')
    ));
});
const emit = defineEmits<{
  (e: 'onClose'): void
}>()
 const closed = ()=>{
  emit('onClose');
 }
</script>