<template>
    
</template>
<script lang="ts" setup>
import ListItem from '@/components/common/ListItem';
import {ref,defineProps,PropType} from 'vue';
import { Order } from '@/lib/models';
import { OrderStatuses } from '~~/lib/contants';
import OrderStatus from '@/components/Orders/OrderStatus';
defineProps({
    order:{
        type: Object as PropType<Order>
    }
})
</script>