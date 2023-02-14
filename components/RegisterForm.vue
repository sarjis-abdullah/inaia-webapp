<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-20 w-auto" src="~/assets/img/logo/logo.png" alt="Your Company" />
      
     
    </div>
    <div class="mt-8 mx-5" v-if="stillRegistring">
    <nav aria-label="Progress">
    <ol role="list" class="space-y-4 md:flex md:space-y-0 md:space-x-8">
      <li v-for="step in steps" :key="step.name" class="md:flex-1">
        <a v-if="step.status === 'complete'"  @click.prevent="navigateToStep(step.number)" class="group flex flex-col border-l-4 border-blue-600 py-2 pl-4 hover:border-blue-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
          <span class="text-sm font-medium text-blue-600 group-hover:text-blue-800">{{ step.id }}</span>
          <span class="text-sm font-medium">{{ step.name }}</span>
        </a>
        <a v-else-if="step.status === 'current'"  @click.prevent="navigateToStep(step.number)" class="flex flex-col border-l-4 border-blue-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0" aria-current="step">
          <span class="text-sm font-medium text-blue-600">{{ step.id }}</span>
          <span class="text-sm font-medium">{{ step.name }}</span>
        </a>
        <a v-else @click.prevent="navigateToStep(step.number)" class="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
          <span class="text-sm font-medium text-gray-500 group-hover:text-gray-700">{{ step.id }}</span>
          <span class="text-sm font-medium">{{ step.name }}</span>
        </a>
      </li>
    </ol>
  </nav>
  <PlanStep v-if="selectedStep?.number == 1" @selected="onChoosenPlan"/>
  <AccountInformation v-if="selectedStep?.number ==2" @on-save="onPersonalInfoSaved"/>
  <VerificationForm v-if="selectedStep?.number ==3" @validated="onInformationValidated"/>
  <ConditionList v-if="selectedStep?.number ==4" @registred="onRegistrationDone"/>
    </div>
    <div class="mt-8 mx-5" v-else>
      <RegistrationSuccess/>
    </div>
  </div>
</template>
<script setup lang="ts">
import Countries from '@/components/Register/Countries';
import { SubscriptionSteps } from '@/constants';
import { ref,reactive,computed,onMounted } from 'vue';
import PlanStep from '@/components/Register/PlanStep';
import AccountInformation from './Register/AccountInformation.vue';
import VerificationForm from './Register/VerificationForm';
import ConditionList from './Register/ConditionList.vue';
import { getStep,saveStep } from '~~/helpers/RegistrationHelper';
import { useI18n } from 'vue-i18n';
import RegistrationSuccess from './Register/RegistrationSuccess.vue';
const { t } = useI18n();
const selectedCountry = reactive({id:-1});
const stillRegistring = ref(true);
const steps = ref([
  { number:1,id: t('step')+' 1', name: t('plan'),  status: SubscriptionSteps.upcoming },
  { number:2,id: t('step')+' 2', name: t('subscription_info'), status: SubscriptionSteps.upcoming },
  { number:3,id: t('step')+' 3', name: t('confirm_information'), status: SubscriptionSteps.upcoming },
  { number:4,id: t('step')+' 4', name: t('conditions'), status: SubscriptionSteps.upcoming },
]);
const currentStep = ref(1);
const goToStep=(step:number)=>
{
  steps.value.forEach((s,index)=>{
    if(index+1 == step){
      s.status = SubscriptionSteps.current;
    }
    if(index+1>step){
      s.status = SubscriptionSteps.upcoming;
    }
    if(index+1 < step){
      s.status = SubscriptionSteps.complete;
    }

  })
}
onMounted(()=>{
  currentStep.value = getStep();
  goToStep(currentStep.value);
})

function handleCountryChange(country_id:Number) {
  selectedCountry.id = country_id;
}
const navigateToStep=(step)=>{
  if(step>currentStep.value)
  {
    return;
  }
  else{
    goToStep(step);
  }
}
const selectedStep = computed(()=>steps.value.find(step=>step.status == SubscriptionSteps.current));
const onChoosenPlan = ()=>{
  goToStep(2);
  saveStep(2);
}
const onPersonalInfoSaved = ()=>{
  goToStep(3);
  saveStep(3);
}
const onInformationValidated = ()=>{
  goToStep(4);
  saveStep(4);
}
const onRegistrationDone = ()=>{
  stillRegistring.value =  false;
}
</script>