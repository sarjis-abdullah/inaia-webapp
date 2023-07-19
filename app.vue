<template>
    
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
  </template>
  <script lang="ts" setup>
import { BaseUrls } from "./lib/utils/BaseUrls";
import { Envs } from "./lib/utils/Envs";
  
  const initApp =  ()=>{
    const config = useRuntimeConfig();
    console.log(config.URL_ENV);
    const runTimeEnv = config.URL_ENV;
    if(runTimeEnv && runTimeEnv == Envs.production)
      BaseUrls.setEnv(Envs.production);
    else {
      BaseUrls.setEnv(Envs.staging);
    }
  }
  onBeforeMount(()=>{
     initApp();

  })
</script>