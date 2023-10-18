<template>
    <div v-if="!isLoadingAssets">
      <div class="text-center text-sm text-gray-500">Total amount</div>
      <h1 class="text-center text-4xl">{{ $n(balance) }} €</h1>
       
        <div  class="grid grid-cols-2 gap-10 mt-10">
          <div v-for="asset in assets" :key="asset.name">
          <AssetItem   :item="asset"/>
          <PriceHistory :type="asset.name" class="mt-6"/>
          </div>
        </div>
      </div>
      <div v-else>
        <ContentLoader viewBox="0 0 250 50">
          <rect x="110" y="0" rx="3" ry="3" width="30" height="3" />
          <rect x="100" y="6" rx="3" ry="3" width="50" height="5" />
          <rect x="0" y="20" rx="3" ry="3" width="120" height="25" >
            
          </rect>
          <rect x="130" y="20" rx="3" ry="3" width="120" height="25" >
            
          </rect>
        </ContentLoader>
      </div>
</template>
<script lang="ts" setup>
import AssetItem from '@/components/Assets/AssetItem';
import PriceHistory from '@/components/Assets/PriceHistory';
import {Asset} from '@/lib/models';
import { AssetsService } from '@/lib/services';
import { AccountStorage } from '@/storage';
import { onMounted,Ref,ref } from 'vue';
import {
  ContentLoader,
} from 'vue-content-loader';
import { AssetTypes } from '~~/lib/contants';
const assets:Ref<Array<Asset>>=ref([]);
const isLoadingAssets = ref(true);
onMounted(async ()=>{

  const accountId = AccountStorage.getAccountId();
      
  try{
    isLoadingAssets.value = true;
    assets.value = await AssetsService.getAssets(accountId);
  }
  catch(err){
    
  }
  finally{
    isLoadingAssets.value = false;
  }
  
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