<template>
    <div class="mt-8 sm:mx-auto bg-white sm:w-full sm:max-w-md min-w-[50%] p-10 shadow sm:rounded-lg">
        <h2 class="text-center mb-5 text-xl">{{ $t('conditions') }}</h2>
        <div v-if="!isLoading && !isError">
        <fieldset class="border-t border-b border-gray-200" >
    <legend class="sr-only">Conditions</legend>
    <div class="divide-y divide-gray-200">
      <div class="relative flex items-start py-4" v-for="c in conditions" :key="c.id">
        <div class="min-w-0 flex-1 text-sm" >
          <label for="comments" class="font-medium text-gray-700">{{ c.id==-1?$t(c.title):c.title }}</label>
          <a  class="block text-gray-500" v-if="c.document" :href="c.document.link" target="_blank">{{ $t('download_document') }}</a>
        </div>
        <div class="ml-3 flex h-5 items-center">
            <Switch @change="(value)=>checkCondition(value,c)"/>
         
        </div>
      </div>
    </div>
    
  </fieldset>
  <div class="mt-10 flex justify-center">
                    <button type="submit" :disabled="!saveActivated || isSubmitting" @click.prevent="register"
                        :class="(!saveActivated || isSubmitting)?'opacity-50':'opacity-100'"
                        class="w-[50%] flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{ $t('register') }}</button>
                   
                </div>
</div>
  
  <Loading  v-else-if="isLoading"/>
  <div v-else-if="isError"> 
    <p class="text-center color-red-500" v-if="errorkey">{{ $t(errorkey) }}</p>
  </div>
    </div>
</template>
<script lang="ts" setup>
import { ref,Ref } from 'vue';
import { d } from 'vue-bundle-renderer/dist/types-dfcc483f';
import { Condition } from '~~/lib/models/Condition';
import { ConditionService } from '~~/lib/services/ConditionService';
import { SubscriptionService } from '~~/lib/services/SubscriptionService';
import { SubscriptionStorage } from '~~/storage/SubscriptionStorage';
import Switch  from '../common/AppSwitch.vue'
import Loading from '../common/Loading.vue';
const countryId = 82;
const conditions:Ref<Array<Condition>> = ref([]);
const isLoading = ref(false);
const isError = ref(false);
const saveActivated = ref(false);
const isSubmitting = ref(false);
const errorkey = ref(null);
const selectedConditions = ref([])
const allowMarketing = ref(false);
const emit = defineEmits<{
  (e: 'registred'): void
}>();
try{
    isLoading.value=true;
    conditions.value = await ConditionService.getSubscriptionConditions({
        countryId:countryId
    });
}
catch(err){
    isError.value = true;
    errorkey = err.getTranslationKey();
}
finally{
    isLoading.value = false;
}
const checkCondition=(checked:boolean,c:Condition)=>{
    if(checked){
        if(c.id==-1){
            allowMarketing.value = true
        }
        else{
            selectedConditions.value.push(c.id);
        }
    }
    else{
        if(c.id==-1){
            allowMarketing.value = false
        }
        else{
            const index = selectedConditions.value.indexOf(c.id);
            selectedConditions.value.splice(index,1);
        }
    }
    if(selectedConditions.value.length == conditions.value.length-1){
        saveActivated.value = true;
    }
    else{
        saveActivated.value = false;
    }
}
const register = async ()=>{
    try{
        isLoading.value = true;
        SubscriptionService.saveConditions({
            allow_marketing:allowMarketing.value,
            conditions:selectedConditions.value.join(',')
        })
        await SubscriptionService.registerAccount();
        SubscriptionStorage.clearAll();
        emit("registred");
    }
    catch(err){
        console.log(err);
    }
    finally{
        isLoading.value = false;
    }
}
</script>