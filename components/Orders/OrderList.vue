<template>
   
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="text-gray-900 mb-3  text-xl">{{ title }}</div>
            <table class="min-w-full divide-y divide-gray-300" v-if="!props.loadingError && !props.isLoading">
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
import {Ref,ref,onMounted,PropType,computed} from 'vue'
import { Order } from '@/lib/models';
import { OrderService,CurrencyService } from '@/lib/services';
import { OrderStatuses } from '~~/lib/contants';
import OrderDetails from '@/components/Orders/OrderDetails';
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
const selectedOrder: Ref<Order | null> = ref(null);
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