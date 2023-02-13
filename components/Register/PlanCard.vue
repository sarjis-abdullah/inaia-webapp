<template>
   
    <div class="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm" v-if="plan">
          <div class="p-6">
            <h2 class="text-lg font-medium leading-6 text-gray-900">{{ plan.name }}</h2>
            
            <p class="mt-8" v-if="paymentPeriod==cycles.monthly">
              <span class="text-4xl font-bold tracking-tight text-gray-900">${{ monthlFee }}</span>
              {{ ' ' }}
              <span class="text-base font-medium text-gray-500">/mo</span>
            </p>
            <p class="mt-8" v-else-if="paymentPeriod==cycles.yearly">
              <span class="text-4xl font-bold tracking-tight text-gray-900">${{ yearlyFee }}</span>
              {{ ' ' }}
              <span class="text-base font-medium text-gray-500">/year</span>
            </p>
            <Button  class="mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900" @click.prevent="choosePlan">Buy {{ plan.name }}</Button>
          </div>
          <div class="px-6 pt-6 pb-8">
            <h3 class="text-sm font-medium text-gray-900">Features</h3>
            <ul role="list" class="mt-6 space-y-4">
              <li v-for="detail in plan.details" :key="detail?detail.id:0" class="flex space-x-3">
                <CheckIcon class="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" v-if="detail && detail.active"/>
                <XMarkIcon class="h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" v-if="detail && !detail.active"/>
                <span class="text-sm text-gray-500">{{ detail?detail.verbose:'' }}</span>
              </li>
            </ul>
          </div>
        </div>
</template>
<script lang="ts" setup>
import { ref, watch,computed } from 'vue';
import type { Ref } from 'vue';
import { CheckIcon,XMarkIcon } from '@heroicons/vue/20/solid';
import { PaymentCycles } from '~~/lib/contants/PaymentCycles';
const emit = defineEmits<{
  (e: 'selected',planId:number): void
}>()
const props = defineProps({
    plan:{
        type:Object,
        default:null
    },
    paymentPeriod:{
      default:PaymentCycles.monthly
    }
})
const cycles = PaymentCycles;
const choosePlan =(planId:number)=>{
  emit('selected',props.plan.id);
}
const monthlFee = ref(0);
const yearlyFee = ref(0);
if(props.plan)
{
  monthlFee.value = props.plan.fee.monthly.value;
  yearlyFee.value = props.plan.fee.yearly.value;
}
</script>