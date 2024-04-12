<template>
    <div v-if="!isLoadingAssets">
      <div class="text-center text-sm text-gray-500">{{ $t('totalAmount') }}</div>
      <h1 class="text-center text-4xl">{{ $n(balance) }} €</h1>
      <Alert v-if="!isVerified" :kycDetails="kycDetails" class="my-3" :kycStatus="kycStatus"/>
        <div  class="grid grid-cols-1 md:grid-cols-2 gap-10  mt-10 ">
          <div v-for="asset in assets" :key="asset.name">
           
              <AssetItem   :item="asset" v-if="asset.name.toUpperCase() == AssetTypes.gold.toUpperCase() || asset.name.toUpperCase() == AssetTypes.silver.toUpperCase()"/>
              <PriceHistory :type="asset.name" class="mt-6" v-if="asset.name.toUpperCase() == AssetTypes.gold.toUpperCase() || asset.name.toUpperCase() == AssetTypes.silver.toUpperCase()"/>
            
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
import {type Asset, type KycDetail,type KycStatus} from '@/lib/models';
import { AssetsService } from '@/lib/services';
import { AccountStorage } from '@/storage';
import { onMounted,Ref,ref } from 'vue';
import {
  ContentLoader,
} from 'vue-content-loader';
import { AssetTypes } from '~~/lib/contants';
const assets:Ref<Array<Asset>>=ref([]);
  import  Alert  from '@/components/Kyc/Alert.vue';
const isLoadingAssets = ref(true);
const props = defineProps({
    kycDetails:{
        type : Object as PropType<KycDetail>
    },
    kycStatus:{
        type : Object as PropType<KycStatus>
    },
    isVerified:{
      type:Boolean
    }
  })
onMounted(async ()=>{

  const accountId = AccountStorage.getAccountId();
      
  try{
    isLoadingAssets.value = true;
    assets.value = await AssetsService.getAssets(accountId);
  }
  catch(err){
    useBugsnag().notify(err);
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