<template>
  
    <div >
      
        <AssetSummary :isVerified="isVerified" :kycDetails="kycDetails" :kycStatus="kycStatus"/>
        
        <DepotList class="mt-6" :isVerified="isVerified"/>
       
        <LatestOrders class="mt-6"/>
       
    </div>
    
</template>
<script lang="ts" setup>
import AssetSummary from '@/components/Assets/AssetSummary';
import DepotList from '@/components/Assets/DepotList';
import LatestOrders from '@/components/Orders/LatestOrders';
import { AccountStorage } from '~~/storage';
  import {type Account} from '@/lib/models';
  import { AccountService } from '@/lib/services';
  import {Ref} from 'vue';
definePageMeta({
  layout:"app-layout",
  middleware:['protected']
});
const account : Ref<Account> = ref(null);
const isVerified = ref(false);
const kycDetails = ref(null);
const kycStatus = ref(null);
onMounted(async ()=>{
  account.value = AccountStorage.getAccount();
  if(!account.value){
    const contact_id = AccountStorage.getContactId();
    account.value = await AccountService.getAccount(contact_id);
    
  }
  if(account.value){
    isVerified.value = account.value.is_verified;
    kycDetails.value = account.value.account.kyc_details;
    kycStatus.value = account.value.kyc_status
  }
})
</script>