<template>
    <div class="rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800" v-if="!kycStatus">{{ $t('startAutoIdtext') }}</h3>
          <h3 class="text-sm font-medium text-red-800" v-if="kycStatus && kycStatus.name==KycStatuses.pendind">{{ $t('kycStatusIsPending') }}</h3>
          <h3 class="text-sm font-medium text-red-800" v-if="kycStatus && kycStatus.name==KycStatuses.failed">{{ $t('kycStatusIsFailed') }}</h3>
          <div class="mt-2 text-sm text-red-700 " >
            <div class="-mx-2  flex">
            <button @click="openKycScreen"
            v-if="!kycStatus || (kycStatus && kycStatus.name!=KycStatuses.pendind)"
            type="button" class="rounded-md bg-red-100 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50">
            <span class="flex flex-row items-center">{{ $t('startnewKyc') }}<ArrowRightIcon class="w-6 ml-2"/></span>
          </button>
          </div>
            
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { XCircleIcon,ArrowRightIcon } from '@heroicons/vue/20/solid';

  import {type KycDetail,type KycStatus} from '@/lib/models';
  import { KycStatuses } from '@/lib/contants';
  const props = defineProps({
    kycDetails:{
        type : Object as PropType<KycDetail>
    },
    kycStatus:{
        type : Object as PropType<KycStatus>
    },
  })
  const router = useRouter();
  const { locale } = useI18n();
  const openKycScreen = ()=>{
    router.push('/'+locale.value+'/profile/verify');
  }
  const openUrl = ()=>{
    if(props.kycDetails)
    window.open(props.kycDetails.url,'_self');
  }
  </script>