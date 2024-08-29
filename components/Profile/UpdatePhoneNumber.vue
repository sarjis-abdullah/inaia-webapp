<template>
    <div class="sm:mx-auto bg-white sm:w-full sm:max-w-md min-w-[50%] p-10 shadow sm:rounded-lg" >
        <div class="flex flex-col mx-auto">
            <img src="~/assets/img/pageicons/phoneNumberIcon.png" alt="email verification" class="w-32 h-auto mb-5 mx-auto"/>
            <h2 class="text-center mb-5 font-bold text-2xl">{{ $t('update_phone') }}</h2>
            <div class="mt-3 w-full">
                
                <div >
                  <label for="phone-number" class="block text-sm font-medium text-gray-700">{{ $t('phone_number') }}</label>
                  <div class="relative mt-1 rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 flex items-center">
                          <PhoneCodes @change="onPhoneCodeChange" :phoneNumber="channel?channel.value:null"/>
                      </div>
                      <input type="text" name="phone-number" id="phone-number" required
                          class="block w-full rounded-md border-gray-300 pl-28 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                           v-model="state.phone" :class="(!phoneChanged || isPhoneNumberValid)?inputStyle:inputErrorStyle" @change="onPhoneChanged"/>
                  </div>
                 <div class="flex justify-center mt-3 text-center">
                    <Loading v-if="isVerifyingSms"/>
                  <a class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer" @click.prevent="resendSms" v-else :disabled="isVerifyingSms || !isPhoneNumberValid">
                        <span v-if="!smsSent">{{ $t('send_phone_code') }}</span>
                        <span v-else>{{ $t('resend_phone_code') }}</span>

                </a>
                </div>
                </div>
              
              <div class="flex flex-col items-center mt-8" v-if="smsSent">
                    <div class="text-center" v-if="!smsVerified && !isVerifyingSms">
                        <CodeInputs  @complete="verifySmsCode" :length="4"/>
                        
                    </div>

                    
                    <div class="flex" v-else-if="smsVerified">
                      <CheckCircleIcon class="h-6 w-6 text-green-500"></CheckCircleIcon><span class="text-green-500 ml-2">{{ $t('phone_number_verified') }}</span>
                    </div>

                </div>
            </div>
            <InLineApiError v-if="error" :err="error"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import CodeInputs from '@/components/Register/CodeInputs';
import Loading from '@/components/common/Loading';
import InLineApiError from "@/components/common/InLineApiError";
import PhoneCodes from '@/components/Register/PhoneCodes';
import {  CheckCircleIcon } from '@heroicons/vue/20/solid';
import {ref,onMounted,reactive,watch} from 'vue';
import { AccountService, PhoneNumberService,SubscriptionService } from '@/lib/services';
import { SubscriptionStorage } from '@/storage';
import { MissingInformationException,ServerErrorException } from '@/lib/exceptions';
import {validatePhoneNumber,sanitizePhoneNumber} from '@/lib/utils/Validators';
import { Account, Channel } from '~~/lib/models';
import { ChannelRequest } from '~~/lib/requests';
const { t,locale } = useI18n();
const isVerifyingSms = ref(false);
const smsVerified = ref(false);
const phoneChanged =ref(false);
const smsSent = ref(false);
const isPhoneNumberValid = ref(false);
const error: Ref<unknown> = ref(false);
const inputErrorStyle = 'border-red-300   text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';
const inputStyle = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
const props = defineProps({
    channel: {
        type : Object as PropType<Channel>
    },
    account: {
        type : Object as PropType<Account>
    }
})
const state = reactive({
    phoneCode:'',
    phone:''
})
const onPhoneCodeChange = (value:string)=>{
    state.phoneCode = value;
    if(props.channel){
        state.phone = props.channel.value.replace(value,'');
    }
    
}
const onPhoneChanged =()=>{
    phoneChanged.value = true;
}
watch(state,(currentValue)=>{
    isPhoneNumberValid.value = validatePhoneNumber(currentValue.phone);
})

const emit = defineEmits<{
  (e: 'onSave'): void
}>()
const  verifySmsCode= async(code:string)=>{
    try{
        error.value = null;
        isVerifyingSms.value = true;
        let phoneNumber = state.phoneCode + sanitizePhoneNumber(state.phone)
        await PhoneNumberService.validatePhone(locale.value,{
            phone_number:phoneNumber,
            code:code
        })
        smsVerified.value = true;
        let request : ChannelRequest = {}
        if(props.channel){
            request.id = props.channel.id;
            request.contact_id = props.channel.contact_id;
            request.value = phoneNumber;
            request.is_active = props.channel.is_active;
            request.is_primary = props.channel.is_primary;
            request.type_id = props.channel.type_id;
        }
        else{
            request.contact_id = props.account.id;
            request.value = phoneNumber;
            request.is_active = true;
            request.is_primary = true;
        }
        await AccountService.updateChannel(request);
        emit('onSave');
    }
    catch(err:unknown){
        handleError(err);
    }
    finally{
        isVerifyingSms.value = false;
    }
}
const resendSms = async ()=>{
    try{
        error.value = null;
        isVerifyingSms.value = true;
        let phoneNumber = state.phoneCode + sanitizePhoneNumber(state.phone)
        await PhoneNumberService.sendPhoneCode(locale.value,{phone_number:phoneNumber});
        smsSent.value = true;
    }
    catch(err){
        handleError(err);
    }
    finally{
        isVerifyingSms.value = false;
    }
}
const handleError= (err:unknown)=>{
    error.value = err;
    if(err instanceof ServerErrorException){
        useBugsnag().notify(err);
    }
    else{
        useBugsnag().notify(err);
    }
}
</script>
