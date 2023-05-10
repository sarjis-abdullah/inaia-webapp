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
  const initApp =  async ()=>{
    const token = LoginStorage.getToken();
    const contactId = AccountStorage.getContactId();
    if(token && contactId && contactId>-1){
      const expDate = LoginStorage.getExpDate()
      LoginService.setIsLoggedIn(true);
      TokenService.init(token,expDate);
      await AccountService.loadAccount(contactId);
    }
  }            
  onBeforeMount(async()=>{
    console.log('initiating...')
     await initApp();

  })
</script>