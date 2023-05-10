<template>
    <div class="flex min-h-full flex-col mt-5 mx-6 bg-white py-10">
        
        <Countries class="w-3/12 self-center" :all="false" @change="handleCountryChange" :selectedCountry="defaultCountry" :selectedCountryId="alreadySelectedCountry"/>
        <!--Plans v-if="selectedCountry.id > -1" :countyId="selectedCountry.id" @selected="onPlanSelected"></Plans!-->
        <div class="mt-5 flex items-center justify-center">
                    <button type="submit" :disabled="alreadySelectedCountry.id == -1" @click.prevent="save"
                        :class="(alreadySelectedCountry.id == -1)?'opacity-50':'opacity-100'"
                        class="flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-10">{{ $t('save') }}</button>
                        <p class="mt-2 text-sm text-red-600" id="email-error" v-if="submittingError">{{ $t('account_info_error') }}
                    </p>
                </div>
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
/*const onPlanSelected = (value)=>{
  plan.value = value;
  if(plan.value){
    const data:ChosenPlan={
    country_id:selectedCountry.id,
    payment_cycle:plan.value.paymentPeriod,
    plan_id:plan.value.planId
  }
    SubscriptionService.saveChoosenPlan(data);
  emit("selected");
  }
  

}*/
const save = ()=>{
  const data:ChosenPlan={
    country_id:selectedCountry.id
  }
  SubscriptionService.saveChoosenPlan(data);
  emit("selected");
}

</script>