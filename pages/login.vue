<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <div>
          <img class="mx-auto h-12 w-auto" src="~/assets/img/logo/logo.png" alt="Your Company" />
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">{{ $t('signin') }}</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            {{ $t('or') }}
            {{ ' ' }}
            <NuxtLink to="register" class="font-medium text-blue-600 hover:text-blue-500">{{ $t('register') }}</NuxtLink>
          </p>
        </div>
        <form v-if="!showCodeInput" class="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div class="-space-y-px rounded-md shadow-sm">
            <div>
              <label for="email-address" class="sr-only">{{ $t('emailAddress') }}</label>
              <input id="email-address" name="email" type="email" autocomplete="email" required="" v-model="state.email"
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none focus:ring-blue-500 sm:text-sm" :placeholder="$t('emailAddress')" 
              :class="emailValidated?normalBorder:errorBorder"
              />
            </div>
            <div>
              <label for="password" class="sr-only">{{ $t('password') }}</label>
              <input id="password" name="password" type="password" autocomplete="current-password" required="" v-model="state.password"
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none focus:ring-blue-500 sm:text-sm" :placeholder="$t('password')" 
              :class="passwordValidated?normalBorder:errorBorder"
              />
            </div>
          </div>
  
          <div class="flex items-center justify-end">
            
  
            <div class="text-sm">
              <NuxtLink to="request-password" class="font-medium text-blue-600 hover:text-blue-500">{{ $t('forGotPassword') }}</NuxtLink>
            </div>
          </div>
  
          <div>
            <button @click.prevent="initialLogin"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" :disabled="isSubmitting || !activateSignin" :class="(isSubmitting || !activateSignin)?'opacity-50':'opacity-100'">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon class="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
              </span>
              {{ $t('signIn') }}
            </button>
            <InLineApiError :err="error"/>
          </div>
        </form>
        <div v-else class="text-center">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div class="flex flex-row w-full">
              <a @click="()=> {
                showCodeInput = false
                error = null
              }" class="cursor-pointer"><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  class="h-8 text-blue-500 font-bold"
                  style=""
                >
                  <path
                    fill-rule="evenodd"
                    d="M20.25 12a.75.75 0 0 1-.75.75H6.31l5.47 5.47a.75.75 0 1 1-1.06 1.06l-6.75-6.75a.75.75 0 0 1 0-1.06l6.75-6.75a.75.75 0 1 1 1.06 1.06l-5.47 5.47H19.5a.75.75 0 0 1 .75.75Z"
                    clip-rule="evenodd"
                  ></path></svg
              ></a>
            </div>
            <div>
              <div>
                <img src="~/assets/img/pageicons/pinscreen.jpg" alt="personal info" class="w-32 h-auto mb-5 mx-auto"/>
                <h2 class="text-center mb-8 text-xl">
                  <span v-if="primaryResponse?.method">{{getMethodWiseText(primaryResponse.method)}}</span>
                </h2>              
              </div>
              <CodeInputs @complete="verifyMfa" :length="4" />
              <div v-if="alternativeMethods?.length && !isSubmitting" class="mt-8">
                <p>{{ $t('choose_other_confirming_method') }}</p>
                <ul>
                  <li v-for="(method, index) in alternativeMethods" :key="index" 
                      @click="selectAlternativeMethod(method)" 
                      class="cursor-pointer underline text-blue-500">
                    {{ getMethod(method) }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-8 flex justify-center">
              <Loading v-if="isSubmitting"/>
              <InLineApiError v-else :err="error"/>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { LockClosedIcon } from '@heroicons/vue/20/solid';
  import { ref,reactive,watch, Ref } from 'vue';
  import { BadInputException,UnauthenticatedException } from '@/lib/exceptions';
  import { validateEmail,verifyIsAccountNumber } from '@/lib/utils/Validators';
  import {LoginStorage,AccountStorage } from '@/storage';
  import {AccountService,TokenService,LoginService} from '@/lib/services';
  import { ServerErrorException } from '@/lib/exceptions';
  import { urlBuilder } from '@/helpers/urlBuilder';
  import InLineApiError from '@/components/common/InLineApiError';
  import Loading from '@/components/common/Loading';
  import CodeInputs from '@/components/Register/CodeInputs';
  import ListItem from '@/components/common/ListItem.vue';
  const { t } = useI18n();


  type LoginResponse = {
    message: string;
    messageType: string;
    status: string;
    method: string;
    tempBearerToken: string;
    confirmation_url: string;
    approval_id: number;
    alternativeMethods: [];
  };
  const METHOD = "2fa"
  const state = reactive({
    email:'',
    password:'',
    method:METHOD,
    keepMeSignedIn:false
  })
  const errorBorder='focus:border-red-500';
  const normalBorder='focus:border-blue-500';
  const passwordValidated = ref(false);
  const emailValidated = ref(false);
  const isSubmitting = ref(false);
  const showCodeInput = ref(false);
  const activateSignin=ref(false);
  const error = ref(null);
  const router = useRouter();
  const loginData = computed(()=> {
    return {
      password:state.password,
      username:state.email,
      method:state.method,
    }
  })
  const primaryResponse: Ref<LoginResponse|null> = ref(null)
  const verifyMfa = async(code: string)=>{
    try{
      if (primaryResponse?.value?.tempBearerToken) {
        error.value = null;
        isSubmitting.value = true;
        const response = await LoginService.verifyMfa({code}, primaryResponse.value.tempBearerToken);
        primaryResponse.value = null
        LoginStorage.saveToken(response.accessToken,state.keepMeSignedIn);
        TokenService.init(response.accessToken.token,response.accessToken.expire);
        AccountStorage.saveContactId(response.account.id,response.accessToken.expire);
        AccountStorage.saveAccount(response.account);
        if(response.account && response.account.account && response.account.account.id){
          AccountStorage.saveAccountId(response.account.account.id,response.accessToken.expire);
        }
        AccountService.setAccount(response.account);
       
        if(state.keepMeSignedIn){
            LoginStorage.saveRefreshToken(response.refreshToken);
            LoginStorage.saveSecret(response.secret);
        }
        const link = router.resolve('/dashboard');
        let locale = 'en'
        if(response.account && response.account.account && response.account.account.settings && response.account.account.settings.length){
          response.account.account.settings.forEach(s => {
            if (s.name_translation_key == 'locale') {
              locale = s.value;
            }
          })
        }
        const url = urlBuilder(locale,'/dashboard');
        router.push('/' + locale + '/dashboard')
      }
    }
    catch(err){
        error.value=err;
    }
    finally{
        isSubmitting.value = false
    }
  }
  const alternativeMethods = computed(()=> {
      if(primaryResponse.value?.alternativeMethods?.length){
        return primaryResponse.value?.alternativeMethods
      }
      return []
    }
  )
  const initialLogin = async()=>{
    try{
        error.value = null;
        isSubmitting.value = true;
        const response = await LoginService.login(loginData.value);
        showCodeInput.value = true
        if (response) {
          primaryResponse.value = response
        }
    }
    catch(err){
        error.value=err;
    }
    finally{
        isSubmitting.value = false
    }
  }
  const selectAlternativeMethod = (method: string) => {
    state.method = method
    initialLogin()
  }
  const getMethod = (method: string) => {
    switch(method){
      case 'mobile-pin':
        return "Mobile PIN";
      case 'email':
        return "Email";
      case 'sms':
        return "SMS";
      default:
      return "2FA"
    }
  }
  const getMethodWiseText = (method: string) => {
    switch(method){
      case 'mobile-pin':
        return t('mobile_pin_verify_able_message');
      case 'email':
        return t('email_verify_able_message');
      case 'sms':
        return t('sms_verify_able_message');
      default:
        return t('two_fa_verify_able_message')
    }
  }
  watch(state,(currentValue)=>{
    emailValidated.value = validateEmail(currentValue.email) || verifyIsAccountNumber(currentValue.email);
    passwordValidated.value = currentValue.password!="";
    activateSignin.value = (emailValidated.value && passwordValidated.value);
  })
  </script>