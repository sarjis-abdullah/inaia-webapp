<template>
    <div class="h-full">
      <TransitionRoot as="template" :show="sidebarOpen" v-if="!isSavingDepot">
        <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>
  
          <div class="fixed inset-0 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
              <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                      <span class="sr-only">Close sidebar</span>
                      <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                  <div class="flex pt-8 justify-center">
                    <a @click="goToDashboard"><img class="w-36 h-auto" src="~/assets/img/logo/logo.png" alt="INAIA GmbH" /></a>
                  </div>
                  <nav class="mt-8" aria-label="Progress">
                    <ol role="list" class="space-y-10">
                      <li v-for="step in steps" :key="step.name">
                        <a v-if="step.status === 'complete'"  @click.prevent="navigateToStep(step.number)" class="group cursor-pointer">
                          <span class="flex items-start">
                            <span class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                              <CheckCircleIcon class="h-full w-full text-blue-600 group-hover:text-blue-800" aria-hidden="true" />
                            </span>
                            <span class="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">{{ step.name }}</span>
                          </span>
                        </a>
                        <a v-else-if="step.status === 'current'"  @click.prevent="navigateToStep(step.number)" class="flex items-start cursor-pointer" aria-current="step">
                          <span class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center" aria-hidden="true">
                            <span class="absolute h-4 w-4 rounded-full bg-blue-200" />
                            <span class="relative block h-2 w-2 rounded-full bg-blue-600" />
                          </span>
                          <span class="ml-3 text-sm font-medium text-blue-600">{{ step.name }}</span>
                        </a>
                        <a v-else @click.prevent="navigateToStep(step.number)" class="group cursor-pointer">
                          <div class="flex items-start">
                            <div class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center" aria-hidden="true">
                              <div class="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400" />
                            </div>
                            <p class="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">{{ step.name }}</p>
                          </div>
                        </a>
                      </li>
                    </ol>
                  </nav>
                  <nav class="flex justify-center absolute inset-x-0 bottom-2 mb-5">
                    <ul role="list" class="space-y-3">
                      <li class="text-center text-xs text-stone-800">
                        <a>© {{ year }} INAIA GmbH</a>
                      </li>
                      <li class="text-center text-xs">
                        <a href="https://www.inaia.de/datenschutz" target="_blank" class="flex justify-center cursor-pointer text-gray-400 hover:text-blue-600">{{$t('privacy')}}<ArrowTopRightOnSquareIcon class="h-3 w-3 ml-1" /></a>
                      </li>
                      <li class="text-center text-xs">
                        <a href="https://www.inaia.de/impressum" target="_blank" class="flex justify-center cursor-pointer text-gray-400 hover:text-blue-600">{{$t('imprint')}}<ArrowTopRightOnSquareIcon class="h-3 w-3 ml-1" /></a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <!-- Static sidebar for desktop -->
      <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col" v-if="!isSavingDepot">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div class="flex pt-8 justify-center">
            <a @click="goToDashboard"><img class="w-36 h-auto" src="~/assets/img/logo/logo.png" alt="INAIA GmbH" /></a>
          </div>
  
            <nav class="flex justify-center mt-20" aria-label="Progress">
          <ol role="list" class="space-y-10">
            <li v-for="step in steps" :key="step.name">
              <a v-if="step.status === 'complete'"  @click.prevent="navigateToStep(step.number)" class="group cursor-pointer">
                <span class="flex items-start">
                  <span class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                    <CheckCircleIcon class="h-full w-full text-blue-600 group-hover:text-blue-800" aria-hidden="true" />
                  </span>
                  <span class="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">{{ step.name }}</span>
                </span>
              </a>
              <a v-else-if="step.status === 'current'"  @click.prevent="navigateToStep(step.number)" class="flex items-start cursor-pointer" aria-current="step">
                <span class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center" aria-hidden="true">
                  <span class="absolute h-4 w-4 rounded-full bg-blue-200" />
                  <span class="relative block h-2 w-2 rounded-full bg-blue-600" />
                </span>
                <span class="ml-3 text-sm font-medium text-blue-600">{{ step.name }}</span>
              </a>
              <a v-else @click.prevent="navigateToStep(step.number)" class="group cursor-pointer">
                <div class="flex items-start">
                  <div class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center" aria-hidden="true">
                    <div class="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400" />
                  </div>
                  <p class="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">{{ step.name }}</p>
                </div>
              </a>
            </li>
          </ol>
          </nav>
          <nav class="flex justify-center absolute inset-x-0 bottom-2 mb-5">
            <ul role="list" class="space-y-3">
              <li class="text-center text-xs text-stone-800">
                <a>© {{ year }} INAIA GmbH</a>
              </li>
              <li class="text-center text-xs">
                <a href="https://www.inaia.de/datenschutz" target="_blank" class="flex justify-center cursor-pointer text-gray-400 hover:text-blue-600">{{$t('privacy')}}<ArrowTopRightOnSquareIcon class="h-3 w-3 ml-1" /></a>
              </li>
              <li class="text-center text-xs">
                <a href="https://www.inaia.de/impressum" target="_blank" class="flex justify-center cursor-pointer text-gray-400 hover:text-blue-600">{{$t('imprint')}}<ArrowTopRightOnSquareIcon class="h-3 w-3 ml-1" /></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
  
      <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden" v-if="!isSavingDepot">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex-1 text-sm font-semibold leading-6 text-gray-900">{{ name }}</div>
      </div>
  
      <main class="py-10 lg:pl-72 w-full" v-if="!isSavingDepot && !loadingDepot && !loadingDepotError">
       
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