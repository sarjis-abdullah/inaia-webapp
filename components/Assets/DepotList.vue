<template>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300" v-if="!loadingError && !isLoading">
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">{{ $t('depot_name') }}</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{{ $t('type') }}</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{{ $t('status') }}</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{{ $t('amount_euro') }}</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{{ $t('amount_gram') }}</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span class="sr-only">{{ $t('details') }}</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="depot in depots" :key="depot.id">
                  
                  <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" :src="depot.avatar" alt="" />
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">{{ depot.name }}</div>
                        <div class="mt-1 text-gray-500">#{{ depot.depot_number }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm ">

                    <span class="inline-flex h-2 w-2 rounded-full" :class="getColor(depot)"/> <span class="text-gray-900">{{ $t(depot.depot_type.name_translation_key) }}</span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20 mr-1" v-if="depot.is_savings_plan==1">{{ $t('Savingplan') }}</div>
                   <DepotStatus :depot="depot"/>
                    
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="text-gray-900">{{ $n(((depot.gram_amount/1000) * getPrice(depot))) }} {{ currency }}</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="text-gray-900">{{ $n(depot.gram_amount/1000) }} g</div>
                  </td>
                  <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                      >{{ $t('details') }}<span class="sr-only">, {{ depot.name }}</span></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="!loadingError && isLoading">
             <ListLoader/>
            </div>
            <div v-if="loadingError && !isLoading">
             <ListLoadingError :message="'cant_load_depot_list'"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script  lang="ts" setup>
  import { PropType,computed,onMounted,ref,Ref } from 'vue';
import { Depot, DepotType } from '@/lib/models';
import { AssetsService,CurrencyService } from '~~/lib/services';
import { AssetStorage } from '~~/storage/AssetStorage';
import { AssetTypes } from '~~/lib/contants';
import DepotStatus from '@/components/Assets/DepotStatus';
import { PaginationResponse } from '~~/lib/responses';
import ListLoader from '@/components/common/ListLoader';
import ListLoadingError from '@/components/common/ListLoadingError';
  const props = defineProps({
    type:{
        type: Object as PropType<DepotType>
    }
});
const depots : Ref<Array<Depot>>=ref([])
const page :Ref<number> = ref(1);
const silverPrice : Ref<number> = ref(0);
const goldPrice : Ref<number> = ref(0);
const loadingError = ref(false);
const isLoading = ref(true);
const currency = CurrencyService.getCurrencySymbol();
const price = computed(()=>{
  if(props.type){
    if(props.type.name_translation_key.toLocaleUpperCase() == AssetTypes.gold.toLocaleUpperCase()){
      return goldPrice.value;
    }
    if(props.type.name_translation_key.toLocaleUpperCase() == AssetTypes.silver.toLocaleUpperCase()){
      return silverPrice.value;
    }
  }
  return 0;
})
const getPrice = (depot) =>{
  if(depot && depot.depot_type){
    if(depot.depot_type.name_translation_key.toLocaleUpperCase() == AssetTypes.gold.toLocaleUpperCase()){
      return goldPrice.value; 
    }
    if(depot.depot_type.name_translation_key.toLocaleUpperCase() == AssetTypes.silver.toLocaleUpperCase()){
      return silverPrice.value; 
    }
  }
}
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
onMounted(async ()=>{
  try{
    isLoading.value = true;
    goldPrice.value = await AssetStorage.getGoldPrice();
    silverPrice.value = await AssetStorage.getSilverPrice();
   
      const response : PaginationResponse<Depot> = await AssetsService.getTheDepotsOfTheClient({
        page:page.value,
        perPage:5,
        depot_type_id :props.type?props.type.id:undefined
      });
      depots.value = response.data;
      if(response.currentPage)
          page.value = response.currentPage;
    
  }
  catch(err){
    loadingError.value = true;

  }
  finally{
    isLoading.value = false;
  }
})

</script>