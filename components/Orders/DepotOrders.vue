<template>
    <div class="rounded-lg bg-white shadow p-3" >
    <OrderList :isLoading="loading" :loadingError="loadingError" :orders="transactions" :title="$t('orders')"/>
    </div>
</template>
<script lang="ts" setup>
import {Ref,ref,onMounted,PropType} from 'vue';
import { Depot, Order } from '@/lib/models';
import { OrderService } from '@/lib/services';
import OrderList from '@/components/Orders/OrderList';
const props = defineProps({
    depot:{
        type: Object as PropType<Depot>
    }
})
const transactions:Ref<Array<Order>>= ref([]);
const loading = ref(true);
const loadingError = ref(false)
const loadMore = ref(false);
const page = ref(1);
const perPage = 5;
const moreToCome = ref(true);
const loadData = async()=>{
    if(props.depot){
        let data = await OrderService.getDepotOrders(props.depot?.id,{page:page.value,perPage:perPage});
        page.value = data.currentPage + 1;
        moreToCome.value = data.currentPage < data.lastPage;
        transactions.value = data.data;
    }
    
}
const loadMoreDepots = async (p:number)=>{
    page.value = p;

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