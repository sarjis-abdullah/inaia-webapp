<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 class="text-center mb-8 text-2xl font-bold">{{ $t('createYourPlanInSomeMinutes') }}</h2>
            <img :src="imgSrc" alt="asset" class="h-auto mb-5 mx-auto" :class="imageDimansions"/>
            <div class="text-center font-semibold my-3 text-gray-900">{{ headline }}</div>
            <div class="my-3 text-gray-900">{{ infoMessage }}</div>
            <div class="mt-8">
                <button   @click.prevent="createDepot"
                     
                      class="flex w-full justify-center rounded-md border border-blue-600 bg-transparent py-2 px-4 text-sm font-medium text-blue-600  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-3" >{{ $t('createDepot') }}</button>
                  <button   @click.prevent="setupSavingsPlan"
                     
                      class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{ $t('setupSavingPlanNow') }}</button>
                </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { AssetTypes } from "~~/lib/contants";
const props = defineProps({
    type:{
             type:String,
             
         },
})
const { t } = useI18n();
const imgSrc = ref('');
const headline = ref('');
const infoMessage = ref('');
const imageDimansions = ref('w-32');
const emit = defineEmits<{
  (e: 'onDepotCreated'): void
  (e: 'onSavingPlanSetup'): void
}>()
onMounted(()=>{
    if(props.type == AssetTypes.gold){
        imgSrc.value = new URL('~/assets/img/icons/golddinar_barren.jpg',import.meta.url).href;
        headline.value = t('createGoldSavingsplanHeadline')
        infoMessage.value = t('createSilverSavingsplanInfoText')
        imageDimansions.value = 'w-64';
    }
    if(props.type == AssetTypes.silver){
        
        imgSrc.value = new URL('~/assets/img/icons/savingsplan_silver.png',import.meta.url).href;
        headline.value = t('createSilverSavingsplanHeadline');
        infoMessage.value = t('createSilverSavingsplanInfoText')
    }
}) 
const setupSavingsPlan = ()=>{
    emit('onSavingPlanSetup');
}
const createDepot = ()=>{
    emit('onDepotCreated');
}
</script>