<template>
    <div class="h-full">
      <div class="lg:border-b lg:border-t lg:border-gray-200 max-w-lg mx-auto">
        <nav class="" aria-label="Progress">
          <ol role="list" class="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200">
            <li v-for="(step, stepIdx) in steps" :key="step.name" class="relative overflow-hidden lg:flex-1">
              <div :class="[stepIdx === 0 ? 'rounded-t-md border-b-0' : '', stepIdx === steps.length - 1 ? 'rounded-b-md border-t-0' : '', 'overflow-hidden border border-gray-200 lg:border-0']">
                <a v-if="step.status === 'complete'"  @click.prevent="navigateToStep(step.number)" class="group">
                  <span class="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full" aria-hidden="true" />
                  <span :class="[stepIdx !== 0 ? 'lg:pl-9' : '', 'flex items-start px-6 py-5 text-sm font-medium']" class="items-center">
                    <span class="flex-shrink-0">
                      <span class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                        <CheckCircleIcon class="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </span>
                    <span class="ml-4 mt-0.5 flex min-w-0 flex-col">
                      <span class="text-sm font-medium">{{ step.name }}</span>
                    </span>
                  </span>
                </a>
                <a v-else-if="step.status === 'current'"  @click.prevent="navigateToStep(step.number)" aria-current="step">
                  <span class="absolute left-0 top-0 h-full w-1 bg-blue-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full" aria-hidden="true" />
                  <span :class="[stepIdx !== 0 ? 'lg:pl-9' : '', 'flex items-start px-6 py-5 text-sm font-medium']" class="items-center">
                    <span class="flex-shrink-0">
                      <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600">
                        <span class="text-blue-600">{{ stepIdx + 1 }}</span>
                      </span>
                    </span>
                    <span class="ml-4 mt-0.5 flex min-w-0 flex-col">
                      <span class="text-sm font-medium text-blue-600">{{ step.name }}</span>
                    </span>
                  </span>
                </a>
                <a v-else @click.prevent="navigateToStep(step.number)" class="group">
                  <span class="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full" aria-hidden="true" />
                  <span :class="[stepIdx !== 0 ? 'lg:pl-9' : '', 'flex items-start px-6 py-5 text-sm font-medium']" class="items-center">
                    <span class="flex-shrink-0">
                      <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                        <span class="text-gray-500">{{ stepIdx + 1 }}</span>
                      </span>
                    </span>
                    <span class="ml-4 mt-0.5 flex min-w-0 flex-col">
                      <span class="text-sm font-medium text-gray-500">{{ step.name }}</span>
                    </span>
                  </span>
                </a>
                <template v-if="stepIdx !== 0">
                  <!-- Separator -->
                  <div class="absolute inset-0 left-0 top-0 hidden w-3 lg:block" aria-hidden="true">
                    <svg class="h-full w-full text-gray-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
                      <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vector-effect="non-scaling-stroke" />
                    </svg>
                  </div>
                </template>
              </div>
            </li>
          </ol>
        </nav>
      </div>

  
      <main class="py-10 w-full" v-if="!isSavingDepot && !loadingDepot && !loadingDepotError">
       
          <SetupSavingPlan v-if="currentStep == 1 && depot" :depot="depot" :accountId="accountId" @onContractDataSet="confirmSavingPlanContactData
          " :type="depot.depot_type.name_translation_key"/>
          <ConfirmSavingsPlanContract v-if="currentStep == 2"  :depot="depot" :accountId="accountId" :type="depot.depot_type.name_translation_key" :saveDepotRequest="saveDepotRequest" :totalAgio="totalAgio" @onConditionsAccepted="saveDepot"/>
        
      </main>
      <main class="py-10 w-full" v-if="isSavingDepot">
          <SavingDepotsScreen :isLoading="isSubmitting" :error="error" :isSuccess="successfullyCreated"/>
        </main>
        <main class="py-10 w-full" v-if="loadingDepot">
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div class="w-full flex flex-col items-center justify-items-center p-8"><Loading/></div>
          </div></div>
        </main>
        <main class="py-10 w-full" v-if="!loadingDepot && loadingDepotError">
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div class="w-full flex flex-col items-center justify-items-center p-8"><InLineAoiError :err="error"/></div>
          </div></div>
        </main>
    </div>
  </template>
<script lang="ts" setup>
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline';
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import SavingDepotsScreen from '@/components/NewDepot/SavingDepotsScreen';
import SetupSavingPlan from '@/components/NewDepot/SetupSavingPlan';
import ConfirmSavingsPlanContract from '@/components/NewDepot/ConfirmSavingsPlanContract';
import {Ref} from 'vue'
import { Depot } from '~~/lib/models';
import { AccountStorage } from '~~/storage';
import InLineAoiError from '@/components/common/InLineApiError.vue';
import Loading from '@/components/common/Loading.vue'
import moment from 'moment';
useHead({
      htmlAttrs: {
        class: 'h-full bg-gray-50'
      },
      bodyAttrs: {
        class: 'h-full align-middle'
      }
    })
definePageMeta({
  layout: "app-layout",
  middleware:['protected','verified'],
});
const { t,locale } = useI18n();
const route = useRoute();
import { SubscriptionSteps } from '@/constants';
import { AddSavingsPlanRequest } from '~~/lib/requests';
import { AddDepotService, AssetsService } from '~~/lib/services';
    const steps = ref([
  { number:1,id: t('step')+' 1', name: t('savings_plan_contract'), status: SubscriptionSteps.current },
  { number:2,id: t('step')+' 2', name: t('savings_plan_summary'), status: SubscriptionSteps.upcoming },
]);
const currentStep = ref(1);
const sidebarOpen = ref(false)
const year = moment().get('year');
const reachedStep = ref(1);
const totalAgio : Ref<number> = ref(null);
const isSavingDepot = ref(false);
const isSubmitting = ref(false);
const error = ref(null);
const saveDepotRequest : Ref<AddSavingsPlanRequest> = ref({});
const successfullyCreated = ref(false);
const name = ref(t('welcome'));
const loadingDepot = ref(false);
const loadingDepotError = ref(false)
const accountId = ref(null);
const navigateToStep = (step:number)=>{
  if(step<=reachedStep.value){
    currentStep.value = step;
  }

}
const goToDashboard = ()=>{
  const url = "http://" + window.location.host + '/' +locale.value+'/dashboard';
    
  window.open(url,'_self');
}
const saveDepot = async (conditions:string) => {

  try{
    saveDepotRequest.value.conditions = conditions
    isSavingDepot.value = true;
    isSubmitting.value = true;
    await AddDepotService.saveTheSavingPlan(depot.value.id,saveDepotRequest.value);
    successfullyCreated.value = true;

    steps.value = steps.value.map(item => {
      if (item.number == reachedStep.value) {
        return {
          ...item,
          status: SubscriptionSteps.complete
        }
      }
      return item
    })
  }
  catch(err){
    error.value = err;
  }
  finally{
    isSubmitting.value = false;
  }
}
const confirmSavingPlanContactData = (object:Object)=>{
  saveDepotRequest.value.agio_payment_option = object.agio_payment_option;
  saveDepotRequest.value.interval_amount = object.interval_amount;
  saveDepotRequest.value.interval_day = object.interval_day;
  saveDepotRequest.value.duration = object.duration;
  saveDepotRequest.value.interval_startdate = object.interval_startdate;
  saveDepotRequest.value.payment_method = object.payment_method;
  saveDepotRequest.value.payment_account_id = object.payment_account_id;
  totalAgio.value = object.totalAgio;
  currentStep.value = 2;
  reachedStep.value = 2;
  goToStep(2)
}
const goToStep=(step:number)=>
{
  steps.value.forEach((s,index)=>{
    if(index+1 == step){
      s.status = SubscriptionSteps.current;
      name.value = s.name;
    }
    if(index+1>step){
      s.status = SubscriptionSteps.upcoming;
    }
    if(index+1 < step){
      s.status = SubscriptionSteps.complete;
    }
    currentStep.value = step;
  })
}

const depot : Ref<Depot> = ref(null)
onMounted(async ()=>{
  accountId.value = AccountStorage.getAccountId();
    const depotId = route.params.id;
    try{
      loadingDepot.value = true
        depot.value = await AssetsService.getDepotDetails(depotId);
        saveDepotRequest.value.name = depot.value.name;
    }
    catch(err){
      loadingDepotError.value = true;
      error.value = err;
    }
    finally{
      loadingDepot.value = false
    }
})
</script>