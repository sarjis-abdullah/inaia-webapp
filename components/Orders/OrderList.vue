<template>
   
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <header class="flex justify-between text-gray-900 mb-3  text-xl">
              <h6>{{ title }}</h6>
              <div>
                <AdjustmentsHorizontalIcon v-if="!showFilters" @click="showFilterSection" class="h-5 w-5 cursor-pointer" aria-hidden="true"/>
                <AdjustmentsVerticalIcon v-else @click="showFilterSection" class="h-5 w-5 cursor-pointer" aria-hidden="true"/>
              </div>
            </header>
            <section v-if="showFilters" class="flex items-end justify-between">
              <section class="flex gap-2 items-center">
                <div class="flex flex-col gap-2">
                    <div>Start Date</div>
                    <input 
                        type="date" name="startDate" id="orderStartDate" required
                        v-model="startDate"
                        class="block  w-full 10 pl-3 py-2 rounded-md"
                        placeholder="" />
                </div>
                <div class="flex flex-col gap-2">
                    <div>End Date</div>
                    <input 
                        type="date" name="startDate" id="orderStartDate" required
                        v-model="endDate"
                        class="block  w-full 10 pl-3 py-2 rounded-md"
                        placeholder="" />
                </div>
                <div v-if="conditionToDateFilter">
                  <XMarkIcon @click="removeDateFilter" class="h-5 w-5 rounded-full cursor-pointer"/>
                </div>
              </section>
              <div>
                <button :disabled="!conditionToDateFilter" @click="downloadOrderStatement" type="button" class="relative inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold shadow-sm ring-1 ring-inset bg-blue-500 text-white ring-blue-300">
                  <span>Download PDF</span>
                </button>
              </div>
            </section>
            <div v-if="!props.loadingError && !props.isLoading">
            <table class="min-w-full divide-y divide-gray-300" >
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">{{ $t('type') }}</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{{ $t('depot') }}</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{{ $t('status') }}</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{{ $t('amount_euro') }}</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{{ $t('amount_gram') }}</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span class="sr-only">{{ $t('details') }}</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="order in props.orders" :key="order.id">
                  
                  <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" :src="order.logo" alt="" />
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">{{ order.order_type?$t(order.order_type.name_translation_key):'' }}</div>
                        <div class="mt-1 text-gray-500">{{ $d(getExecutionDate(order)) }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm ">

                    <span class="text-gray-900">{{ order.depotName }}</span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                   
                   <OrderStatus :order="order"/>
                    
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="text-gray-900">{{ getAmountMoney(order) > 0 ? $n(getAmountMoney(order)/100) +  ' '+currency:'-' }}</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="text-gray-900">{{ getAmountGram(order) > 0 ? $n(getAmountGram(order)/1000) +' g' : '-'}}</div>
                  </td>
                  <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a @click="()=>showTheDetails(order)" class="text-indigo-600 hover:text-indigo-900"
                      >{{ $t('details') }}<span class="sr-only">, {{ order.id }}</span></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>
            <div v-if="!props.loadingError && props.isLoading">
             <ListLoader/>
            </div>
            <div v-if="props.loadingError && !props.isLoading">
             <ListLoadingError :message="'cant_load_orders_list'"/>
            </div>
          </div>
        </div>
      </div>
      <OrderDetails :showDetails="showDetails" :order="selectedOrder" @onClose="closeDetails"/>
    </div>
</template>
<script lang="ts" setup>
import ListLoader from '@/components/common/ListLoader';
import ListLoadingError from '@/components/common/ListLoadingError';
import OrderStatus from '@/components/Orders/OrderStatus';
import {Ref,ref,onMounted,PropType,computed, watch} from 'vue'
import { Order } from '@/lib/models';
import { OrderService,CurrencyService } from '@/lib/services';
import { OrderStatuses } from '~~/lib/contants';
import OrderDetails from '@/components/Orders/OrderDetails';
import { AdjustmentsHorizontalIcon, AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps ({
    orders : {
        type: Object as PropType<Array<Order>>
    },
    isLoading:{
      type: Boolean,
      default:true
    },
    loadingError:{
      type: Boolean,
      default:false
    },
    title:{
      type:String,
      default:''
    }
})
const currency = CurrencyService.getCurrencySymbol();
const showDetails = ref(false);
const showFilters = ref(false);
const today = new Date()?.toISOString()?.slice(0, 10)
const startDate = ref("");
const endDate = ref("");
const selectedOrder: Ref<Order | null> = ref(null);

const emit = defineEmits<{
  filterOrderBy: [dateQuery: string]
  downloadOrderStatement: [dateQuery: string]
}>()

const dateQuery = computed(()=> {
  let query = ""
  if (startDate.value) {
    query += `&startDate=${startDate.value}`
  }
  if (query != "" && endDate.value) {
    query += `&endDate=${endDate.value}`
  }
  return query
})
const statementDateQuery = computed(()=> {
  let query = ""
  if (startDate.value) {
    query += `&start_date=${startDate.value}`
  }
  if (query != "" && endDate.value) {
    query += `&end_date=${endDate.value}`
  }
  return query
})
const conditionToDateFilter = computed(()=> showFilters.value && startDate.value && endDate.value)

const filterOrderBy = (dateQuery: string)=>{
  emit('filterOrderBy', dateQuery);
}
const downloadOrderStatement = ()=>{
  emit('downloadOrderStatement', statementDateQuery.value);
}
const showFilterSection = () => {
  showFilters.value = !showFilters.value
}
const removeDateFilter = () => {
  filterOrderBy("")
  startDate.value = ""
  endDate.value = ""
}

watch(dateQuery, ()=> {
  if (conditionToDateFilter.value) {
    filterOrderBy(dateQuery.value)
  }
}, { deep: true, immediate: true })

const showTheDetails = (order:Order)=>{

  selectedOrder.value = order;
  showDetails.value = true;
}
const closeDetails = () =>{
  selectedOrder.value = null;
  showDetails.value = false;
}
const getExecutionDate = (order:Order)=>{

  return OrderService.getExecutionDate(order);
}
const getAmountMoney = (order:Order) => {
  return OrderService.getMoneyAmountOfAnOrder(order);
}
const getAmountGram = (order:Order) =>{
  return OrderService.getGramAmountOfAnOrder(order);
}
</script>