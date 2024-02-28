<template>
    <div class="rounded-lg bg-white shadow p-3" >
      
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="flex flex-column mb-3">
                <div class="text-gray-900   text-xl flex-1">{{ $t('depots') }}</div>
                <div class="inline-flex rounded-md shadow-sm">
    <button  v-if="isVerified" type="button" class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">{{ $t('new_depot') }}</button>
    <Menu as="div" class="relative -ml-px block" v-if="isVerified">
      <MenuButton class="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
        <span class="sr-only">Open options</span>
        <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
      </MenuButton>
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems class="absolute right-0 z-10 -mr-1 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']" @click="()=>newDepot(AssetTypes.gold)">{{ $t('new_gold_depot') }}</a>
             
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']" @click="()=>newDepot(AssetTypes.silver)">{{ $t('new_silver_depot') }}</a>
             
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
              </div>
            <table class="min-w-full divide-y divide-gray-300" v-if="!loadingError && !isLoading && depots.length > 0">
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
                    <div class="text-gray-900">{{ $n(parseFloat(((depot.gram_amount/1000) * getPrice(depot)).toFixed(2))) }} {{ currency }}</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="text-gray-900">{{ $n(depot.gram_amount/1000) }} g</div>
                  </td>
                  <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <NuxtLink :to="'depot/detail/'+depot.id" class="text-indigo-600 hover:text-indigo-900"
                      v-if="isVerified">{{ $t('details') }}<span class="sr-only">, {{ depot.name }}</span></NuxtLink
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
            <div v-if="!loadingError && !isLoading && depots.length==0" class="text-center py-10">
              <p class="text-xl text-gray-400" v-if="!isVerified">{{ $t('please_verify_account_to_create_depot') }}</p>
              <p class="text-xl text-gray-400" v-else>{{ $t('create_new_depot') }}</p>
            </div>
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
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
  const props = defineProps({
    type:{
        type: Object as PropType<DepotType>
    },
    isVerified:{
      type:Boolean,
      default:false
    }
});
const depots : Ref<Array<Depot>>=ref([])
const page :Ref<number> = ref(1);
const silverPrice : Ref<number> = ref(0);
const goldPrice : Ref<number> = ref(0);
const loadingError = ref(false);
const isLoading = ref(true);
const currency = CurrencyService.getCurrencySymbol();
const router = useRouter();
const { locale } = useI18n();
const newDepot= (type)=>{
  router.push('/'+locale.value+'/depot/new/'+type);
}
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
        perPage:100,
        depot_type_id :props.type?props.type.id:undefined
      });

      depots.value = response.data.sort((a:Depot,b:Depot)=>(a.depot_type?.name_translation_key >= b.depot_type?.name_translation_key)?1:-1);
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