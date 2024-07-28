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
                <div v-if="enableAll || (account && account.person_data)">
                  <label for="gender" class="block text-sm font-medium text-gray-700">{{ $t('gender') }}</label>
                  <select id="gender" name="gender" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  v-model="state.gender"
                  >
                        <option v-for="gender in genders" :key="gender.option" :value="gender.option">{{ gender.name }}</option>
                        
                </select>
                </div>
                <div v-if="enableAll || (account && account.person_data)">
                    <label for="birtdate" class="block text-sm font-medium text-gray-700">{{ $t('birthdate') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        
                        <input type="date" name="birtdate" id="birtdate" required
                            v-model="state.birthdate"
                            class="block  w-full 10 pl-3 py-2 rounded-md"
                            :class="(!birthdateValidated)?inputErrorStyle:inputStyle"
                            placeholder="" />
                            
                    </div>
                </div>
              </div>
              <div class="md:grid md:grid-cols-2 md:gap-8">
                <div v-if="enableAll || (account && account.person_data )">
                    <label for="birthplace" class="block text-sm font-medium text-gray-700">{{ $t('birthplace') }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        
                        <input type="text" name="birthplace" id="birthplace" v-model="state.birthplace" required
                        class="block  w-full 10 pl-3 py-2 rounded-md"
                        :class="(prenameChanged && state.prename.length==0)?inputErrorStyle:inputStyle"
                        @change="onPrenameChanged"
                            />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="prenameChanged && state.prename.length==0">
                            <ExclamationCircleIcon class="h-4 w-4 text-red-500" />
                        </div>
                    </div>
                </div>
                <div v-if="enableAll || (account && account.person_data)">
                    
                    
                        
                        <Countries :all="true" :label="'nationality'" class="self-center" @change="handleCountryChange"  :selectedCountryId="state.nationality"/>
                            
                    
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
import {validateBirthdate,validatePassword,validatePhoneNumber} from '@/lib/utils/Validators';
import {SubscriptionService,EmailService,PhoneNumberService} from '@/lib/services';
import {ref,reactive,toRefs,watch,computed,onMounted, PropType} from 'vue';
import { SubscriptionStorage } from '~~/storage';
import { AccountInformationRequest } from '@/lib/requests';
import { useRoute } from 'vue-router';
import { MissingInformationException,ServerErrorException } from '@/lib/exceptions';
import { AddressRequest } from '~~/lib/requests/AddressRequest';
import Countries from '@/components/Register/Countries';
import { Account } from '~~/lib/models';
import moment from 'moment';

const birthdateValidated = ref(false);

const saveActivated = ref(false);
const isSubmitting = ref(false);
const prenameChanged = ref(false);
const nameChanged = ref(false);
const inputErrorStyle = 'border-red-300   text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';
const inputStyle = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
const errorIconColor = 'text-red-900';
const iconColor = 'text-gray-400';
const { t,locale } = useI18n();
const props = defineProps({
    account : {
        type : Object as PropType<Account>
    },
    enableAll:{
        type:Boolean,
        default:true
    }
})
const genders = [
        { option: "female", name: t('female')},
        { option: "male", name: t('male')}
    ];
const state = reactive({
    birthdate:'',
    prename:'',
    name:'',
    gender:'male',
    birthplace:'',
    nationality:-1
});

const emit = defineEmits<{
  (e: 'onSave',info:Object): void
}>()

const  handleCountryChange =(counrty)=>{
    state.nationality = counrty;
}
const onNameChanged=()=>{
    nameChanged.value = true;
}
const onPrenameChanged=()=>{
    prenameChanged.value = true;
}
const nextBtnClicked = false;
const initData = (account:Account)=>{
    if(account){
        const info = account?.person_data;
    
        if(info){
            
            state.name = info.surname;
            state.prename = account.name;
            state.gender = info.gender;
            state.birthdate = moment(info.birthdate).format('YYYY-MM-DD');
            state.birthplace = info.birth_place;
            state.nationality = info.nationality_id;
        }
    }
}
onMounted(()=>{
    initData(props.account)
    
})
watch(props,(currentValue)=>{
    initData(currentValue.account);
})
watch(state,(currentValue)=>{
    
    birthdateValidated.value = validateBirthdate(new Date(currentValue.birthdate));
    if(currentValue.name.length>0 && currentValue.prename.length>0 && birthdateValidated.value && currentValue.gender && currentValue.gender.length > 0 && currentValue.nationality!=null && currentValue.nationality > -1)
    {
        saveActivated.value = true;
    }
    else{
        saveActivated.value = false;
    }

})
async function save() {
    emit('onSave',{
        name:state.name,
        prename: state.prename,
        gender: state.gender,
        birthdate: moment(state.birthdate).format('YYYY-MM-DD'),
        birthplace:state.birthplace,
        nationality:state.nationality
    });
}

</script>
