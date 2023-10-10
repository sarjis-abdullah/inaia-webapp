<template>
  
    <div >
        <AssetSummary/>
        <div class="text-gray-900 mt-6  text-xl">{{ $t('depots') }}</div>
        <DepotList/>
        <div class="mt-6 flex justify-center">
        <div class="text-gray-900  text-xl flex-1">{{ $t('latest_transactions') }}</div>
        <div class="text-blue-500 text-sm">{{ $t('see_more') }}</div>
      </div>
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