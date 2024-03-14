<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 class="text-center mb-8 text-2xl font-bold">{{ $t('reasonForDepot') }}</h2>
        <div class="w-full h-52 flex justify-items-center items-center" v-if="loading">
            <Loading />
        </div>
        <div v-for="(target) in data" :key="target[0].id" class="flex flex-column" v-else>
            <a class="flex w-1/2 justify-items-center items-center p-3 flex-col hover:bg-gray-50 rounded-sm cursor-pointer" @click="selectDepotTarget(target[0])">
                <img :src="target[0].avatar" class="h-32 w-32 rounded-full" v-if="target[0]"/>
                <div class="text-gray-900 mt-3 text-lg">{{ target[0].title }}</div>
            </a>
            <a class="flex w-1/2 justify-items-center items-center p-3 flex-col hover:bg-gray-50 rounded-sm cursor-pointer" @click="selectDepotTarget(target[1])">
                <img :src="target[1].avatar"  v-if="target[1]" class="h-32 w-32 rounded-full"/>
                <div v-if="target[1]" class="text-gray-900 mt-3 text-lg">{{ target[1].title }}</div>
            </a>
        </div>
    </div>
    </div>
</template>
<script lang="ts" setup>
  import { computed,onMounted,ref,Ref } from 'vue';
import { DepotTarget } from '~~/lib/models';
import { SavingPlanService } from '~~/lib/services';
import Loading from '@/components/common/Loading';
const savinPlanTargets : Ref<Array<DepotTarget>>=ref([]);
const loading = ref(false);
const emit = defineEmits<{
  (e: 'choose',target:DepotTarget): void
}>()
const selectDepotTarget = (target:DepotTarget)=>{
    if(target){
        emit('choose',target);
    }
    
}
const data = computed(()=>{
    const result = []
        for (let i = 0; i < savinPlanTargets.value.length; i += 2)
            result.push(savinPlanTargets.value.slice(i, i + 2))
        return result
})
onMounted(async()=>{

    loading.value = true;
    try{
        savinPlanTargets.value = await SavingPlanService.getSavinPlansTargets();
    }
    catch(err){
        useBugsnag().notify(err);
    }
    finally{
        loading.value = false;
    }
})
</script>
