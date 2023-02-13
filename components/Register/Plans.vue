<template>
  <section class="bg-white">
    <div class="mx-auto max-w-7xl py-3 px-6 lg:px-8" v-if="!isLoading && plans.length >0 && !error">
      <div class="sm:align-center sm:flex sm:flex-col" >
        
        <p class="mt-5 text-xl text-gray-500 sm:text-center">Choose your plan and start saving Gold today</p>
        <div class="relative mt-6 flex self-center rounded-lg bg-gray-100 p-0.5 sm:mt-8">
          <button type="button" @click.prevent="setPaymentPeriod(monthlyPayment)"
            class="relative w-1/2 whitespace-nowrap rounded-md border-gray-200 bg-white py-2 text-sm font-medium  shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto sm:px-8" 
            :class="selectedPaymentCycle==monthlyPayment?'bg-white text-gray-900':'text-gray-700 bg-transparent'"
            >Monthly
            billing</button>
          <button type="button" @click.prevent="setPaymentPeriod(yearlyPayment)"
            class="relative ml-0.5 w-1/2 whitespace-nowrap rounded-md border border-transparent py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto sm:px-8"
            :class="selectedPaymentCycle==yearlyPayment?'bg-white text-gray-900':'text-gray-700 bg-transparent'"
            >Yearly
            billing</button>
        </div>
      </div>
      <p class="text-center my-3 font-medium text-lg text-gray-800">Please choose your plan</p>
      <div
        class="mt-12 flex flex-row justify-center">

        <PlanCard v-for="plan in plans" :key="plan.id.toString()" :plan="plan" class="mr-3 " :class="selectedPlan==plan.id?'ring-2 ring-blue-500':''" 
        @selected="setPlan" :paymentPeriod="selectedPaymentCycle"/>

      </div>
    </div>
    <div class="flex flex-row justify-center py-10 px-6 lg:px-8" v-else-if="isLoading">
      <Loading :width="45" :height="45"/>
    </div>
    <div class="mx-auto max-w-7xl py-10 px-6 lg:px-8" v-else-if="!isLoading && plans.length == 0 && !error">
      <p class="text-center my-3 font-medium text-lg text-gray-800">There is no plans for the selected country, please choose another country</p>
    </div>
    <div class="mx-auto max-w-7xl py-10 px-6 lg:px-8" v-else-if="!isLoading && !error">
      <p class="text-center my-3 font-medium text-lg text-red-800">We couldn't load plans, cause of server error</p>
    </div>

  </section>
</template>
<script lang="ts" setup>
import PlanCard from './PlanCard.vue';
import Loading from '../common/Loading.vue';
import {PlanService} from '@/lib/services/PlanService';
import { Ref,watch,onMounted } from 'vue';
import { Plan } from '~~/lib/models/Plan';
import { PaymentCycles } from '~~/lib/contants/PaymentCycles';
import { useI18n } from 'vue-i18n';
import { SubscriptionService } from '~~/lib/services/SubscriptionService';
const props = defineProps({
    countyId:{
        type:Number,
        default:-1
    }
})
const plans : Ref<Array<Plan>> = ref([]);
const error = ref(null);
const isLoading = ref(false);
const monthlyPayment = PaymentCycles.monthly;
const yearlyPayment = PaymentCycles.yearly;
const selectedPaymentCycle = ref(PaymentCycles.monthly);
const selectedPlan = ref(1);
const emit = defineEmits<{
  (e: 'selected',plan:Object): void
}>();

const {locale} = useI18n();
const setPaymentPeriod = (payment)=>{
  selectedPaymentCycle.value= payment
}
onMounted(()=>{
  const chosen = SubscriptionService.getChosenPlan();
  if(chosen){
    selectedPaymentCycle.value = chosen.payment_cycle;
    selectedPlan.value = chosen.plan_id;
  }
})
const setPlan=(planId:number)=>{
  selectedPlan.value = planId;
  emit('selected',{planId:selectedPlan.value,paymentPeriod:selectedPaymentCycle.value});
}
async function loadPlans(){
  if(props.countyId>-1)
{
  try{
    isLoading.value = true;
    plans.value = await PlanService.getPlansDetails(props.countyId,locale.value);
    
  }
  catch(err)
  {
    error.value = err
  }
  finally{
    isLoading.value = false;
  }
  
}
}
onMounted(()=>{
  if(props.countyId>-1)
    loadPlans();
})
watch(props,(currentValue,oldValue)=>{
  loadPlans();
})
</script>