<template>
    <div >
       
        <select id="country" name="country" autocomplete="country" v-if="!isLoading && !error"
            class="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " v-model="selected">
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
import { CountryService } from '@/lib/services/CountryService';
import { Country } from '@/lib/models/Country';
import { ref, watch } from 'vue';
import type { Ref } from 'vue'
import Loading from '../common/Loading.vue';
const props = defineProps({
    selectedCountry:{
        type:String,
        default:null
    }
})

const emit = defineEmits<{
  (e: 'change', callingCode: String): void
}>()
const countries : Ref<Array<Country>> = ref([]);
const selected : Ref<Country> = ref(countries.value[0]);
const isLoading = ref(true);
const error = ref(null);
try{
  error.value = null;
  isLoading.value = true;
    countries.value  = await CountryService.getCountryList(false);
    
     if(!props.selectedCountry)
     {
        selected.value = countries.value[0];
        emit("change",countries.value[0].calling_code.toString());
     }
     else{
        selected.value = countries.value.find(x=>x.alpha2_code.toLocaleLowerCase() == props.selectedCountry) || countries.value[0];
     }
}
catch(err)
{
  error.value = err;
}
finally{
  isLoading.value= false;
}
watch(selected,(currentvalue,oldvalue)=>{
  console.log(currentvalue);
    emit("change",currentvalue.calling_code)
})
</script>