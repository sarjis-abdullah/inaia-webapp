<template>
    <div class="rounded-lg bg-white shadow p-3" >
    <OrderList :isLoading="loading" :loadingError="loadingError" :orders="transactions" :title="$t('orders')"/>
    <Pagination class="mt-6" :perPage="perPage" :lastPage="lastPage" :total="total" :totalPerPage="totalPerPage" @onChange="onPageChanged"/>
    </div>
</template>
<script lang="ts" setup>
import {Ref,ref,onMounted,PropType} from 'vue';
import { Depot, Order } from '@/lib/models';
import { OrderService } from '@/lib/services';
import OrderList from '@/components/Orders/OrderList';
import Pagination from '@/components/common/Pagination.vue';
const props = defineProps({
    depot:{
        type: Object as PropType<Depot>
    }
})
const transactions:Ref<Array<Order>>= ref([]);
const loading = ref(true);
const loadingError = ref(false)
const page = ref(1);
const lastPage = ref(1);
const total = ref(0)
const perPage = ref(10);
const totalPerPage = ref(0);
const loadData = async()=>{
    if(props.depot){
        let data = await OrderService.getDepotOrders(props.depot?.id,{page:page.value,perPage:perPage.value});
        page.value = data.currentPage ;
        lastPage.value = data.lastPage;
        total.value = data.total;
        totalPerPage.value = data.data.length;
        transactions.value = data.data;
    }
    
}
const onPageChanged=(p:number)=>{
 page.value = p;
 loadData();
}

onMounted(async()=>{
    loading.value = true;
    try{
        
        await loadData();
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