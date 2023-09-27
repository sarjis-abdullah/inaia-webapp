<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
  
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
  
        <img class="mx-auto w-36 h-auto" src="~/assets/img/logo/logo.png" alt="INAIA GmbH" />
  
        <div class="bg-white py-8 mt-10 mb-10 px-4 shadow sm:rounded-lg sm:px-10">
  
          <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ $t('request_password_title') }}</h2>
          <img src="~/assets/img/pageicons/forgetpassword.png" alt="pin" class="w-32 h-auto my-4 mx-auto"/>
  
          <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm" >
            <form class="space-y-6" action="#" method="POST" v-if="success==''">
                <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('email') }}</label>
              <div class="mt-1">
                <input id="email" name="email" v-model="state.email" type="email" :class="emailValidated?'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6':inputErrorStyle" />
              </div>
              <p class="mt-1 text-center text-sm text-red-500" v-if="!emailValidated">{{ $t('email_is_required') }}</p>
            </div>
              <div>
                <button type="submit" :class="(disabled || isSubmitting)?'opacity-50':'opacity-100'"
                @click.prevent="commit"
                :disabled="disabled || isSubmitting"
                class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{{ $t('confirm') }}</button>
              </div>
            </form>
            <p class="mt-1 text-center text-sm text-red-500" v-if="error!=''">{{ error }}</p>
            <div class="mt-1 flex items-center justify-center"  v-if="success!=''"><CheckCircleIcon class="h-8 w-8 text-green-500">
  
            </CheckCircleIcon>
              <span class="text-lg text-green-500 ml-2">{{ success }}</span>
          </div>
          </div>
  
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  const { t,locale } = useI18n();
  import {ref,reactive,toRefs,watch,computed,onMounted} from 'vue';
  import {sanitizeEmail, validateEmail,validatePassword} from '@/lib/utils/Validators';
  import { MissingInformationException } from '~~/lib/exceptions/MissingInformationException';
  import { ServerErrorException } from '~~/lib/exceptions/ServerErrorException';
  import {ResetPasswordService} from '@/lib/services/ResetPasswordService';
  import {  CheckCircleIcon } from '@heroicons/vue/20/solid';
  import { I18nN } from '@nuxtjs/i18n/dist/runtime/composables';
  const inputErrorStyle = "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6";
  const emailValidated = ref(true);
  const disabled = ref(true);
  const isSubmitting = ref(false);
  const error = ref('');
  const success = ref('')
  const state = reactive({
      email:''
  });
  useHead({
    htmlAttrs: {
      class: 'h-full bg-gray-50'
    },
    bodyAttrs: {
      class: 'h-full align-middle'
    }
  }),
  watch(state,(currentValue)=>{
      
      emailValidated.value = validateEmail(sanitizeEmail(currentValue.email));
      
      disabled.value = !(emailValidated.value)
  })
  async function commit() {
      isSubmitting.value = true;
      error.value = "";
      
      try{
          await ResetPasswordService.requestNewPassword(locale.value,sanitizeEmail(state.email));
          state.email = '';
          success.value = t('password_request_with_success');
      }
      catch(err){
          if(err instanceof MissingInformationException){
              error.value = err.getRealMessage();
          }
          else if(err instanceof ServerErrorException){
              error.value = t(err.getTranslationKey());
          }
  
      }
      finally{
          isSubmitting.value = false;
      }
  }
  </script>
  