<template>
    <div>
        <div v-if="paymentMethodName" class="px-0 py-2 flex justify-between">
            <div class="px-0 justify-center font-semibold">{{$t('payment_method')}}</div>
            <div class="px-0 text-sm flex items-center gap-1">
                <span>{{$t(paymentMethodName)}}</span>
                <span v-if="order?.payment_details">
                    <ChevronDownIcon v-if="!showPaymentDetails" @click="toggle" class="h-3 w-3 cursor-pointer"/>
                    <ChevronUpIcon v-else @click="toggle" class="h-3 w-3 cursor-pointer"/>
                </span>
            </div>
        </div>
        <div v-if="showPaymentDetails && order?.payment_details" class="ml-2">
            <ListItem :title="$t('accountHolder')">
                <span class="pl-2">
                    {{ "INAIA GmbH" }}
                </span>
            </ListItem>
            <ListItem :title="$t('iban')">
                <span class="pl-2">
                    {{ order.payment_details.inaia_iban }}
                </span>
            </ListItem>
            <ListItem :title="$t('reference')">
                <span>
                    {{ order.payment_details.reference }}
                </span>
            </ListItem>
        </div>
    </div>
</template>
<script lang="ts" setup>
import ListItem from '@/components/common/ListItem';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { ChevronUpIcon } from '@heroicons/vue/24/outline';
import {computed, ref} from 'vue';
import { type Order } from '@/lib/models';
import { OrderService } from '@/lib/services';
const showPaymentDetails = ref(false)
const props = defineProps({
    order:{
        type: Object as PropType<Order>
    }
})
const paymentMethodName = computed(()=>{
    return OrderService.getPaymentMethodName(props.order);
})

const toggle = () => {
    showPaymentDetails.value = !showPaymentDetails.value
}
</script>
