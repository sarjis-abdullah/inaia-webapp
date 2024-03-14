<template>
    <Listbox as="div" v-model="selected" v-if="!isLoading">
      <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{ label?label:$t('depot') }}</ListboxLabel>
      <div class="relative mt-2">
        <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6">
          <span class="flex items-center">
            <img v-if="selected" :src="selected?selected.avatar:''" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" />
            <span class="ml-3 block truncate">{{ selected?selected.name:$t('select') }}</span>
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>
  
        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="depot in depots" :key="depot.id" :value="depot" v-slot="{ active, selected }">
              <li :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                <div class="flex items-center">
                  <img :src="depot.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" />
                  <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{ depot.name }}</span>
                  <span class="ml-3 inline-flex h-2 w-2 rounded-full" :class="getColor(depot)"/>
                </div>
  
                <span v-if="selected" :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
                <span v-else class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600">
                    {{ (depot.gram_amount-depot.gram_amount_pending_orders)/1000 }} g
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <div v-else class="w-full">
        <Loading class="mx-auto"/>
    </div>
  </template>
  
  <script setup lang="ts">
  import Loading from '@/components/common/Loading';
  import { ref,Ref } from 'vue'
  import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
  import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
  import { PaginationResponse } from '@/lib/responses';
  import { AssetsService } from '@/lib/services';
  import { type Depot, type DepotType } from '@/lib/models';
  import { AssetTypes } from '@/lib/contants';
  const depots : Ref<Array<Depot>>=ref([])
    const isLoading = ref(true);
    const loadingError = ref(false);
    const props = defineProps({
    type:{
        type: Object as PropType<DepotType>
    },
    depotID:{
      type: Number
    },
    showOnly:{
      type: String
    },
    label:{
      type: String
    }
});
const getColor = (depot) =>{
  if(depot && depot.depot_type){
    if(depot.depot_type.name_translation_key.toLocaleUpperCase() == AssetTypes.gold.toLocaleUpperCase()){
      return 'bg-amber-300'; 
      
    }
    if(depot.depot_type.name_translation_key.toLocaleUpperCase() == AssetTypes.silver.toLocaleUpperCase()){
      return 'bg-slate-300'; 
    }
  }
}
const response: Ref<PaginationResponse<Depot>> = ref(null);
watch(props,()=>{
  if(props.showOnly && (props.showOnly.toLocaleUpperCase() == AssetTypes.gold.toLocaleUpperCase() || props.showOnly.toLocaleUpperCase() == AssetTypes.silver.toLocaleUpperCase())){
    depots.value = response.value.data.filter(d=>d.depot_type && d.depot_type.name_translation_key.toLocaleUpperCase() == props.showOnly?.toLocaleUpperCase())
    selected.value = null;
  }
})
  onMounted(async ()=>{
  try{
    isLoading.value = true;
   
      response.value = await AssetsService.getTheDepotsOfTheClient({
        page:1,
        perPage:100,
        depot_type_id :props.type?props.type.id:undefined
      });
      if(props.showOnly && (props.showOnly.toLocaleUpperCase() == AssetTypes.gold.toLocaleUpperCase() || props.showOnly.toLocaleUpperCase() == AssetTypes.silver.toLocaleUpperCase())){
        depots.value = response.value.data.filter(d=>d.depot_type && d.depot_type.name_translation_key.toLocaleUpperCase() == props.showOnly?.toLocaleUpperCase())
      }
      else{
        depots.value = response.value.data.sort((a:Depot,b:Depot)=>(a.depot_type?.name_translation_key >= b.depot_type?.name_translation_key)?1:-1);
      } 
      if(props.depotID){
        const d = depots.value.find(dep=>dep.id == props.depotID);
        if(d){
          selected.value = d;
        }
        
      }
      
      
  }
  catch(err){
    loadingError.value = true;
    useBugsnag().notify(err);
  }
  finally{
    isLoading.value = false;
  }
})
  
const selected : Ref<Depot>=ref(null)
const emit = defineEmits<{
  (e: 'onDepotSet',depot:Depot): void
}>()
watch(selected,()=>{
    if(selected){
        emit('onDepotSet',selected.value)
    }
})
  </script>