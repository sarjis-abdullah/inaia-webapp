<template>
    <div class="rounded-lg bg-white shadow p-3" >
    <OrderList 
        @filterOrderBy="handleFilterableQUery" 
        @downloadOrderStatement="handleDownloadOrderStatement" 
        :isLoading="loading" 
        :pdfLoading="pdfLoading" 
        :loadingError="loadingError" 
        :showFilterButton="true" 
        :orders="transactions" 
        :title="$t('orders')"
    />
    <Pagination class="mt-6" :perPage="perPage" :lastPage="lastPage" :total="total" :totalPerPage="totalPerPage" @onChange="onPageChanged"/>
    </div>
</template>
<script lang="ts" setup>
import {Ref,ref,onMounted,PropType} from 'vue';
import { Depot, Order } from '@/lib/models';
import { OrderService } from '@/lib/services';
import OrderList from '@/components/Orders/OrderList.vue';
import Pagination from '@/components/common/Pagination.vue';
const props = defineProps({
    depot:{
        type: Object as PropType<Depot>
    }
})
const transactions:Ref<Array<Order>>= ref([]);
const loading = ref(true);
const pdfLoading = ref(false);
const loadingError = ref(false)
const page = ref(1);
const lastPage = ref(1);
const total = ref(0)
const perPage = ref(10);
const totalPerPage = ref(0);
const loadData = async(query = "")=>{
    if(props.depot){
        let data = await OrderService.getDepotOrders(props.depot?.id,{page:page.value,perPage:perPage.value}, query);
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

const getOrdersData = async(query = "")=>{
    loading.value = true;
    try{
        await loadData(query);
    }
    catch(err){
        console.log(err);
        loadingError.value = true;
    }
    finally{
        loading.value = false
    }
}

onMounted(()=> {
    getOrdersData()
})
const handleFilterableQUery = (query: string) => {
    getOrdersData(query)
}
const handleDownloadOrderStatement = async(query: string) => {
    pdfLoading.value = true;
    try {
        await OrderService.getDepotOrderSatement(props.depot.id, query);
    } catch (error) {
        console.log(error);
    }
    finally{
        pdfLoading.value = false
    }
}
</script>