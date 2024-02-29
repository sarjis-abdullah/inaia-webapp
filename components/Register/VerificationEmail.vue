<template>
    <div class="sm:mx-auto bg-white sm:w-full sm:max-w-md min-w-[50%] p-10 shadow sm:rounded-lg">
        <div class="flex flex-col mx-auto">
            <img src="~/assets/img/pageicons/emailVerif.png" alt="email verification" class="w-32 h-auto mb-5 mx-auto"/>
            <h2 class="text-center mb-5 font-bold text-2xl">{{ $t('verify_email') }}</h2>

            <div class="mt-3 w-full">
                <div class="text-center">
                    {{$t('verify_email_infotext')}}<br><br><span class="font-bold">{{ email }}</span>
                </div>
                <div class="flex flex-col items-center mt-8">
                    <div class="text-center" v-if="!emailVerified && !isVerifyingEmail">
                        <CodeInputs  @complete="verifyEmailCode"/>
                        <div class="mt-6">
                          <a class="text-xs text-blue-600 cursor-pointer" @click.prevent="resendEmail">{{ $t('resend_email_code') }}</a>
                        </div>
                    </div>
                    <Loading v-else-if="isVerifyingEmail"/>
                    <div class="flex" v-else-if="emailVerified">
                      <CheckCircleIcon class="h-6 w-6 text-green-500"></CheckCircleIcon><span class="text-green-500 ml-2">{{ $t('email_verified') }}</span>
                    </div>

                </div>
            </div>

            <p class="mt-2 text-sm text-red-600 text-center" id="email-error" v-if="submittingError">{{ errorText }}</p>

            <div class="mt-8" v-if="emailVerified">
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
import { EmailService,SubscriptionService } from '@/lib/services';
import { SubscriptionStorage } from '~~/storage';
import { MissingInformationException,ServerErrorException } from '@/lib/exceptions';
const { t,locale } = useI18n();
const isVerifyingEmail = ref(false);

const emailVerified = ref(false);
const email = ref('');

const submittingError=ref(false);
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
    errorText.value =  "";
    submittingError.value = false;
    try{
        isVerifyingEmail.value = true;
        await EmailService.validateEmail(locale.value,{
            email:email.value,
            code:code
        })
        emailVerified.value = true;
        SubscriptionStorage.saveEmailVerified();
        emit('validated');
    }
    catch(err:unknown){
        handleError(err)
    }
    finally{
        isVerifyingEmail.value = false;
    }
}
const resendEmail = async ()=>{
    errorText.value =  "";
    submittingError.value = false;
    try{
        isVerifyingEmail.value = true;
        await EmailService.sendEmailCode(locale.value,{email:email.value});
    }
    catch(err){
        handleError(err)
    }
    finally{
        isVerifyingEmail.value = false;
    }
}
const handleError= (err:unknown)=>{
    submittingError.value = true;

        if(err instanceof MissingInformationException){
            errorText.value = err.getRealMessage();
        }
        else if(err instanceof ServerErrorException){
            errorText.value = t(err.getTranslationKey());
        }
        else
            errorText.value = t(err.getTranslationKey());
}
</script>
