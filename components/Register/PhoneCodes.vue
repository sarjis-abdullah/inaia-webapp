<template>
    <div>
        <select id="country" name="country" autocomplete="country" v-if="!isLoading && !error"
            class="h-full rounded-md border-transparent bg-transparent py-0 text-gray-500 focus:border-0 focus:ring-0 sm:text-sm " v-model="selected">
            <option v-for="country in countries" :key="country.id.toString()" :value="country">{{ country.alpha2_code.toLocaleUpperCase() }} {{ country.calling_code }}</option>
        </select>
        <div class="flex flex-row justify-center relative mt-1" v-if="isLoading">
        <Loading/>
      </div>
      <div class="relative mt-1" v-if="error">
        <p class="text-center my-3 font-medium text-lg text-red-800">{{ $t('loading_country_error') }}</p>
      </div>
    </div>
</template>
<script lang="ts" setup>
import { CountryService } from '@/lib/services';
import { type Country } from '@/lib/models';
import { ref, watch } from 'vue';
import type { Ref } from 'vue'
import Loading from '../common/Loading.vue';
const props = defineProps({
  phoneCode:{
        type:String,
        default:null
    },
    phoneNumber:{
        type:String,
        default:null
    },
})

const emit = defineEmits<{
  (e: 'change', callingCode: String,country_id:Number): void
}>()
const countries : Ref<Array<Country>> = ref([]);
const selected : Ref<Country> = ref(countries.value[0]);
const isLoading = ref(true);
const error = ref(null);
try{
  error.value = null;
  isLoading.value = true;
    countries.value  = await CountryService.getCountryList(false,true);

     if(!props.phoneCode)
     {
        selected.value = countries.value[0];
        emit("change",countries.value[0].calling_code.toString(),countries.value[0].id);
     }
     else{
        selected.value = countries.value.find(x=>props.phoneCode == x.calling_code) || countries.value[0];
        if(selected.value)
          emit("change",selected.value.calling_code.toString(),selected.value.id);
     }
}
catch(err)
{
  error.value = err;
  useBugsnag().notify(err);
}
finally{
  isLoading.value= false;
}
watch(selected,(currentvalue,oldvalue)=>{
    emit("change",currentvalue.calling_code,currentvalue.id)
})
watch(props,(currentvalue,oldvalue)=>{
  if(currentvalue.phoneCode){
    const sV = countries.value.find(x=>currentvalue.phoneCode == x.calling_code)
    if(sV){
      selected.value = sV;
    }
  }
  if(currentvalue.phoneNumber){
    countries.value.forEach(c=>{
      if(currentvalue.phoneNumber.startsWith(c.calling_code)){
        selected.value = c;
        emit("change",c.calling_code,c.id);
      }
    })
  }
})
</script>
