<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <img src="~/assets/img/pageicons/register.jpg" alt="personal info" class="w-32 h-auto mb-5 mx-auto"/>
            <h2 class="text-center mb-6 text-2xl font-bold">{{ $t('subscription_info') }}</h2>
            <form class="space-y-6" method="POST" novalidate>
              <div class="md:grid md:grid-cols-2 md:gap-8">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">{{ $t('name') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserIcon class="h-4 w-4" :class="(prenameChanged && state.prename.length==0)?errorIconColor:iconColor" />
                        </div>
                        <input type="text" name="name" id="name" v-model="state.prename" required
                        class="block  w-full 10 pl-10 py-2 rounded-md"
                        :class="(prenameChanged && state.prename.length==0)?inputErrorStyle:inputStyle"
                        @change="onPrenameChanged"
                            />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="prenameChanged && state.prename.length==0">
                            <ExclamationCircleIcon class="h-4 w-4 text-red-500" />
                        </div>
                    </div>
                </div>
                <div>
                    <label for="surname" class="block text-sm font-medium text-gray-700">{{ $t('surname') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserIcon class="h-4 w-4" :class="(nameChanged && state.name.length==0)?errorIconColor:iconColor"/>
                        </div>
                        <input type="text" name="surname" id="surname" v-model="state.name" required
                        class="block  w-full 10 pl-10 py-2 rounded-md"
                        :class="(!nameChanged || state.name.length>0)?inputStyle:inputErrorStyle"
                        @change="onNameChanged"
                            />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="nameChanged && state.name.length==0">
                            <ExclamationCircleIcon class="h-4 w-4 text-red-500" />
                        </div>
                    </div>
                </div>
              </div>

              <div class="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <label for="phone-number" class="block text-sm font-medium text-gray-700">{{ $t('phone_number') }}</label>
                  <div class="relative mt-1 rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 flex items-center">
                          <PhoneCodes @change="onPhoneCodeChange" :phoneCode="state.phoneCode"/>
                      </div>
                      <input type="text" name="phone-number" id="phone-number" required
                          class="block w-full rounded-md border-gray-300 pl-28 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                           v-model="state.phone" :class="(!phoneChanged || state.phone.length>0)?inputStyle:inputErrorStyle" @change="onPhoneChanged"/>
                  </div>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">{{ $t('email') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <EnvelopeIcon :class="(!emailValidated && state.email.length>0)?errorIconColor:iconColor" class="h-4 w-4" />
                        </div>
                        <input type="email" name="email" id="email" required
                            v-model="state.email"
                            class="block  w-full 10 pl-10 py-2 rounded-md"
                            :class="(!emailValidated && state.email.length>0)?inputErrorStyle:inputStyle"
                            placeholder="" />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="!emailValidated">
                                <ExclamationCircleIcon class="h-4 w-4 text-red-500" v-if="(!emailValidated && state.email.length>0)"/>
                            </div>
                    </div>
                </div>
              </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">{{ $t('password') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon class="h-4 w-4" :class="(!passwordValidated && state.password.length>0)?errorIconColor:iconColor" />
                        </div>
                        <input type="password" name="password" id="password" v-model="state.password" required
                        class="block  w-full 10 pl-10 py-2 rounded-md"
                        :class="(!passwordValidated && state.password.length>0)?inputErrorStyle:inputStyle"
                            placeholder=""  aria-invalid="true"
                            aria-describedby="password-error" />
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="!passwordValidated && state.password.length>0">
                            <ExclamationCircleIcon class="h-4 w-4 text-red-500" />
                        </div>
                    </div>
                    <p class="mt-2 text-sm text-red-600" id="email-error" v-if="!passwordValidated && state.password.length>0">{{ $t('password_message') }}
                    </p>
                </div>
                <div>
                    <label for="referral" class="block text-sm font-medium text-gray-700">{{ $t('referal_code') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <HashtagIcon class="h-4 w-4" :class="iconColor"/>
                        </div>
                        <input type="text" name="referral" id="referral" v-model="state.referalCode"
                        class="block  w-full 10 pl-10 py-2 rounded-md"
                        placeholder=""
                        :class="inputStyle"
                            />

                    </div>
                </div>

                <p class="mt-2 text-sm text-red-600" id="email-error" v-if="submittingError">{{ submittingErrorMessage==null?$t('account_info_error'):submittingErrorMessage }}</p>

                <div>
                  <div class="mt-8">
                    <button type="submit" :disabled="!saveActivated || isSubmitting" @click.prevent="save"
                        :class="(!saveActivated || isSubmitting)?'opacity-50':'opacity-100'"
                        class="flex w-full justify-center font-bold rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{ $t('next') }}</button>
                  </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { EnvelopeIcon,ExclamationCircleIcon, UserIcon,LockClosedIcon,HashtagIcon } from '@heroicons/vue/24/outline';
import {validateEmail,validatePassword,validatePhoneNumber,sanitizePhoneNumber} from '@/lib/utils/Validators';
import {SubscriptionService,EmailService,PhoneNumberService} from '@/lib/services';
import {ref,reactive,toRefs,watch,computed,onMounted} from 'vue';
import PhoneCodes from '@/components/Register/PhoneCodes';
import { SubscriptionStorage } from '~~/storage';
import { AccountInformationRequest } from '@/lib/requests';
import { useRoute } from 'vue-router';
import { MissingInformationException,ServerErrorException } from '@/lib/exceptions';
import { AddressRequest } from '~~/lib/requests/AddressRequest';
const passwordValidated = ref(false);
const emailValidated = ref(false);
const phoneValidated = ref(false);
const saveActivated = ref(false);
const isSubmitting = ref(false);
const prenameChanged = ref(false);
const nameChanged = ref(false);
const phoneChanged = ref(false);
const inputErrorStyle = 'border-red-300   text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';
const inputStyle = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
const errorIconColor = 'text-red-900';
const iconColor = 'text-gray-400';

const submittingError = ref(false);
const submittingErrorMessage = ref("");
const { t,locale } = useI18n();
const state = reactive({
    email:'',
    password:'',
    prename:'',
    name:'',
    phone:'',
    phoneCode:'0049',
    referalCode:'',
    country_id:-1
});
const onPhoneCodeChange = (value:string,id:Number)=>{
    state.phoneCode = value;
    state.country_id = id;
}
const onPhoneChanged =()=>{
    phoneChanged.value = true;
}
const emit = defineEmits<{
  (e: 'onSave'): void
}>()
const onNameChanged=()=>{
    nameChanged.value = true;
}
const onPrenameChanged=()=>{
    prenameChanged.value = true;
}
const nextBtnClicked = false;

onMounted(()=>{
    const {query}= useRoute();
    const info = SubscriptionService.getAccountInformation();
    if(locale.value=="de"){
        state.phoneCode = "0049";
    }
    if(locale.value=="fr"){
        state.phoneCode = "0033";
    }
    if(locale.value=="en"){
        state.phoneCode = "0044";
    }
    if(info){
        state.email = info.email;
        state.name = info.surname;
        state.prename = info.prename;
        state.password = info.password;
        state.phone = info.mobile;
        state.referalCode =  info.referral_code;
        state.phoneCode = info.phone_code;
    }
    const address = SubscriptionStorage.getAddress();
    if(address){
        state.country_id= address.country_id;
    }
    if(query.referral){
        state.referalCode = query.referral;
    }
    
})
watch(state,(currentValue)=>{
    passwordValidated.value = validatePassword(currentValue.password);
    emailValidated.value = validateEmail(currentValue.email);
    phoneValidated.value = validatePhoneNumber(currentValue.phone);
    if(currentValue.name.length>0 && currentValue.prename.length>0 && passwordValidated.value && emailValidated.value && phoneValidated.value)
    {
        saveActivated.value = true;
    }
    else{
        saveActivated.value = false;
    }

})
const handleCountryChange = (value:number)=>{
    state.country_id = value;
}
async function save() {
    isSubmitting.value = true;
    submittingError.value = false;
    submittingErrorMessage.value = "";
    try{
        await EmailService.sendEmailCode(locale.value,{email:state.email});
        SubscriptionStorage.saveEmailNotVerified();
        await PhoneNumberService.sendPhoneCode(locale.value,{phone_number:state.phoneCode+sanitizePhoneNumber(state.phone)});
        SubscriptionStorage.phoneNotValidated();
        const data:AccountInformationRequest = {
            email:state.email,
            password:state.password,
            mobile:sanitizePhoneNumber(state.phone),
            prename:state.prename,
            surname :state.name,
            referral_code:state.referalCode,
            phone_code:state.phoneCode
        };
        SubscriptionStorage.saveAccountInformation(data)
        SubscriptionService.saveAccountInformation(data);
        let addressData: AddressRequest = {
            country_id:state.country_id
        }
        await SubscriptionStorage.saveAddress(addressData);
        SubscriptionService.saveAddress(addressData)
        emit('onSave');
    }
    catch(err){
        submittingError.value = true;

        if(err instanceof MissingInformationException){
            submittingErrorMessage.value = err.getRealMessage();
        }
        else if(err instanceof ServerErrorException){
            submittingErrorMessage.value = t(err.getTranslationKey());
            useBugsnag().notify(err);
        }
        else{
            submittingErrorMessage.value = t(err.getTranslationKey());
            useBugsnag().notify(err);
        }

    }
    finally{
        isSubmitting.value = false;
    }
}

</script>
