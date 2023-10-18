<template>
  
    <div >
        <AssetSummary/>
        
        <DepotList class="mt-6"/>
       
        <LatestOrders class="mt-6"/>
       
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