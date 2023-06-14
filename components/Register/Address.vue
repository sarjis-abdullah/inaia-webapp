<template>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <img src="~/assets/img/pageicons/adressIcon.png" alt="address" class="w-32 h-auto mb-5 mx-auto"/>
            <h2 class="text-center mb-5 text-xl">{{ $t('enter_address') }}</h2>
            <form class="space-y-6" action="#" method="POST">
                <div>
                    
                    <Countries class="self-center" :all="false" @change="handleCountryChange"  :selectedCountryId="state.country_id"/>
                </div>
                <div>
                    <label for="line1" class="block text-sm font-medium text-gray-700">{{ $t('line1') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        
                        <input type="text" name="line1" id="line1" v-model="state.line1"
                        class="block  w-full 10 pl-3 py-2 rounded-md"
                        :class="(state.line1.length>0)?inputStyle:inputErrorStyle"
                            />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="state.line1.length==0">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    </div>
                </div>
                <div>
                    <label for="line1" class="block text-sm font-medium text-gray-700">{{ $t('line2') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        
                        <input type="text" name="line2" id="line2" v-model="state.line2"
                        class="block  w-full 10 pl-3 py-2 rounded-md"
                        :class="inputStyle"
                            />
                           
                    </div>
                </div>
                <div>
                    <label for="postal_code" class="block text-sm font-medium text-gray-700">{{ $t('postalCode') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        
                        <input type="text" name="postal_code" id="postal_code" v-model="state.postal_code"
                        class="block  w-full 10 pl-3 py-2 rounded-md"
                        :class="(state.postal_code.length>0)?inputStyle:inputErrorStyle"
                            />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="state.postal_code.length==0">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    </div>
                </div>
                <div>
                    <label for="postal_code" class="block text-sm font-medium text-gray-700">{{ $t('region') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        
                        <input type="text" name="region" id="region" v-model="state.region"
                        class="block  w-full 10 pl-3 py-2 rounded-md"
                        :class="(state.region.length>0)?inputStyle:inputErrorStyle"
                            />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="state.region.length==0">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    </div>
                </div>
                <div>
                    <label for="postal_code" class="block text-sm font-medium text-gray-700">{{ $t('town') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        
                        <input type="text" name="region" id="region" v-model="state.town"
                        class="block  w-full 10 pl-3 py-2 rounded-md"
                        :class="(state.town.length>0)?inputStyle:inputErrorStyle"
                            />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="state.town.length==0">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    </div>
                </div>


                <div>
                    <button type="submit" :disabled="!saveActivated || isSubmitting" @click.prevent="save"
                        :class="(!saveActivated || isSubmitting)?'opacity-50':'opacity-100'"
                        class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{ $t('save') }}</button>
                        <p class="mt-2 text-sm text-red-600" id="email-error" v-if="submittingError">{{ $t('account_info_error') }}
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { EnvelopeIcon,ExclamationCircleIcon, UserIcon,LockClosedIcon,HashtagIcon } from '@heroicons/vue/20/solid';

import {ref,reactive,toRefs,watch,computed,onMounted} from 'vue';

import { SubscriptionStorage } from '~~/storage/SubscriptionStorage';
import { AddressRequest } from '~~/lib/requests/AddressRequest';
import Countries from '@/components/Register/Countries';
import { SubscriptionService } from '~~/lib/services/SubscriptionService';

const saveActivated = ref(false);
const isSubmitting = ref(false);
const inputErrorStyle = 'border-red-300   text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';
const inputStyle = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
const errorIconColor = 'text-red-900';
const iconColor = 'text-gray-400';

const submittingError = ref(false);
const state = reactive({
   country_id:-1,
   line1:'',
   line2:'',
   postal_code:'',
   region:'',
   town:''
});
const handleCountryChange = (value:number)=>{
    state.country_id = value;
}
const emit = defineEmits<{
  (e: 'onSave'): void
}>()

onMounted(()=>{
    const address = SubscriptionStorage.getAddress();
    if(address){
        state.line1= address.line1;
        state.line2 = address.line2;
        state.country_id= address.country_id;
        state.postal_code = address.postal_code;
        state.town = address.city;
        state.region = address.region
    }
})
watch(state,(currentValue)=>{
    
    if(state.country_id!=-1 && currentValue.line1.length>0 && currentValue.postal_code.length>0 && currentValue.town.length > 0 && currentValue.region.length > 0)
    {
        saveActivated.value = true;
    }
    else{
        saveActivated.value = false;
    }
    
})
async function save() {
    isSubmitting.value = true;
    try{
        let data: AddressRequest = {
            line1:state.line1,
            line2:state.line2,
            postal_code:state.postal_code,
            city:state.town,
            region:state.region,
            country_id:state.country_id
        }
        await SubscriptionStorage.saveAddress(data);
        SubscriptionService.saveAddress(data)
        emit('onSave');
    }
    catch(err){

    }
    finally{
        isSubmitting.value = false;
    }
}

</script>