<template>
    <div class="sm:mx-auto bg-white sm:w-full sm:max-w-md min-w-[50%] p-10 shadow sm:rounded-lg">
        <h2 class="text-center mb-5 text-xl">{{ $t('conditions') }}</h2>
        <div v-if="!isLoading && !isError">
        <fieldset class="border-t border-b border-gray-200" >
    <div class="divide-y divide-gray-200">
      <div class="relative flex items-start py-4" v-for="c in conditions" :key="c.id">
        <div class="min-w-0 flex-1 text-sm" >
          <label for="comments" class="text-gray-700" :class="(c.title!=='accept_email')?'font-bold':''">{{ c.id==-1?$t(c.title):c.title }}</label>
          <a class="block text-xs text-blue-600 cursor-pointer flex" v-if="c.document" :href="c.document.link" target="_blank"><ArrowDownTrayIcon class="h-4 w-4 text-blue-600 mr-1" />{{ $t('download_document') }}</a>
        </div>
        <div class="ml-3 flex h-5 items-center">
            <Switch @change="(value)=>checkCondition(value,c)"/>
        </div>
      </div>
    </div>

  </fieldset>
  <p class="mt-2 text-sm text-red-600 text-center" id="email-error" v-if="submittingError">{{ errorText }}</p>
  <div class="mt-8 flex justify-center">
      <button type="submit" :disabled="!saveActivated || isSubmitting" @click.prevent="register"
          :class="(!saveActivated || isSubmitting)?'opacity-50':'opacity-100'"
          class="w-[50%] font-bold flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{ $t('register') }}</button>

  </div>
</div>

  <Loading  v-else-if="isLoading"/>
  <div v-else-if="isError">
    <p class="text-center color-red-500" v-if="errorkey">{{ $t(errorkey) }}</p>
  </div>
    </div>
</template>
<script lang="ts" setup>
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import { ref,Ref } from 'vue';
import { MissingInformationException,ServerErrorException } from '@/lib/exceptions';
import { type Condition } from '@/lib/models';
import { ConditionService,SubscriptionService } from '@/lib/services';
import { SubscriptionStorage } from '@/storage';
import Switch  from '../common/AppSwitch.vue'
import Loading from '../common/Loading.vue';
import { ConditionCountryIds } from '~/lib/contants';
const { t,locale } = useI18n();
const countryId = ConditionCountryIds.getCountryId();
const conditions:Ref<Array<Condition>> = ref([]);
const isLoading = ref(false);
const isError = ref(false);
const saveActivated = ref(false);
const isSubmitting = ref(false);
const errorkey = ref(null);
const selectedConditions = ref([])
const allowMarketing = ref(false);
const submittingError=ref(false);
const errorText = ref('');
const emit = defineEmits<{
  (e: 'registred'): void
}>();
try{
    isLoading.value=true;
    conditions.value = await ConditionService.getSubscriptionConditions(locale.value,{
        countryId:countryId
    });
}
catch(err){
    isError.value = true;
    errorkey.value = err.getTranslationKey();
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
        errorText.value =  "";
        submittingError.value = false;
        isLoading.value = true;
        SubscriptionService.saveConditions({
            allow_marketing:allowMarketing.value,
            conditions:selectedConditions.value.join(',')
        })
        await SubscriptionService.registerAccount(locale.value);
        SubscriptionStorage.clearAll();
        emit("registred");
    }
    catch(err){
        handleError(err);
    }
    finally{
        isLoading.value = false;
    }
}
const handleError= (err:unknown)=>{
    submittingError.value = true;

        if(err instanceof MissingInformationException){
            errorText.value = err.getRealMessage();
        }
        else if(err instanceof ServerErrorException){
            errorText.value = t(err.getTranslationKey());
            useBugsnag().notify(err);
        }
        else{
            errorText.value = t(err.getTranslationKey());
            useBugsnag().notify(err);
        }
}
</script>
