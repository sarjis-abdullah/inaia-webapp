<template>
    <div>
      <div class="text-center text-sm text-gray-500">Total amount</div>
      <h1 class="text-center text-4xl">{{ $n(balance) }} €</h1>
       <div class="mt-5 p-10 grid grid-flow-col gap-6 sm:grid-flow-col md:grid-flow-col lg:grid-flow-col">
          <AssetSummary v-for="asset in assets" :key="asset.name" :item="asset"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import AssetSummary from '@/components/Assets/AssetSummary';
import {Asset} from '@/lib/models/Asset';
import { AssetsService } from '@/lib/services/AssetsService';
import { AccountStorage } from '@/storage/AccountStorage';
import { onMounted,Ref,ref } from 'vue';
import { AssetTypes } from '~~/lib/contants/AssetTypes';
definePageMeta({
  layout:"app-layout"
});
const assets:Ref<Array<Asset>>=ref([])
onMounted(()=>{
  const accountId = AccountStorage.getAccountId();
  AssetsService.getAssets(accountId).then((res)=>{
    assets.value=res;  
  })
})
const balance = computed(()=>{
  let sum = 0;
  assets.value.forEach(asset =>{
    if(asset.name == AssetTypes.gold){
      sum+=asset.gold_in_euro;
    }
    if(asset.name == AssetTypes.silver){
      sum+=asset.silver_in_euro;
    }
    if(asset.name == AssetTypes.euro){
      sum+=asset.amount;
    }
  })
  return sum;
})
</script>