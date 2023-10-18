<template>
    <div>
    <div  class="grid grid-cols-3 gap-10 mt-10">
        <div class="col-span-2">
            
            <DepotHistoryChart :depot="depot" v-if="depot"/>
            
        </div>
        <div class="">
            <SavingPlanDetail :depot="depot" class="mb-6"/>
        </div>
        
    </div>
    <DepotOrders :depot="depot" v-if="depot" class="mt-6"/>
    </div>
</template>
<script lang="ts" setup>
import {Ref,ref,onMounted} from 'vue';
import { Depot } from '@/lib/models';
import DepotDetails from '@/components/Assets/DepotDetails';
import DepotHistoryChart from '@/components/Assets/DepotHistoryChart';
import SavingPlanDetail from '@/components/Assets/SavingPlanDetail';
import DepotOrders from '@/components/Orders/DepotOrders';
import { AssetsService } from '~~/lib/services';

definePageMeta({
  layout:"app-layout",
  middleware:['protected'],
});
const route = useRoute();
const id = route.params.id;
const depot: Ref<Depot | null> = ref(null);
const loadingData = ref(false)
onMounted(async()=>{
    try{
        loadingData.value = true
        depot.value = await AssetsService.getDepotDetails(id);
    }
    catch(err){
        loadingData.value = false
    }
})
</script>