<template>
    <div v-if="loading">

    </div>
    <div v-else >
        <ul class="divide-y divide-gray-200">
            <li>
                
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import {Ref,ref,onMounted} from 'vue'
import { Order } from '~~/lib/models/Order';
import { TransactionService } from '~~/lib/services/TransactionService';
import DashboardTransactionItem from './DashboardTransactionItem.vue';
const transactions:Ref<Array<Order>>= ref([]);
const loading = ref(false);
onMounted(async()=>{
    loading.value = true;
    try{
        let data = await TransactionService.getLastTransactions({page:1,perPage:5});
        transactions.value = data.data;
    }
    catch(err){

    }
})
</script>