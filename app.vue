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
import { appNames } from '@/lib/appNames';
import { ChannelTypes } from './lib/contants';
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();
  const initApp =  async ()=>{
    const config = useRuntimeConfig();
    const runTimeEnv = config.public.URL_ENV;
    let appName = appNames.inaiaEu;
    const runTimeApp = config.public.CURRENT_APP;
    if(runTimeApp){
      switch (runTimeApp) {
        case appNames.inaiaEu:
          appName = appNames.inaiaEu;
          break;
        case appNames.getGreenGold:
          appName = appNames.getGreenGold;
          break;
      
        default:
          appName = appNames.inaiaEu;
          break;
      }
    }
    
    App.setAppName(appName);
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
      try{
          let account = await AccountService.loadAccount(contactId);
          const emailChannel = account.channels.find(c=>c.type.name_translation_key==ChannelTypes.email);
          if(emailChannel){
            useBugsnag().setUser(account.account.id.toString(),emailChannel.value);
          }
          AccountStorage.saveAccount(account);
      }
      catch(err){
        
      }
      
      
    }
  }
  onBeforeMount(async ()=>{
     await initApp();

  })
</script>