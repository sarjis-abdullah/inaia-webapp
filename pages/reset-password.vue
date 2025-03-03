<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

    <div class="sm:mx-auto sm:w-full sm:max-w-md">

      <img class="mx-auto w-36 h-auto" src="~/assets/img/logo/logo.png" alt="INAIA GmbH" />

      <div class="bg-white py-8 mt-10 mb-10 px-4 shadow sm:rounded-lg sm:px-10">

        <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ $t('reset_password_title')
          }}</h2>
        <img src="~/assets/img/pageicons/pinscreen.jpg" alt="pin" class="w-32 h-auto my-4 mx-auto" />

        <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm" >
          <div v-if="!isLoading && state.email && stillValid">
            <form class="space-y-6" action="#" method="POST" v-if="success == ''">
              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('email') }}</label>
                <div class="mt-1">
                  <input id="email" name="email" v-model="state.email" type="email"
                    :class="emailValidated ? 'block w-full bg-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6' : inputErrorStyle"
                    disabled />
                </div>
                <p class="mt-1 text-center text-sm text-red-500" v-if="!emailValidated">{{ $t('email_is_required') }}
                </p>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('new_password')
                  }}</label>
                <div class="mt-1">
                  <input id="newpassword" name="newpassword" type="password" v-model="state.password"
                    :class="passwordValidated ? 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6' : inputErrorStyle" />
                </div>
                <p class="mt-1 text-center text-sm text-gray-500"
                  :class="passwordValidated ? 'text-gray-500' : 'text-red-500'">{{ $t('password_message') }}</p>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">{{
          $t('confirm_password') }}</label>

                </div>
                <div class="mt-1">
                  <input id="password" name="password" type="password" v-model="state.confirmPassword"
                    :class="confirmedPasswordValidated ? 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6' : inputErrorStyle" />
                </div>
                <p class="mt-1 text-center text-sm text-red-500" v-if="!confirmedPasswordValidated">{{
          $t('confirm_password_is_required') }}</p>
              </div>

              <div>
                <button type="submit" :class="(disabled || isSubmitting) ? 'opacity-50' : 'opacity-100'"
                  @click.prevent="commit" :disabled="disabled || isSubmitting"
                  class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{{
                  $t('confirm') }}</button>
              </div>
            </form>
            <InLineApiError :err="error" />
            <div class="mt-1 flex items-center justify-center" v-if="success!=''">
              <CheckCircleIcon class="h-6 w-6 text-green-500">

              </CheckCircleIcon>
              <span class="text-2xl text-green-500 ml-2">{{ success }}</span>
            </div>
          </div>
          <div v-else-if="isLoading">
            <p class="text-center ">{{ $t('checking') }}...</p>
            <div class="flex justify-center mt-6">
              <Loading class=""/>
            </div>
          </div>
          <div v-else-if="!isLoading && (!state.email || !token || !stillValid)">
            <p class="text-center ">{{ $t('requestNewLink') }}</p>
            <div class="flex justify-center mt-6">
              <NuxtLink :to="'/'+locale+'/request-password'" class="text-blue-600 cursor-pointer font-semibold">{{ $t('clickHere') }}</NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const { t,locale } = useI18n();
import {ref,reactive,toRefs,watch,computed,onMounted, ErrorCodes} from 'vue';
import {validateEmail,validatePassword} from '@/lib/utils/Validators';
import { MissingInformationException,ServerErrorException,BadInputException } from '@/lib/exceptions';
import {ResetPasswordService} from '@/lib/services';
import {  CheckCircleIcon } from '@heroicons/vue/20/solid';
import { I18nN } from '@nuxtjs/i18n/dist/runtime/composables';
import InLineApiError from '@/components/common/InLineApiError';
import Loading from '~/components/common/Loading.vue';
import { ErrorCode } from '~/lib/contants';
const inputErrorStyle = "block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6";
const passwordValidated = ref(true);
const emailValidated = ref(true);
const confirmedPasswordValidated = ref(true)
const disabled = ref(true);
const isSubmitting = ref(false);

const token = ref('');
const error = ref(null);
const success = ref('')
const router = useRouter();
const stillValid = ref(true);
const isLoading = ref(false);
const state = reactive({
    email:'',
    password:'',
    confirmPassword:'',
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
    passwordValidated.value = validatePassword(currentValue.password);
    emailValidated.value = validateEmail(currentValue.email);
    confirmedPasswordValidated.value = passwordValidated.value && (currentValue.confirmPassword == currentValue.password)
    disabled.value = !(passwordValidated.value && emailValidated.value && confirmedPasswordValidated.value && token.value!='')
})
onMounted(async ()=>{
    const {query}= useRoute();
    if(!query.token || !query.email){
     
      router.replace('/'+locale.value+"/request-password");
    }
    if(query.email){
        state.email = query.email;
    }
    if(query.email && query.token){
        token.value = query.token;
        if(token.value){
          isLoading.value = true;
          try{
            await ResetPasswordService.verifyRestToken({
              email:state.email,
              token:token.value
            });

          }
          catch(err){
            if(err instanceof BadInputException){
              stillValid.value = false
            }
          }
          finally{
            isLoading.value = false;
          }
        }
    }
    
    

})
async function commit() {
    isSubmitting.value = true;
    error.value = null;
    try{
        await ResetPasswordService.resetPassword(locale.value,{
            email:state.email,
            password : state.password,
            token : token.value,
            password_confirmation:state.confirmPassword
        },);
        /*state.confirmPassword = '';
        state.email = '';
        state.confirmPassword = "";
        token.value = '';*/
        success.value = t('password_reset_with_success');
    }
    catch(err){
      
      if(err && err.getRealMessage && err.getRealMessage() == ErrorCode.invalid_link)
      {
          stillValid.value = false
      }
      else{
        error.value = err;
      }
      

    }
    finally{
        isSubmitting.value = false;
    }
}
</script>
