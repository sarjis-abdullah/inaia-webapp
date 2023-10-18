<template>
    <a class="flex flex-row rounded-lg bg-white shadow p-3 items-center max-w-md max-h-32" >
        <img :src="depot?depot.avatar:''" class="w-16 h-16 rounded-full"/>
        <div class="ml-4">
            <div class="text-gray-900">
                {{ $t('depot') }} # {{ depot?.depot_number }}
            </div>
            <div class="text-gray-900 font-semibold text-xl">
                <span class="inline-flex h-2 w-2 rounded-full" :class="getColor"/> <span class="text-gray-900">{{  depot?.name }}</span>
            </div>
            <div class="text-gray-900">
                 {{ depot?$n(depot.gram_amount*getPrice/1000):0 }} {{ currency }}
            </div>
            <div class="text-gray-400 mt--3">
                 {{ depot?$n(depot?.gram_amount/1000):0 }} g
            </div>
            
        </div>
    </a>
</template>
<script lang="ts" setup>
import {ref,PropType,Ref} from 'vue';
import { Depot } from '@/lib/models';
import { AssetTypes } from '@/lib/contants';
import { CurrencyService } from '@/lib/services';
import { AssetStorage } from '~~/storage/AssetStorage';
const props = defineProps({
    depot:{
        type: Object as PropType<Depot>
    }
})
const currency = CurrencyService.getCurrencySymbol();
const silverPrice : Ref<number> = ref(0);
const goldPrice : Ref<number> = ref(0);
onMounted(async ()=>{
    goldPrice.value = await AssetStorage.getGoldPrice();
    silverPrice.value = await AssetStorage.getSilverPrice();
})

const getColor = computed( ()=>{
  if(props.depot && props.depot.depot_type){
    if(props.depot.depot_type.name_translation_key.toLocaleUpperCase() == AssetTypes.gold.toLocaleUpperCase()){
      return 'bg-amber-300'; 
      
    }
    if(props.depot.depot_type.name_translation_key.toLocaleUpperCase() == AssetTypes.silver.toLocaleUpperCase()){
      return 'bg-slate-300'; 
    }
  }
})
const getPrice = computed( ()=>{
  if(props.depot && props.depot.depot_type){
    if(props.depot.depot_type.name_translation_key.toLocaleUpperCase() == AssetTypes.gold.toLocaleUpperCase()){
      return goldPrice.value; 
      
    }
    if(props.depot.depot_type.name_translation_key.toLocaleUpperCase() == AssetTypes.silver.toLocaleUpperCase()){
      return silverPrice.value; 
    }
  }
})
</script>