<template>
   <div>
        
        <OrderList :isLoading="loading" :loadingError="loadingError" :orders="transactions"/>
        <div class="text-blue-500 text-sm text-center mt-3" v-if="moreToCome">
            <a v-if="!loadMore" @click.prevent="loadMoreTransaction">{{ $t('see_more') }}</a>
            <span v-else><Loading></Loading></span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {Ref,ref,onMounted} from 'vue';
import { Order } from '@/lib/models';
import { OrderService } from '@/lib/services';
import OrderList from '@/components/Orders/OrderList';
import Loading from '@/components/common/Loading';
const transactions:Ref<Array<Order>>= ref([]);
const loading = ref(true);
const loadingError = ref(false)
const loadMore = ref(false);
const page = ref(1);
const perPage = 5;
const moreToCome = ref(true);
const loadData = async()=>{
    let data = await OrderService.getLastestOrders({page:page.value,perPage:perPage});
    page.value = data.currentPage + 1;
    moreToCome.value = data.currentPage < data.lastPage;
    data.data.forEach(o=>{
        transactions.value.push(o);
    })
    

}
const loadMoreTransaction = async ()=>{
    loadMore.value = true;
    try{
        
        await loadData()
    }
    catch(err){
        console.log(err);
        loadingError.value = true;
    }
    finally{
        loadMore.value = false
    }
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