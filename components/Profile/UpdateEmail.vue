<template>
    <div class="sm:mx-auto bg-white sm:w-full sm:max-w-2xl min-w-[50%] p-10 shadow sm:rounded-lg">
        <div class="flex flex-col mx-auto">
            <img src="~/assets/img/pageicons/emailVerif.png" alt="email verification" class="w-32 h-auto mb-5 mx-auto"/>
            <h2 class="text-center mb-5 font-bold text-2xl">{{ $t('update_email') }}</h2>
            <div class="mt-3 w-full">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">{{ $t('email') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <EnvelopeIcon :class="(!emailValidated && email.length>0)?errorIconColor:iconColor" class="h-4 w-4" />
                        </div>
                        <input type="email" name="email" id="email" required
                            v-model="email"
                            class="block  w-full 10 pl-10 py-2 rounded-md"
                            :class="(!emailValidated && email.length>0)?inputErrorStyle:inputStyle"
                            placeholder="" />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="!emailValidated">
                                <ExclamationCircleIcon class="h-4 w-4 text-red-500" v-if="(!emailValidated && email.length>0)"/>
                            </div>
                    </div>
                    <div class="mt-6 text-center">
                        
                          <a class="text-xs text-blue-600 cursor-pointer" @click.prevent="resendEmail">
                            <span  v-if="emailSent">{{ $t('resend_email_code') }}</span>
                            <span  v-else>{{ $t('send_email_code') }}</span>
                        </a>
                        </div>
                </div>
            </div>
            <div class="mt-3 w-full" v-if="emailSent">
                <div class="text-center">
                    {{$t('verify_email_infotext')}}<br><br><span class="font-bold">{{ email }}</span>
                </div>
                <div class="flex flex-col items-center mt-8">
                    <div class="text-center" v-if="!emailVerified && !isVerifyingEmail">
                        <CodeInputs  @complete="verifyEmailCode"/>
                        
                    </div>
                   
                    <div class="flex" v-else-if="emailVerified">
                      <CheckCircleIcon class="h-6 w-6 text-green-500"></CheckCircleIcon><span class="text-green-500 ml-2">{{ $t('email_verified') }}</span>
                    </div>

                </div>
            </div>

            <p class="mt-2 text-sm text-red-600 text-center" id="email-error" v-if="submittingError">{{ errorText }}</p>
            <Loading v-else-if="isVerifyingEmail" class="mx-auto"/>
            
        </div>
    </div>
</template>
<script lang="ts" setup>
import { EnvelopeIcon,ExclamationCircleIcon, UserIcon,LockClosedIcon,HashtagIcon } from '@heroicons/vue/24/outline'
import CodeInputs from '@/components/Register/CodeInputs';
import Loading from '@/components/common/Loading';
import {  CheckCircleIcon } from '@heroicons/vue/20/solid';
import {ref,onMounted,watch} from 'vue';
import { EmailService,AccountService } from '@/lib/services';
import { SubscriptionStorage } from '~~/storage';
import { MissingInformationException,ServerErrorException } from '@/lib/exceptions';
import { Account, Channel } from '~~/lib/models';
import { ChannelRequest } from '~~/lib/requests';
import { validateEmail } from '~~/lib/utils/Validators';
const { t,locale } = useI18n();
const emailSent = ref(false);
const isVerifyingEmail = ref(false);

const emailVerified = ref(false);
const email = ref('');
const submittingError=ref(false);
const errorText = ref('');
const inputErrorStyle = 'border-red-300   text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';
const inputStyle = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
const errorIconColor = 'text-red-900';
const iconColor = 'text-gray-400';
const emailValidated = ref(false);
const props = defineProps({
    channel: {
        type : Object as PropType<Channel>
    },
    account: {
        type : Object as PropType<Account>
    }
})
onMounted(()=>{
    email.value = props.channel.value;
})
const emit = defineEmits<{
  (e: 'onSave'): void
}>()
watch(email,(currentValue)=>{
    emailValidated.value = validateEmail(currentValue);
})
watch(props,(currentValue)=>{
   
    if(currentValue.channel){
        email.value = currentValue.channel.value;
    }
})
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
        let request : ChannelRequest = {}
        if(props.channel){
            request.id = props.channel.id;
            request.contact_id = props.channel.contact_id;
            request.value = email.value;
            request.is_active = props.channel.is_active;
            request.is_primary = props.channel.is_primary;
        }
        else{
            request.contact_id = props.account.id;
            request.value = email.value;
            request.is_active = true;
            request.is_primary = true;
        }
        await AccountService.updateChannel(request);
        emit('onSave');
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
        emailSent.value = true
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
            useBugsnag().notify(err);
        }
        else{
            errorText.value = t(err.getTranslationKey());
            useBugsnag().notify(err);
        }
}
</script>