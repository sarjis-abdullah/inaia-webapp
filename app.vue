<template>
    <div>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>
  </template>
  <script lang="ts" setup>
  import {onBeforeMount,ref} from 'vue';
import { AccountService,LoginService,TokenService,CurrencyService } from './lib/services';
import { AccountStorage,LoginStorage } from './storage';
import { BaseUrls } from "./lib/utils/BaseUrls";
import { Envs } from "./lib/utils/Envs";
import { AssetStorage } from './storage/AssetStorage';
import { App } from './lib/app';
import { UnauthenticatedListener } from './lib/listeners';
import LogoutHelper from './helpers/LogoutHelper';
import { appNames } from '@/lib/appNames';
import { ChannelTypes, Currencies } from './lib/contants';
import { inaiaUk } from './appNames';
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();
  const initApp =  async ()=>{
    const config = useRuntimeConfig();
    const runTimeEnv = config.public.URL_ENV;
    let appName = appNames.inaiaEu;
    const runTimeApp = config.public.CURRENT_APP;
    console.log(runTimeApp);
    if(runTimeApp){
      switch (runTimeApp) {
        case appNames.inaiaEu:
          appName = appNames.inaiaEu;
          break;
        case appNames.getGreenGold:
          appName = appNames.getGreenGold;
          break;
        case appNames.inaiaUk:
          appName = appNames.inaiaUk;
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
    if(appName == appNames.inaiaUk){
     CurrencyService.setCurrency(Currencies[1]);
    }
    else{
      CurrencyService.setCurrency(Currencies[0]);
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