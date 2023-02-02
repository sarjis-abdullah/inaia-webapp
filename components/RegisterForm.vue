<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-20 w-auto" src="~/assets/img/logo/logo.png" alt="Your Company" />
      
     
    </div>
    <div class="mt-8 mx-5">
    <nav aria-label="Progress">
    <ol role="list" class="space-y-4 md:flex md:space-y-0 md:space-x-8">
      <li v-for="step in steps" :key="step.name" class="md:flex-1">
        <a v-if="step.status === 'complete'" :href="step.href" class="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
          <span class="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">{{ step.id }}</span>
          <span class="text-sm font-medium">{{ step.name }}</span>
        </a>
        <a v-else-if="step.status === 'current'" :href="step.href" class="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0" aria-current="step">
          <span class="text-sm font-medium text-indigo-600">{{ step.id }}</span>
          <span class="text-sm font-medium">{{ step.name }}</span>
        </a>
        <a v-else :href="step.href" class="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
          <span class="text-sm font-medium text-gray-500 group-hover:text-gray-700">{{ step.id }}</span>
          <span class="text-sm font-medium">{{ step.name }}</span>
        </a>
      </li>
    </ol>
  </nav>
  <PlanStep v-if="selectedStep?.number == 1"/>

    </div>
  </div>
</template>
<script setup lang="ts">
import Countries from '@/components/Register/Countries';
import { SubscriptionSteps } from '@/constants';
import { ref,reactive,computed } from 'vue';
import PlanStep from '@/components/Register/PlanStep';
const { t } = useI18n();
const selectedCountry = reactive({id:-1});
const steps = ref([
  { number:1,id: 'Step 1', name: t('plan'), href: '#', status: SubscriptionSteps.current },
  { number:2,id: 'Step 2', name: t('subscription_info'), href: '#', status: SubscriptionSteps.upcoming },
  { number:3,id: 'Step 3', name: t('conditions'), href: '#', status: SubscriptionSteps.upcoming },
]);
function handleCountryChange(country_id:Number) {
  selectedCountry.id = country_id;
}
const selectedStep = computed(()=>steps.value.find(step=>step.status == SubscriptionSteps.current));

</script>