<template>
    <div class="flex min-h-full flex-col mt-5 mx-6 bg-white">
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-center my-10">{{ $t('plan_pricing') }}</h1>
        <Countries class="w-3/12 self-center" :all="false" @change="handleCountryChange" :selectedCountry="defaultCountry" :selectedCountryId="alreadySelectedCountry"/>
        <Plans v-if="selectedCountry.id > -1" :countyId="selectedCountry.id" @selected="onPlanSelected"></Plans>
    </div>
</template>
<script lang="ts" setup>
import Countries from '@/components/Register/Countries';
import { SubscriptionSteps } from '@/constants';
import { ref,reactive,computed } from 'vue';
import { SubscriptionService } from '~~/lib/services/SubscriptionService';
import Plans from './Plans.vue';
import { getCountryByLanguage } from '~~/helpers/LanguageHelper';
import { useI18n } from 'vue-i18n';
import { ChosenPlan } from '~~/lib/requests/ChosenPlanRequest';
import { SubscriptionStorage } from '~~/storage/SubscriptionStorage';
const selectedCountry = reactive({id:-1});
const alreadySelectedCountry = ref(-1);
const plan = ref(null);

const {locale} = useI18n();
const defaultCountry = getCountryByLanguage(locale.value);
function handleCountryChange(country_id:Number) {
  selectedCountry.id = country_id;
};
const emit = defineEmits<{
  (e: 'selected'): void
}>();
onMounted(()=>{
  const chosen = SubscriptionService.getChosenPlan();
  if(chosen){
    alreadySelectedCountry.value= chosen.country_id;

  }
})
const onPlanSelected = (value)=>{
  plan.value = value;
  if(plan.value){
    const data:ChosenPlan={
    country_id:selectedCountry.id,
    payment_cycle:plan.value.paymentPeriod,
    plan_id:plan.value.planId
  }
    SubscriptionService.saveChoosenPlan(data);
    SubscriptionStorage.saveChoosenPlan(data);
  emit("selected");
  }
  

}
</script>