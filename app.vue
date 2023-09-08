<template>
    <div>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>
  </template>
  <script lang="ts" setup>
  import {onBeforeMount,ref} from 'vue';
import { AccountService } from './lib/services/AccountService';
import { LoginService } from './lib/services/LoginService';
import { TokenService } from './lib/services/TokenService';
import { AccountStorage } from './storage/AccountStorage';
import { LoginStorage } from './storage/LoginStorage';
import { BaseUrls } from "./lib/utils/BaseUrls";
import { Envs } from "./lib/utils/Envs";
  const initApp =  async ()=>{
    const config = useRuntimeConfig();
    console.log(config.URL_ENV);
    const runTimeEnv = config.URL_ENV;
    if(runTimeEnv && runTimeEnv == Envs.production)
      BaseUrls.setEnv(Envs.production);
    else {
      BaseUrls.setEnv(Envs.staging);
    }
    const token = LoginStorage.getToken();
    const contactId = AccountStorage.getContactId();
    if(token && contactId && contactId>-1){
      const expDate = LoginStorage.getExpDate()
      LoginService.setIsLoggedIn(true);
      TokenService.init(token,expDate);
      await AccountService.loadAccount(contactId);
    }
  }
  onBeforeMount(()=>{
     initApp();

  })
</script>