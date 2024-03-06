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
        <form class="mt-8 space-y-6">
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
            <button @click.prevent="doTheLogin"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" :disabled="isSubmitting || !activateSignin" :class="(isSubmitting || !activateSignin)?'opacity-50':'opacity-100'">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon class="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
              </span>
              {{ $t('signIn') }}
            </button>
            <InLineApiError :err="error"/>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { LockClosedIcon } from '@heroicons/vue/20/solid';
import { stat } from 'fs';
  import { ref,reactive,watch } from 'vue';
import { BadInputException,UnauthenticatedException } from '@/lib/exceptions';
import { validateEmail,verifyIsAccountNumber } from '@/lib/utils/Validators';
import {LoginStorage,AccountStorage } from '@/storage';
import {AccountService,TokenService,LoginService} from '@/lib/services';
import { ServerErrorException } from '@/lib/exceptions';
import { urlBuilder } from '~~/helpers/urlBuilder';
import InLineApiError from '@/components/common/InLineApiError';
  const state = reactive({
    email:'',
    password:'',
    keepMeSignedIn:false
  })
  const errorBorder='focus:border-red-500';
  const normalBorder='focus:border-blue-500';
  const passwordValidated = ref(false);
  const emailValidated = ref(false);
  const isSubmitting = ref(false);
  const activateSignin=ref(false);
  const error = ref(null);
  const router = useRouter();
  const doTheLogin = async()=>{
    try{
        error.value = null;
        isSubmitting.value = true;
        const response = await LoginService.login({
            password:state.password,
            username:state.email
        });
        LoginStorage.saveToken(response.accessToken,state.keepMeSignedIn);
        TokenService.init(response.accessToken.token,response.accessToken.expire);
        AccountStorage.saveContactId(response.account.id,response.accessToken.expire);
        AccountStorage.saveAccount(response.account);
        AccountStorage.saveAccountId(response.account.account.id,response.accessToken.expire);
        AccountService.setAccount(response.account);
        if(state.keepMeSignedIn){
            LoginStorage.saveRefreshToken(response.refreshToken);
            LoginStorage.saveSecret(response.secret);
        }
        const link = router.resolve('/dashboard');
        let locale = 'en'
        response.account.account.settings.forEach(s => {
      if (s.name_translation_key == 'locale') {
        locale = s.value;
      }
    })
      const url = urlBuilder(locale,'/dashboard');
    
        window.open(url,'_self');
    }
    catch(err){
       
        error.value=err;
        
    }
    finally{
        isSubmitting.value = false
    }
    
  }
  watch(state,(currentValue)=>{
    emailValidated.value = validateEmail(currentValue.email) || verifyIsAccountNumber(currentValue.email);
    passwordValidated.value = currentValue.password!="";
    activateSignin.value = (emailValidated.value && passwordValidated.value);
  })
  </script>