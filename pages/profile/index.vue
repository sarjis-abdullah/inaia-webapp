<template>
      <main class="px-4 sm:px-6 lg:flex-auto lg:px-0">
        <Notification :v-show="true"/>
        <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <h2 class="text-base font-semibold leading-7 text-gray-900">{{ $t('profile') }}</h2>
           
  
            <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
              <div class="pt-6 sm:flex">
                <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">{{ $t('full_name') }}</dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div class="text-gray-900">{{ name }}</div>
                  
                </dd>
              </div>
              <div class="pt-6 sm:flex">
                <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">{{ $t('email_address') }}</dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div class="text-gray-900">{{ email }}</div>
                  <button type="button" class="font-semibold text-blue-600 hover:text-blue-500">{{ $t('update') }}</button>
                </dd>
              </div>
              <div class="pt-6 sm:flex">
                <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">{{ $t('phone') }}</dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div class="text-gray-900">{{ phone }}</div>
                  <button type="button" class="font-semibold text-blue-600 hover:text-blue-500" @click="openUpdatePhone">{{ $t('update') }}</button>
                </dd>
              </div>
              <div class="pt-6 sm:flex">
                <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">{{ $t('address') }}</dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div class="text-gray-900">{{ address }}</div>
                  <button type="button" class="font-semibold text-blue-600 hover:text-blue-500" @click="updateAddress">{{ $t('update') }}</button>
                </dd>
              </div>
            </dl>
          </div>
  
          <div>
            <h2 class="text-base font-semibold leading-7 text-gray-900">{{ $t('bank_accounts') }}</h2>
            
  
            <ul role="list" class="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
              <li class="flex justify-between gap-x-6 py-6" v-for="pAccount in paymentAccounts" :key="pAccount.id">
                <div class="font-medium text-gray-900">{{ formatPaymentAccountDisplay(pAccount) }}</div>
                <div>
                <button type="button" class="font-semibold text-blue-600 hover:text-blue-500 mr-3" v-if="!pAccount.is_default">{{ $t('mark_default') }}</button>
                <div v-if="pAccount.is_default" :class="'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20 mr-3' ">{{ $t('default') }}</div>
                <button type="button" class="font-semibold text-blue-600 hover:text-blue-500">{{ $t('delete') }}</button>
              </div>
              </li>
            </ul>
            <InLineApiError :err="errorLoadingBankAccount" />
            <div class="flex border-t border-gray-100 pt-6">
              <button type="button" class="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"><span aria-hidden="true">+</span> {{ $t('add_bank_account') }}</button>
            </div>
          </div>
  
          
  
          <div>
            <h2 class="text-base font-semibold leading-7 text-gray-900">{{ $t('language') }}</h2>
            
  
            <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
              <div class="pt-6 sm:flex">
                <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">{{ $t('language') }}</dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div class="text-gray-900">{{ language }}</div>
                  <button type="button" class="font-semibold text-blue-600 hover:text-blue-500">{{ $t('update') }}</button>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <Modal :open="showUpdateAddress" @onClose="closeUpdateAddress" v-if="account">
          <UpdateAddress :address="account.address" @onSave="onAddressUpdated"/>
        </Modal>
        <Modal :open="showUpdatPhoneNumber" @onClose="closeUpdatePhoneNumber" v-if="account">
          <UpdatePhoneNumber :userNumber="phone" @onSave="onPhoneUpdated"/>
        </Modal>
      </main>

   
  </template>
  
  <script setup lang="ts">
  definePageMeta({
  layout:"app-layout",
  middleware:['protected'],
});
  import { Ref, ref } from 'vue'
  import { Dialog, DialogPanel, Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
  import { Bars3Icon } from '@heroicons/vue/20/solid'
  import {
    BellIcon,
    CreditCardIcon,
    CubeIcon,
    FingerPrintIcon,
    UserCircleIcon,
    UsersIcon,
    XMarkIcon,
  } from '@heroicons/vue/24/outline';
import { Account, Address, PaymentAccount } from '~~/lib/models';
import { AccountStorage } from '~~/storage';
import InLineApiError from '@/components/common/InLineApiError';
import { PaymentAccountService } from '~~/lib/services';
import { PaymentAccountSpecs } from '~~/lib/contants';
import UpdateAddress from '@/components/Profile/UpdateAddress.vue';
import Notification from "@/components/common/Notification";
import Modal from '@/components/common/Modal';
import UpdatePhoneNumber from '@/components/Profile/UpdatePhoneNumber';
  const account : Ref<Account> = ref(null);
    const paymentAccounts : Ref<PaymentAccount[]> = ref([]) 
    const {t} = useI18n();
    const errorLoadingBankAccount = ref(null);
    const showUpdatPhoneNumber = ref(false);
    const closeUpdatePhoneNumber = ()=>{
      showUpdatPhoneNumber.value = false;
    }
    const openUpdatePhone = ()=>{
      showUpdatPhoneNumber.value = true;
    }
    const showUpdateAddress = ref(false);
    const updateAddress = ()=>{
      showUpdateAddress.value = true;
    }
    const closeUpdateAddress = ()=>{
      showUpdateAddress.value = false;
    }
    const name = computed(()=>{
      let n = "";
      if(account.value){
        n = account.value.name;
        if(account.value.person_data){
          const middle = account.value.person_data.middlename?' '+account.value.person_data.middlename+' ':' '
          n+=middle + account.value.person_data.surname;
        }
      }
      return n;
    })
    const email = computed(()=>{
      let e=''
      if(account.value){
       
        account.value.channels.forEach(channel=>{
          if(channel.type.name_translation_key =='email_channel_type'){
            e = channel.value;
          }
        })
      }
      return e;
    })
    const phone = computed(()=>{
      let e=''
      if(account.value){
       
        account.value.channels.forEach(channel=>{
          if(channel.type.name_translation_key =='mobile_channel_type'){
            e = channel.value;
          }
        })
      }
      return e;
    })
    const address = computed(()=>{
      let a=''
      if(account.value){
       
        if(account.value.address){
          if(account.value.address.line1 && account.value.address.line2!="")
            a= `${account.value.address.line1}\n${account.value.address.line2}\n${account.value.address.postal_code} ${account.value.address.city}\n${account.value.address.region?account.value.address.region+' / ':''}${account.value.address.country?account.value.address.country.name_translation_key:''}`;
        else
        {
            a= `${account.value.address.line1}\n${account.value.address.postal_code} ${account.value.address.city}\n${account.value.address.region?account.value.address.region+' / ':''}${account.value.address.country?account.value.address.country.name_translation_key:''}`;
        }
        }
      }
      return a;
    })
    const language = computed(()=>{
      let l = "";
      if(account.value){
        account.value.account.settings.forEach(s=>{
          if(s.name_translation_key == 'locale'){
            l = t(s.value);
          }
        })
      }
      return l
    })
    const onAddressUpdated = (address:Address)=>{
      let newAccount:Account = JSON.parse(JSON.stringify(account.value));
      newAccount.address = address;
      account.value = newAccount;
      AccountStorage.saveAccount(newAccount);
    }
    const formatPaymentAccountDisplay = (paymentAccount:PaymentAccount)=>{
      let bankName = "";
      let iban = "";
      paymentAccount.payment_account_specs.forEach(spec=>{
        if(spec.name==PaymentAccountSpecs.bank_name){
          bankName = spec.value;
        }
        if(spec.name==PaymentAccountSpecs.iban){
          iban = spec.value;
        }
      })
      return bankName + " " +iban;
    }
  onMounted(async()=>{
      account.value = AccountStorage.getAccount();
      try{
        paymentAccounts.value = await PaymentAccountService.getClientPaymentAccounts();
      }
      catch(err){
        errorLoadingBankAccount.value = err;
      }

  })
  </script>