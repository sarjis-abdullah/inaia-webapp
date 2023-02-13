<template>
    <div class="mt-8 sm:mx-auto bg-white sm:w-full sm:max-w-md min-w-[50%] p-10 shadow sm:rounded-lg">
        <Notification :type="NotificationTypes.warning" :text="errorText" :title="$t('error_title')" :show="showNotification" @close="()=>showNotification=false"/>
        <div class="flex flex-col mx-auto">
            <h3 class="text-gray-900 font-semibold">Verify your email:</h3>
            <div class="mt-3 pl-3 w-full grid grid-cols-2 gap-s">
                <div class="flex">
                   {{ email }}
                </div>
                <div class="flex flex-col items-end">
                    <div class="flex flex-col items-end" v-if="!emailVerified && !isVerifyingEmail">
                        <CodeInputs  @complete="verifyEmailCode"/>
                        <a  class="mt-2 text-xs text-blue-600" @click.prevent="resendEmail">Resend email code</a>
                    </div>
                    <Loading v-else-if="isVerifyingEmail"/>
                    <div class="flex" v-else-if="emailVerified">
                        <span class="text-green-500 mr-3">Email verified</span> <CheckCircleIcon class="h-6 w-6 text-green-500"></CheckCircleIcon>
                    </div>
                    
                </div>
            </div>
            <h3 class="mt-10 text-gray-900 font-semibold">Verify your phone number:</h3>
            <div class="mt-3 pl-3 w-full grid grid-cols-2 gap-4">
                <div class="flex">
                    {{ phoneNumber }}
                </div>
                <div class="flex flex-col items-end">
                    <div class="flex flex-col items-end" v-if="!smsVerified && !isVerifyingSms">
                        <CodeInputs  @complete="verifySmsCode" :length="4"/>
                        <a class="mt-2 text-xs text-blue-600" @click.prevent="resendSms">Resend phone number code</a>
                    </div>
                    
                    <Loading v-else-if="isVerifyingSms"/>
                    <div class="flex" v-else-if="smsVerified">
                        <span class="text-green-500 mr-3">Phone number verified</span> <CheckCircleIcon class="h-6 w-6 text-green-500"></CheckCircleIcon>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import CodeInputs from './CodeInputs';
import Loading from '../common/Loading';
import {  CheckCircleIcon } from '@heroicons/vue/20/solid';
import {ref,onMounted} from 'vue';
import { EmailService } from '~~/lib/services/EmailService';
import { VerifyEmailRequest } from '~~/lib/requests/VerifyEmailRequest';
import { PhoneNumberService } from '~~/lib/services/PhoneNumberService';
import { VerifyPhonelRequest } from '~~/lib/requests/VerifyPhoneRequest';
import { SubscriptionService } from '~~/lib/services/SubscriptionService';
import Notification from '../common/Notification.vue';
import { NotificationTypes } from '~~/constants/NotificationTypes';
const { t } = useI18n();
const isVerifyingSms = ref(false);
const isVerifyingEmail = ref(false);
const smsVerified = ref(false);
const emailVerified = ref(false);
const email = ref('');
const phoneNumber = ref('');
const showNotification=ref(false);
const errorText = ref('');
onMounted(()=>{
    const accountInformation = SubscriptionService.getAccountInformation();
    email.value = accountInformation.email;
    phoneNumber.value = accountInformation.mobile;
})
const emit = defineEmits<{
  (e: 'validated'): void
}>()
const  verifyEmailCode= async(code:string)=>{
    try{
        isVerifyingEmail.value = true;
        /*await EmailService.validateEmail({
            email:email.value,
            code:code
        })*/
        emailVerified.value = true;    
        if(smsVerified.value)
        {
            emit('validated');
        }
    }
    catch(err:unknown){
        errorText.value =  t(err.getTranslationKey());
        showNotification.value = true;
    }
    finally{
        isVerifyingEmail.value = false;
    }
}
const  verifySmsCode= async(code:string)=>{
    try{
        isVerifyingSms.value = true;
        await PhoneNumberService.validatePhone({
            phone_number:phoneNumber.value,
            code:code
        })
        smsVerified.value = true;    
        if(emailVerified.value)
        {
            emit('validated');
            
        }
    }
    catch(err:unknown){
        errorText.value =  t(err.getTranslationKey());
        showNotification.value = true;
    }
    finally{
        isVerifyingSms.value = false;
    }
}
const resendEmail = async ()=>{
    try{
        isVerifyingEmail.value = true;
        await EmailService.sendEmailCode({email:email.value});
    }
    catch(err){
        errorText.value =  t(err.getTranslationKey());
        showNotification.value = true;
    }
    finally{
        isVerifyingEmail.value = false;
    }
}
const resendSms = async ()=>{
    try{
        isVerifyingSms.value = true;
        await PhoneNumberService.sendPhoneCode({phone_number:phoneNumber.value});
    }
    catch(err){
        errorText.value =  t(err.getTranslationKey());
        showNotification.value = true;
    }
    finally{
        isVerifyingSms.value = false;
    }
}
</script>