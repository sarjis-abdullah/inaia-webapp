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
import {Ref,ref,onMounted} from 'vue';
import { type Depot, type Order } from '@/lib/models';
import { OrderService } from '@/lib/services';
import OrderList from '@/components/Orders/OrderList.vue';
import Pagination from '@/components/common/Pagination.vue';
import { AttachmentService } from '@/lib/services/index';
const props = defineProps({
    depot:{
        type: Object as PropType<Depot>
    }
})
interface statementDateParams {end_date?: string, start_date?: string}
interface dateParams {endDate?: string, startDate?: string}
const transactions:Ref<Array<Order>>= ref([]);
const loading = ref(true);
const pdfLoading = ref(false);
const loadingError = ref(false)
const page = ref(1);
const lastPage = ref(1);
const total = ref(0)
const perPage = ref(10);
const totalPerPage = ref(0);
const startDate = ref("");
const endDate = ref("");
const queryParams = computed(()=> {
    const params = {page:page.value,perPage:perPage.value}
    if (startDate.value) {
        params.startDate = startDate.value
    }
    if (endDate.value) {
        params.endDate = endDate.value
    }
    return  params
})
const loadData = async()=>{
    if(props.depot){
        let data = await OrderService.getDepotOrders(props.depot?.id, queryParams.value);
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

const getOrdersData = async()=>{
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
}

onMounted(()=> {
    getOrdersData()
})
const handleFilterableQUery = (params: dateParams) => {
    startDate.value = params.startDate
    endDate.value = params.endDate
    getOrdersData()
}
const handleDownloadOrderStatement = async(params: statementDateParams) => {
    pdfLoading.value = true;
    const query: statementDateParams = {...params}

    if (props.depot) {
        try {
            const depotId = props.depot?.id
            const response = await AttachmentService.getDepotOrderSatement(depotId, query);
            const a = document.createElement("a");
            a.href = window.URL.createObjectURL(response);
            a.download = `${depotId}-${'statement'}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            useBugsnag().notify(error);
        }
        finally{
            pdfLoading.value = false
        }
    }
}
</script>