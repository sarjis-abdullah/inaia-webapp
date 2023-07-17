<template>
    <div class="flex min-h-full flex-1 justify-center items-center flex-col p-10">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img class="mx-auto w-36 h-auto" src="~/assets/img/logo/logo.png" alt="INAIA GmbH" />

          <div class="bg-white py-8 mt-10 mb-10 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ $t('reset_pin') }}</h2>
            <img src="~/assets/img/pageicons/pinscreen.jpg" alt="pin" class="w-32 h-auto my-4 mx-auto"/>

            <div class="mt-8 text-gray-900" v-if="loading">{{ $t('resetting_pin') }}</div>
            <div class="mt-8 flex justify-start" v-else-if="success">
              <CheckCircleIcon class="w-14 h-auto text-green-500"></CheckCircleIcon>
              <span class="text-green-500 ml-2">{{ $t('pin_reset_successfully') }}</span>
            </div>
            <div class="mt-8 text-center text-red-500" v-else-if="isError">{{ error }}</div>
          </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
const { t,locale } = useI18n();
import {ref,reactive,toRefs,watch,computed,onMounted} from 'vue';
import { ResetPinService } from '@/lib/services/ResetPinService';
import { MissingInformationException } from '~~/lib/exceptions/MissingInformationException';
import { ServerErrorException } from '~~/lib/exceptions/ServerErrorException';
import {  CheckCircleIcon } from '@heroicons/vue/20/solid';
const loading = ref(false);
const token = ref('');
const email = ref('');
const error = ref('');
const success = ref(false);
const isError = ref(false);
useHead({
  htmlAttrs: {
    class: 'h-full bg-gray-50'
  },
  bodyAttrs: {
    class: 'h-full align-middle'
  }
}),
onMounted(()=>{
    const {query}= useRoute();
    if(query.token){
        token.value = query.token;

        resetThePin();
    }
    else{
        isError.value = true;
        error.value = t('error_resetting_pin_no_token');
    }
})
async function resetThePin(){
        try{
            loading.value = true;
            isError.value = false;
            success.value = false;
            await ResetPinService.resetPin(locale.value,{token:token.value});
            success.value = true;
        }
        catch(err){
            isError.value = true;
            if(err instanceof MissingInformationException){
                error.value = err.getRealMessage();
            }
            else if(err instanceof ServerErrorException){
                error.value = t(err.getTranslationKey());
            }
            else{
                error.value = t('error_resetting_pin');
            }
        }
        finally{
            success.value = false
            loading.value = false;
        }
}

</script>
