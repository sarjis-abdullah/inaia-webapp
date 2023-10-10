<template>
    <Modal :open="showDetails" @onClose="closed">
        <div>
            <img :src="order?.logo" class="w-32 m-auto"/>
        </div>
        <div class="text-gray-900 font-semibold text-center my-3 text-xl">{{ $t(order?.order_type.name_translation_key) }}</div>
        <ListItem :title="test"><div slot="value">test</div></ListItem>
    </Modal>
</template>
<script lang="ts" setup>
import {ref,defineProps,PropType} from 'vue';
import { Order } from '@/lib/models';
import Modal from '@/components/common/Modal';
import ListItem from '@/components/common/ListItem';
defineProps({
    showDetails:{
        type:Boolean,
        default:false
    },
    order:{
        type: Object as PropType<Order>
    }
})
const emit = defineEmits<{
  (e: 'onClose'): void
}>()
 const closed = ()=>{
  emit('onClose');
 }
</script>