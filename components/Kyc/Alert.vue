<template>
    <div class="rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800" v-if="!kycDetails">{{ $t('startAutoIdtext') }}</h3>
          <h3 class="text-sm font-medium text-red-800" v-if="kycDetails && kycDetails.status=='pending'">{{ $t('continueAutIdText') }}</h3>
          <h3 class="text-sm font-medium text-red-800" v-if="kycDetails && kycDetails.status=='failed'">{{ $t('failedAutoIdText') }}</h3>
          <div class="mt-2 text-sm text-red-700">
            <div class="-mx-2 -my-1.5 flex">
            <button @click="openKycScreen"
            type="button" class="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50">{{ $t('startnewKyc') }}</button>
            <button v-if="kycDetails && kycDetails.status=='pending'" @click="openUrl"
            type="button" class="ml-3 rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50">{{ $t('continueAutoId') }}</button>
          </div>
            
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { XCircleIcon } from '@heroicons/vue/20/solid';
  import { PropType } from 'vue';
  import {KycDetail} from '@/lib/models';
  const props = defineProps({
    kycDetails:{
        type : Object as PropType<KycDetail>
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