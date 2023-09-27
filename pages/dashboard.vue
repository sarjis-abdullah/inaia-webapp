<template>
  
    <div >
        <AssetSummary/>
        <div class="text-gray-900 mt-6  text-xl">{{ $t('depots') }}</div>
        <DepotList/>
        <div class="text-gray-900 mt-6  text-xl">{{ $t('latest_transactions') }}</div>
        <LatestOrders/>
       
    </div>
    
</template>
<script lang="ts" setup>
import AssetSummary from '@/components/Assets/AssetSummary';
import DepotList from '@/components/Assets/DepotList';
import LatestOrders from '@/components/Orders/LatestOrders';
definePageMeta({
  layout:"app-layout",
  middleware:['protected']
});
</script>