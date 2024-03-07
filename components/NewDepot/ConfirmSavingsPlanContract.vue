<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 class="text-center mb-4 text-2xl font-bold">{{ saveDepotRequest?.name }}</h2>
            <img :src="target.avatar"  v-if="target" class="h-32 w-32 rounded-full mx-auto mb-4"/>
            <div class="divide-y" v-if="saveDepotRequest">
                <ListItem :title="$t('name')">{{ saveDepotRequest?.name }}</ListItem>
                <ListItem :title="$t('savings_rate')">{{ saveDepotRequest?.interval_amount }} {{ currency }}</ListItem>
                <ListItem :title="$t('duration')">{{ saveDepotRequest?.duration }} {{ $t('year')+(saveDepotRequest?.duration>1?'s':'') }}</ListItem>
                <ListItem :title="$t('savings')">{{ $n(saveDepotRequest?.interval_amount * 12 * saveDepotRequest?.duration) }} {{ currency }}</ListItem>
                <ListItem :title="$t('agio')">{{ $n(totalAgio) }} {{ currency }}</ListItem>
                <ListItem :title="$t('billing')">{{ $t(saveDepotRequest?.agio_payment_option) }}</ListItem>
                <ListItem :title="$t('payment')">{{ $t(saveDepotRequest?.payment_method) }}</ListItem>
                <ListItem :title="$t('startdate')">{{ $d(new Date(saveDepotRequest?.interval_startdate)) }}</ListItem>
            </div>
            <div class="mt-10">
                <InLineApiError :err="error"/>
                <div v-if="!loadingConditions">
      <div class="relative flex items-start py-4" v-for="c in conditions" :key="c.id" >
        <div class="min-w-0 flex-1 text-sm" >
          <label for="comments" class="text-gray-700" >{{ c.title }}</label>
          <a class="block text-xs text-blue-600 cursor-pointer flex" v-if="c.document" :href="c.document.link" target="_blank"><ArrowDownTrayIcon class="h-4 w-4 text-blue-600 mr-1" />{{ $t('download_document') }}</a>
        </div>
        <div class="ml-3 flex h-5 items-center">
            <Switch @change="(value)=>checkCondition(value,c)"/>
        </div>
      </div>
    </div>
                    
                </div>
            <div class="mt-10">
                    <button v-if="depot?.is_savings_plan==0" type="submit"
                     
                        :disabled="!enableBtn"
                     :class="enableBtn?'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500':'bg-blue-300 focus:ring-blue-200'"
                      class="flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2"

                      @click.prevent="acceptConditions">{{ $t('accept') }}
                    </button>
                    <p v-else class="text-center">
                        {{ $t('already_a_savings_plan') }}
                    </p>
                </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { DepotTarget, Condition, Depot } from "~~/lib/models";
import { PropType,Ref } from "vue";
import { AddDepotRequest } from "~~/lib/requests";
import { AssetTypes, ConditionTypes } from "~~/lib/contants";
import { ConditionService, CurrencyService } from "~~/lib/services";
import Switch  from '@/components/common/AppSwitch.vue';
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import ListItem from '@/components/common/ListItem';
import InLineApiError from "@/components/common/InLineApiError";
const props = defineProps({
    target:{
            type: Object as PropType<DepotTarget>
             
         },
    type:{
        type:String,
        
    },
    saveDepotRequest:{
            type: Object as PropType<AddDepotRequest>
             
         },
         totalAgio:{
            type: Number 
         },
         depot:{
        type: Object as PropType<Depot>
        
    },
});
const loadingConditions = ref(false);
const error = ref(null);
const conditions: Ref<Array<Condition>> = ref([]);
const selectedConditions : Ref<Array<Condition>> = ref([]);
const currency = CurrencyService.getCurrencySymbol();
const enableBtn  = computed(()=>{
    if (selectedConditions?.value?.length && conditions.value?.length) {
        return selectedConditions.value.length == conditions.value.length
    }
    return false
})

const emit = defineEmits<{
  (e: 'onConditionsAccepted',ids:string): void
}>()
onMounted(async()=>{
    try{
        let type = [];
        if(props.depot){
            type = [ConditionTypes.goldSavingPlan];
            if(props.type == AssetTypes.silver){
                type = [ConditionTypes.silverSavingPlan];
            }
        }
        else{
            type = [ConditionTypes.depotGold,ConditionTypes.goldSavingPlan];
            if(props.type == AssetTypes.silver){
                type = [ConditionTypes.depotSilver,ConditionTypes.silverSavingPlan];
            }
        }
        
        loadingConditions.value = true;
        conditions.value = await ConditionService.getDepotAndSavingPlanCondition({
            type:type
        })
        error.value = null;
    }
    catch(err){
        error.value = err;
    }
    finally {
        loadingConditions.value = false;
    }
})
const checkCondition = (checked:boolean,c:Condition)=>{
    if(checked){
        selectedConditions.value.push(c);
    }
    else{
        const index = selectedConditions.value.findIndex(con=>con.id==c.id);
        selectedConditions.value.splice(index,1);
    }

}
const acceptConditions = () =>{
    const ids = conditions.value.map(c=>c.id);
    emit('onConditionsAccepted',ids.join(','));
}
</script>