<template>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">{{ $t('email') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <EnvelopeIcon :class="(!emailValidated)?errorIconColor:iconColor" class="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input type="email" name="email" id="email"
                            v-model="state.email"
                            class="block  w-full 10 pl-10 py-2 rounded-md"
                            :class="(!emailValidated)?inputErrorStyle:inputStyle"
                            placeholder="you@example.com" />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="!passwordValidated">
                                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" v-if="(!emailValidated)"/>
                            </div>
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">{{ $t('password') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon class="h-5 w-5" :class="(!passwordValidated)?errorIconColor:iconColor" aria-hidden="true" />
                        </div>
                        <input type="password" name="password" id="password" v-model="state.password"
                        class="block  w-full 10 pl-10 py-2 rounded-md"
                        :class="(passwordValidated)?inputStyle:inputErrorStyle"
                            placeholder="******"  aria-invalid="true"
                            aria-describedby="password-error" />
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="!passwordValidated">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    </div>
                    <p class="mt-2 text-sm text-red-600" id="email-error" v-if="!passwordValidated">{{ $t('password_message') }}
                    </p>
                </div>
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">{{ $t('name') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserIcon class="h-5 w-5" :class="(state.prename.length==0)?errorIconColor:iconColor" aria-hidden="true" />
                        </div>
                        <input type="text" name="name" id="name" v-model="state.prename"
                        class="block  w-full 10 pl-10 py-2 rounded-md"
                        :class="(state.prename.length>0)?inputStyle:inputErrorStyle"
                            />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="state.prename.length==0">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    </div>
                </div>
                <div>
                    <label for="surname" class="block text-sm font-medium text-gray-700">{{ $t('surname') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserIcon class="h-5 w-5" aria-hidden="true" :class="(state.name.length==0)?errorIconColor:iconColor"/>
                        </div>
                        <input type="surname" name="surname" id="surname" v-model="state.name"
                        class="block  w-full 10 pl-10 py-2 rounded-md"
                        :class="(state.name.length>0)?inputStyle:inputErrorStyle"
                            />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="state.name.length==0">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    </div>
                </div>
                <div>
                    <label for="surname" class="block text-sm font-medium text-gray-700">{{ $t('referal_code') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <HashtagIcon class="h-5 w-5" aria-hidden="true" :class="iconColor"/>
                        </div>
                        <input type="surname" name="surname" id="surname" v-model="state.referalCode"
                        class="block  w-full 10 pl-10 py-2 rounded-md"
                        placeholder="x012000"
                        :class="inputStyle"
                            />
                            
                    </div>
                </div>
                <div>

                    <label for="phone-number" class="block text-sm font-medium text-gray-700">{{ $t('phone_number') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 flex items-center">
                            
                            <PhoneCodes @change="onPhoneCodeChange"/>
                        </div>
                        <input type="text" name="phone-number" id="phone-number"
                            class="block w-full rounded-md border-gray-300 pl-36 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            :placeholder=" state.phoneCode +' 1522 3433333'" v-model="state.phone" :class="(state.phone.length>0)?inputStyle:inputErrorStyle"/>
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
import {validateEmail,validatePassword,validatePhoneNumber} from '@/lib/utils/Validators';
import {SubscriptionService} from '@/lib/services/SubscriptionService';
import {EmailService} from '@/lib/services/EmailService';
import {PhoneNumberService} from '@/lib/services/PhoneNumberService';
import {ref,reactive,toRefs,watch,computed,onMounted} from 'vue';
import PhoneCodes from '@/components/Register/PhoneCodes';
import { stat } from 'fs';
import { SubscriptionStorage } from '~~/storage/SubscriptionStorage';
import { AccountInformationRequest } from '~~/lib/requests/AccountInformationRequest';
const passwordValidated = ref(false);
const emailValidated = ref(false);
const phoneValidated = ref(false);
const saveActivated = ref(false);
const isSubmitting = ref(false);
const inputErrorStyle = 'border-red-300   text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';
const inputStyle = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
const errorIconColor = 'text-red-900';
const iconColor = 'text-gray-400';
const shouldDisplayEmailError=()=>{
    return !emailValidated && state.email.length>0
}
const shouldDisplayPasswordError= computed(()=>{
    return !passwordValidated && state.password.length>0
})
const submittingError = ref(false);
const state = reactive({
    email:'',
    password:'',
    prename:'',
    name:'',
    phone:'',
    phoneCode:'',
    referalCode:''
});
const onPhoneCodeChange = (value:string)=>{
    state.phoneCode = value;
}
const emit = defineEmits<{
  (e: 'onSave'): void
}>()
onMounted(()=>{
    const info = SubscriptionService.getAccountInformation();
    if(info){
        state.email = info.email;
        state.name = info.surname;
        state.prename = info.prename;
        state.password = info.password;
        state.phone = info.mobile;
        state.referalCode =  info.referral_code;
    }
})
watch(state,(currentValue)=>{
    passwordValidated.value = validatePassword(currentValue.password);
    emailValidated.value = validateEmail(currentValue.email);
    console.log(emailValidated.value);
    phoneValidated.value = validatePhoneNumber(currentValue.phone);
    if(currentValue.name.length>0 && currentValue.prename.length>0 && passwordValidated.value && emailValidated.value && phoneValidated.value)
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
        //await EmailService.sendEmailCode({email:state.email});
        //await PhoneNumberService.sendPhoneCode({phone_number:state.phoneCode+state.phone});
        const data:AccountInformationRequest = {
            email:state.email,
            password:state.password,
            mobile:state.phoneCode+state.phone,
            prename:state.prename,
            surname :state.name,
            referral_code:state.referalCode
        };
        SubscriptionStorage.saveAccountInformation(data)
        SubscriptionService.saveAccountInformation({
            email:state.email,
            password:state.password,
            mobile:state.phoneCode+state.phone,
            prename:state.prename,
            surname :state.name,
            referral_code:state.referalCode
        });
        emit('onSave');
    }
    catch(err){

    }
    finally{
        isSubmitting.value = false;
    }
}

</script>