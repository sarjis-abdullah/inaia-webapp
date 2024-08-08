<template>
    <div class="h-full p-6 sm:rounded-lg">
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
  
      <main class="py-10 w-full" >
        <div class="lg:px-8">
          <PersonalInfo v-if="currentStep == 1"  :account="account" @on-save="onInfoSet" :enableAll="enableAll"/>
          <Address v-if="currentStep == 2"  :account="account" :request="kycRequest" />
        </div>
          
        
      </main>
      
    </div>
  </template>
  <script lang="ts" setup>
  import { SubscriptionSteps } from '@/constants';
  import { CheckCircleIcon, XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/20/solid';
  import PersonalInfo from "@/components/Kyc/PersonalInfo.vue";
  import Address from "@/components/Kyc/Address.vue";
  import { AccountStorage } from '~~/storage';
  import {type Account} from '@/lib/models';
  import { AccountService, AssetsService } from '@/lib/services';
  import {Ref} from 'vue';
import { StartKycRequest } from '~~/lib/requests';
import { formatDate } from '~~/lib/Formatters';
import { urlBuilder } from '~~/helpers/urlBuilder';
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
  middleware:['protected'],
});
  const { t } = useI18n();
      const steps = ref([
{ number:1,id: t('step')+' 1', name: t('personalInformation'), status: SubscriptionSteps.current },


  { number:2,id: t('step')+' 2', name: t('address'), status: SubscriptionSteps.upcoming },
]);
const currentStep = ref(1);
const sidebarOpen = ref(false)
const year = moment().get('year');
const reachedStep = ref(1);
const kycRequest : Ref<StartKycRequest> = ref(null);
const name = ref(t('personal_info'));
const account : Ref<Account> = ref(null);
const enableAll = ref(true);
onMounted(async ()=>{
  account.value = AccountStorage.getAccount();
  if(!account.value){
    const contact_id = AccountStorage.getContactId();
    account.value = await AccountService.getAccount(contact_id);

  }
  if(account.value){
    const depots = await AssetsService.getAssets(account.value.account.id);
    if(depots.length > 0){
      enableAll.value = false;
    }
  }
})
const {locale} = useI18n();
const goToDashboard = ()=>{

  const url = urlBuilder(locale.value,'/dashboard');
    
  window.open(url,'_self');
}
const onInfoSet = (object:Object)=>{
  kycRequest.value = {}
  if(object){
    kycRequest.value.birth_date =  formatDate(new Date(object.birthdate));
    kycRequest.value.birth_place = object.birthplace;
    kycRequest.value.name = object.prename;
    kycRequest.value.surname = object.name;
    kycRequest.value.gender = object.gender;
    kycRequest.value.nationality_id = object.nationality;

  }
  reachedStep.value = 2;
  navigateToStep(2);
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
const navigateToStep = (step:number)=>{
  if(step<=reachedStep.value){
    goToStep(step);
  }

}
</script>