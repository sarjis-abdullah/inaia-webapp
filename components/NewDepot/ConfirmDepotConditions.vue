<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 class="text-center mb-8 text-2xl font-bold">{{ $t('createDepot') }}</h2>
            <img :src="target.avatar_base64 ?? target.avatar"  v-if="target" class="h-32 w-32 rounded-full mx-auto mb-4"/>
            <div class="text-center font-semibold my-3 text-gray-900">{{ depotName }}</div>
            <div class="text-center font-semibold my-3 text-gray-900">{{ $t('createDepotText') }}</div>
            <div class="divide-y divide-gray-200">
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
                  <button type="submit"  @click.prevent="acceptConditions" :disabled="selectedConditions.length < conditions.length"
                     
                      class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{ $t('accept') }}</button>
                </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { PropType, Ref } from "vue";
import { AssetTypes, ConditionTypes } from "~~/lib/contants";
import { Condition, DepotTarget } from "~~/lib/models";
import { ConditionService } from "~~/lib/services";
import Switch  from '@/components/common/AppSwitch.vue';
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import InLineApiError from "@/components/common/InLineApiError";
const props = defineProps({
    target:{
            type: Object as PropType<DepotTarget>
             
         },
    depotName:{
        default: ""
    },
    type:{
             type:String,
             
         },
});
const emit = defineEmits<{
  (e: 'onConditionsAccepted',ids:string): void
}>()
const conditions: Ref<Array<Condition>> = ref([]);
const selectedConditions : Ref<Array<Condition>> = ref([]);
const loadingConditions = ref(false);
const error = ref(null);
onMounted(async()=>{
    try{
        let type = [ConditionTypes.depotGold];
        if(props.type == AssetTypes.silver){
            type = [ConditionTypes.depotSilver];
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