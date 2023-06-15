<template>
    <div class="mt-8 sm:mx-auto bg-white sm:w-full sm:max-w-md min-w-[50%] p-10 shadow sm:rounded-lg">
        <Notification :type="NotificationTypes.danger" :text="errorText" :title="$t('error_title')" :show="showNotification" @close="()=>showNotification=false"/>
        <div class="flex flex-col mx-auto">
            <img src="~/assets/img/pageicons/emailVerif.png" alt="email verification" class="w-32 h-auto mb-5 mx-auto"/>
            <h2 class="text-center mb-5 text-xl">{{ $t('verify_email') }}</h2>

            <div class="mt-3 pl-3 w-full">
                <div class="flex items-center">
                    {{$t('email')}} : {{ email }}
                </div>
                <div class="flex flex-col items-center mt-6">
                    <div class="flex flex-col items-end" v-if="!emailVerified && !isVerifyingEmail">
                        <CodeInputs  @complete="verifyEmailCode"/>
                        <a  class="mt-2 text-xs text-blue-600" @click.prevent="resendEmail">{{ $t('resend_email_code') }}</a>
                    </div>
                    <Loading v-else-if="isVerifyingEmail"/>
                    <div class="flex" v-else-if="emailVerified">
                        <span class="text-green-500 mr-3">{{ $t('email_verified') }}</span> <CheckCircleIcon class="h-6 w-6 text-green-500"></CheckCircleIcon>
                    </div>
                    
                </div>
            </div>
            
            <div class="mt-6 pr-2 flex justify-end" v-if="emailVerified">
                <a class=" text-lg text-blue-600" @click.prevent="emit('validated')">{{ $t('next') }} -></a>
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
import { SubscriptionStorage } from '~~/storage/SubscriptionStorage';
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
    emailVerified.value = SubscriptionStorage.isEmailVerified();
    
})
const emit = defineEmits<{
  (e: 'validated'): void
}>()
const  verifyEmailCode= async(code:string)=>{
    try{
        isVerifyingEmail.value = true;
        await EmailService.validateEmail({
            email:email.value,
            code:code
        })
        emailVerified.value = true;
        SubscriptionStorage.saveEmailVerified();
        emit('validated');
    }
    catch(err:unknown){
        errorText.value =  t(err.getTranslationKey());
        showNotification.value = true;
    }
    finally{
        isVerifyingEmail.value = false;
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
</script>