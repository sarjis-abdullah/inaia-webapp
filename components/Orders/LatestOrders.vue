<template>
   <div>
        
        <OrderList :isLoading="loading" :loadingError="loadingError" :orders="transactions"/>

    </div>
</template>
<script lang="ts" setup>
import {Ref,ref,onMounted} from 'vue';
import { Order } from '@/lib/models';
import { OrderService } from '@/lib/services';
import OrderList from '@/components/Orders/OrderList';
const transactions:Ref<Array<Order>>= ref([]);
const loading = ref(true);
const loadingError = ref(false)
onMounted(async()=>{
    loading.value = true;
    try{
        
        let data = await OrderService.getLastestOrders({page:1,perPage:5});
        transactions.value = data.data;
    }
    catch(err){
        console.log(err);
        loadingError.value = true;
    }
    finally{
        loading.value = false
    }
})
</script>