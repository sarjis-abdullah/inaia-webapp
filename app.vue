<template>
    <div>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>
  </template>
  <script lang="ts" setup>
  import {onBeforeMount,ref} from 'vue';
import { AccountService,LoginService,TokenService,AssetsService } from './lib/services';
import { AccountStorage,LoginStorage } from './storage';
import { BaseUrls } from "./lib/utils/BaseUrls";
import { Envs } from "./lib/utils/Envs";
import { AssetStorage } from './storage/AssetStorage';
import { App } from './lib/app';
import { UnauthenticatedListener } from './lib/listeners';
import LogoutHelper from './helpers/LogoutHelper';
const router = useRouter();
  const initApp =  async ()=>{
    const config = useRuntimeConfig();
    const runTimeEnv = config.URL_ENV;
    App.clearListeners();
    if(runTimeEnv && runTimeEnv == Envs.production)
      BaseUrls.setEnv(Envs.production);
    else {
      BaseUrls.setEnv(Envs.staging);
    }
    const token = LoginStorage.getToken();
    const contactId = AccountStorage.getContactId();

    if(token && contactId && contactId>-1){
      App.registerListner( new UnauthenticatedListener(()=>{
        LogoutHelper(router);
      }))
      const expDate = LoginStorage.getExpDate()
      LoginService.setIsLoggedIn(true);
      TokenService.init(token,expDate);
      await AccountService.loadAccount(contactId);

      
      
    }
  }
  onBeforeMount(async ()=>{
     await initApp();

  })
</script>