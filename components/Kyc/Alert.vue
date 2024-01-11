<template>
    <div class="rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800" v-if="!kycDetails">{{ $t('startAutoIdtext') }}</h3>
          <h3 class="text-sm font-medium text-red-800" v-if="kycDetails && kycStatus && kycStatus.name=='pending'">{{ $t('kycStatusIsPending') }}</h3>
          <h3 class="text-sm font-medium text-red-800" v-if="kycDetails && kycStatus && kycDetails.status=='failed'">{{ $t('kycStatusIsFailed') }}</h3>
          <div class="mt-2 text-sm text-red-700">
            <div class="-mx-2 -my-1.5 flex">
            <button @click="openKycScreen"
            v-if="(kycDetails && kycStatus && kycDetails.status=='failed') || !kycDetails"
            type="button" class="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50">{{ $t('startnewKyc') }}</button>
          </div>
            
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { XCircleIcon } from '@heroicons/vue/20/solid';
  import { PropType } from 'vue';
  import {KycDetail, KycStatus} from '@/lib/models';
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