<template>
    <div class="sm:mx-auto bg-white sm:w-full sm:max-w-md min-w-[50%] p-10 shadow sm:rounded-lg">
        <Notification :type="NotificationTypes.danger" :text="errorText" :title="$t('error_title')" :show="showNotification" @close="()=>showNotification=false"/>
        <div class="flex flex-col mx-auto">
            <img src="~/assets/img/pageicons/phoneNumberIcon.png" alt="email verification" class="w-32 h-auto mb-5 mx-auto"/>
            <h2 class="text-center mb-5 font-bold text-2xl">{{ $t('verify_phone') }}</h2>
            <div class="mt-3 w-full">
                <div class="text-center">
                  {{$t('phone_number_infotext')}}<br><br><span class="font-bold">{{ phoneNumber }}</span>
                </div>
              <div class="flex flex-col items-center mt-8">
                    <div class="text-center" v-if="!smsVerified && !isVerifyingSms">
                        <CodeInputs  @complete="verifySmsCode" :length="4"/>
                        <div class="mt-6">
                          <a class="text-xs text-blue-600 cursor-pointer" @click.prevent="resendSms">{{ $t('resend_phone_code') }}</a>
                        </div>
                    </div>

                    <Loading v-else-if="isVerifyingSms"/>
                    <div class="flex" v-else-if="smsVerified">
                      <CheckCircleIcon class="h-6 w-6 text-green-500"></CheckCircleIcon><span class="text-green-500 ml-2">{{ $t('phone_number_verified') }}</span>
                    </div>

                </div>
            </div>
            <div class="mt-8" v-if="smsVerified">
              <a @click.prevent="emit('validated')" class="cursor-pointer flex w-full justify-center font-bold rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{ $t('next') }}</a>
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
    phoneNumber.value = accountInformation.phone_code+accountInformation.mobile;
    smsVerified.value = SubscriptionStorage.isPhoneValidated();
})
const emit = defineEmits<{
  (e: 'validated'): void
}>()
const  verifySmsCode= async(code:string)=>{
    try{
        isVerifyingSms.value = true;
        await PhoneNumberService.validatePhone({
            phone_number:phoneNumber.value,
            code:code
        })
        smsVerified.value = true;
        SubscriptionStorage.phoneValidated();
        emit('validated');
    }
    catch(err:unknown){
        errorText.value =  t(err.getTranslationKey());
        showNotification.value = true;
    }
    finally{
        isVerifyingSms.value = false;
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
