<template>
  <main class="px-4 sm:px-6 lg:flex-auto lg:px-0">
    <Notification :show="showSuccessNotification" :title="notificationTitle" :text="notificationText"
      :type="notificationType" @close="onNotificationClosed" className="mt-12"/>
    <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
      <div>
        <UpdateProfile @onUpdate="onProfileUpdated"/>
        <Alert v-if="!isVerified" :kycDetails="account?.account.kyc_details" class="my-3" :kycStatus="account?.kyc_status"/>
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
              <button type="button" class="font-semibold text-blue-600 hover:text-blue-500" @click="openUpdateEmail">{{
                $t('edit') }}</button>
            </dd>
          </div>
          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">{{ $t('phone') }}</dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-900">{{ phone }}</div>
              <button type="button" class="font-semibold text-blue-600 hover:text-blue-500" @click="openUpdatePhone">{{
                $t('edit') }}</button>
            </dd>
          </div>
          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">{{ $t('address') }}</dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-900">{{ address }}</div>
              <button type="button" class="font-semibold text-blue-600 hover:text-blue-500" @click="updateAddress">{{
                $t('edit') }}</button>
            </dd>
          </div>
          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">{{ $t('update_password') }}</dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-900">{{ '*******' }}</div>
              <button type="button" class="font-semibold text-blue-600 hover:text-blue-500" @click="editPassword">{{
                $t('edit') }}</button>
            </dd>
          </div>
        </dl>
      </div>

      <div v-if="isVerified">
        <h2 class="text-base font-semibold leading-7 text-gray-900">{{ $t('bank_accounts') }}</h2>


        <ul role="list" class="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
          <li class="flex justify-between gap-x-6 py-6" v-for="pAccount in paymentAccounts" :key="pAccount.id">
            <div class="font-medium text-gray-900">{{ formatPaymentAccountDisplay(pAccount) }}</div>
            <div>
              <button type="button" class="font-semibold text-blue-600 hover:text-blue-500 mr-3"
                v-if="!pAccount.is_default" @click="()=>setBankAccountAsDefault(pAccount.id)" :disabled="isModfyingBankAccount">{{ $t('mark_default') }}</button>
              <div v-if="pAccount.is_default"
                :class="'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20 mr-3'">
                {{ $t('default') }}</div>
              <button type="button" class="font-semibold text-red-400 hover:text-red-300" :disabled="isModfyingBankAccount" @click="()=>deleteBankAccount(pAccount.id)">{{ $t('delete') }}</button>
            </div>
          </li>
        </ul>
        <InLineApiError :err="errorLoadingBankAccount" />
        <div class="flex border-t border-gray-100 pt-6">
          <button type="button" class="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500" @click="showAddPayment"><span
              aria-hidden="true">+</span> {{ $t('add_bank_account') }}</button>
        </div>
      </div>

      <article>
        <header class="flex justify-between">
          <h2 class="text-base leading-7 text-gray-900">
            <span class="font-semibold">{{ $t('referralHeader') }}</span>
          </h2>
          <div>
            <dd class="flex items-center gap-x-6 sm:flex-auto mt-4">
              <transition leave-active-class="transition ease-in duration-1000" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="!showReferral" v-show="copyingLink" class="text-sm text-gray-600">
                  {{ $t('copied')}}
                </div>
              </transition>
              <button class="bg-gray-200 text-white2 px-2 py-1 rounded-md text-sm" @click="copyOnlyReferralLink">
                {{ referralCode }}
              </button>
              <button @click="copyOnlyReferralLink" class="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500">
                  {{ $t('copyReferralLink') }}
                </button>
              <InformationCircleIcon @click="showReferral = !showReferral" class="w-6 h-6 rounded-full cursor-pointer" />
            </dd>
          </div>
        </header>
        <div class="flex border-t border-gray-200 mt-4"></div>
        
      </article>

      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">{{ $t('language') }}</h2>


        <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">{{ $t('language') }}</dt>
            <dd class="mt-1 flex justify-end gap-x-6 sm:mt-0 sm:flex-auto ">
              <select id="language" name="language" @change="onlanguagechange"
                class="h-full rounded-md border-transparent bg-transparent py-0 text-gray-500 focus:border-0 focus:ring-0 sm:text-sm "
                v-model="selectedLanguage">
                <option v-for="l in languages" :key="l.id.toString()" :value="l.value" :selected="l.value == language">{{
                  l.text }}</option>
              </select>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <Modal :open="showReferral" @onClose="closeReferralView" v-if="account">
      <figure class="relative">
        <h2 class="leading-7 text-gray-900 text-2xl font-bold max-w-[12rem] mx-auto mb-6 text-center">
          {{ $t('referralHeaderHints') }}
        </h2>
        <picture>
          <source src="~/assets/img/icon_referral.png">
          <img src="~/assets/img/icon_referral.png" alt="referral info" class="w-32 h-auto mb-5 mx-auto"/>
        </picture>
        <div class="mt-4 text-center">
          <p class="py-2">{{ $t('referralRecommendation') }}</p>
        </div>
        
        <div class="pt-6 text-center">
            <dt class="font-bold text-gray-900 text-xl">{{ $t('personalReferralCode') }}</dt>
            <button class="bg-gray-200 mt-2 px-2 py-1 rounded-md text-xl font-bold focus-visible:outline-0" @click="copyOnlyReferralLink">
                {{ referralCode }}
            </button>
        </div>
        <div class="pt-6 text-center">
            <dt class="font-medium text-gray-900">{{ $t('registrationInstructions') }}</dt>
            <button @click="copyOnlyReferralLink" class="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500 mt-4">
                  {{ $t('copyReferralLink') }}
            </button>
        </div>
        
        <p class="text-xs mt-6 text-gray-500 text-center">
          {{ $t('savingsPlanCriteria') }}
        </p>
        <transition leave-active-class="transition ease-in duration-1000" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <div v-show="copyingLink" class="text-sm  rounded-md text-center absolute bottom-[-28px] w-full">
            {{ $t('copied') }}
          </div>
        </transition>
      </figure>
    </Modal>
    <Modal :open="showUpdateAddress" @onClose="closeUpdateAddress" v-if="account">
      <UpdateAddress :address="account.address" @onSave="onAddressUpdated" />
    </Modal>
    <Modal :open="showUpdatPhoneNumber" @onClose="closeUpdatePhoneNumber" v-if="account && phoneChannel">
      <UpdatePhoneNumber :channel="phoneChannel" @onSave="onChannelUpdated" :account="account" />
    </Modal>
    <Modal :open="showUpdateEmail" @onClose="closeUpdateEmail" v-if="account && emailChannel">
      <UpdateEmail :channel="emailChannel" @onSave="onChannelUpdated" :account="account" />
    </Modal>
    <Modal :open="showPasswordUpdatePopup" @onClose="closeUpdatePassword" v-if="account">
      <UpdatePassword :account="account" @onSave="onPasswordUpdated" />
    </Modal>
    <AddPaymentAcount :showAddPaymentAccount="addNewPaymentAcoount" :accountId="account.account.id" v-if="account && account.account" @onClose="closeAddPaymentAccount" @OnAdd="onPaymentAccountAdded"/>
    <Confirmation :show="showConfirmation" @cancel="cancelDelete" @confirm="confirmDelete" :title="$t('confirm_delete')" :text="$t('do_you_want_to_delete_bank_account')"/>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "app-layout",
  middleware: ['protected'],
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
  InformationCircleIcon
} from '@heroicons/vue/24/outline';
import { Account, Address, PaymentAccount } from '~~/lib/models';
import { AccountStorage } from '~~/storage';
import InLineApiError from '@/components/common/InLineApiError';
import { AccountService, PaymentAccountService } from '~~/lib/services';
import { PaymentAccountSpecs } from '~~/lib/contants';
import UpdateAddress from '@/components/Profile/UpdateAddress.vue';
import UpdatePassword from '@/components/Profile/UpdatePassword.vue';
import Notification from "@/components/common/Notification";
import Modal from '@/components/common/Modal';
import { NotificationTypes } from '~~/constants/NotificationTypes';
import UpdatePhoneNumber from '@/components/Profile/UpdatePhoneNumber';
import UpdateEmail from '@/components/Profile/UpdateEmail.vue';
import UpdateProfile from '@/components/Profile/UserProfile.vue';
import AddPaymentAcount from '@/components/PaymentAccount/AddPaymentAcount';
import { BadInputException, MissingInformationException, ServerErrorException } from '@/lib/exceptions';
import Confirmation from '@/components/common/Confirmation';
import { formatIban } from '@/lib/Formatters';
import  Alert  from '@/components/Kyc/Alert.vue';
const switchLocalePath = useSwitchLocalePath();
const router = useRouter()
const account: Ref<Account> = ref(null);
const paymentAccounts: Ref<PaymentAccount[]> = ref([])
const { t, locale } = useI18n();
const errorLoadingBankAccount = ref(null);
const showUpdatPhoneNumber = ref(false);
const showUpdateEmail = ref(false);
const showSuccessNotification = ref(false);
const notificationType = ref('');
const notificationTitle = ref('');
const notificationText = ref('');
const selectedLanguage = ref('');
const isModfyingBankAccount = ref(false);
const addNewPaymentAcoount = ref(false);
const showConfirmation = ref(false);
const selectedPaymentAccountToDelete = ref(-1);
const showPasswordUpdatePopup = ref(false);
const copyingLink = ref(false);
const showReferral = ref(false);
const confirmDelete = async ()=>{
  try {
    isModfyingBankAccount.value = true;
    await PaymentAccountService.deletePaymentAccount(selectedPaymentAccountToDelete.value);
    let index = paymentAccounts.value.findIndex(x=>x.id == selectedPaymentAccountToDelete.value);
    paymentAccounts.value.splice(index,1);


  } catch (error) {
    notificationText.value = handleError(error);
    notificationTitle.value = t('error');
    notificationType.value = NotificationTypes.danger;
    showSuccessNotification.value = true
  }
  finally{
    isModfyingBankAccount.value = false
    selectedPaymentAccountToDelete.value = -1;
    showConfirmation.value = false;
  }
}
const cancelDelete = ()=>{
  showConfirmation.value = false;
  selectedPaymentAccountToDelete.value = null;
}
const languages = ref([
  {
    id: 1,
    value: 'de',
    text: t('de')
  },
  {
    id: 2,
    value: 'fr',
    text: t('fr')
  },
  {
    id: 3,
    value: 'en',
    text: t('en')
  }
])
const closeUpdatePhoneNumber = () => {
  notificationText.value = ''
  notificationTitle.value = '';
  notificationType.value = null;
  showUpdatPhoneNumber.value = false;
}
const openUpdatePhone = () => {
  showUpdatPhoneNumber.value = true;
}
const showUpdateAddress = ref(false);
const updateAddress = () => {
  showUpdateAddress.value = true;
}
const editPassword = () => {
  showPasswordUpdatePopup.value = true;
}
const onNotificationClosed = () => {

  showSuccessNotification.value = false;
}
const closeUpdateAddress = () => {
  showUpdateAddress.value = false;
}
const closeReferralView = () => {
  showReferral.value = false;
}
const closeUpdatePassword = () => {
  showPasswordUpdatePopup.value = false;
}
const openUpdateEmail = () => {
  showUpdateEmail.value = true;
}
const closeUpdateEmail = () => {
  showUpdateEmail.value = false;
}
const name = computed(() => {
  let n = "";
  if (account.value) {
    n = account.value.name;
    if (account.value.person_data) {
      const middle = account.value.person_data.middlename ? ' ' + account.value.person_data.middlename + ' ' : ' '
      n += middle + account.value.person_data.surname;
    }
  }
  return n;
})
const email = computed(() => {
  let e = ''
  if (account.value) {

    account.value.channels.forEach(channel => {
      if (channel.type.name_translation_key == 'email_channel_type') {
        e = channel.value;
      }
    })
  }
  return e;
})
const emailChannel = computed(() => {
  let e;
  if (account.value) {

    account.value.channels.forEach(channel => {
      if (channel.type.name_translation_key == 'email_channel_type') {
        e = channel;
      }
    })
  }
  return e;
})
const phone = computed(() => {
  let e = ''
  if (account.value) {

    account.value.channels.forEach(channel => {
      if (channel.type.name_translation_key == 'mobile_channel_type') {
        e = channel.value;
      }
    })
  }
  return e;
})
const phoneChannel = computed(() => {
  let e;
  if (account.value) {

    account.value.channels.forEach(channel => {
      if (channel.type.name_translation_key == 'mobile_channel_type') {
        e = channel;
      }
    })
  }
  return e;
})
const isVerified = computed(()=>{
  if(account.value){
    return account.value.is_verified;
  }
  else{
    return false;
  }
})
const address = computed(() => {
  let a = '-'
  if (account.value && account.value.address && account.value.address.line1!=null && account.value.address.postal_code!=null && account.value.address.city!=null) {

    if (account.value.address) {
      if (account.value.address.line1 && account.value.address.line2 != "")
        a = `${account.value.address.line1}\n${account.value.address.line2}\n${account.value.address.postal_code} ${account.value.address.city}\n${account.value.address.region ? account.value.address.region + ' / ' : ''}${account.value.address.country ? account.value.address.country.name_translation_key : ''}`;
      else {
        a = `${account.value.address.line1}\n${account.value.address.postal_code} ${account.value.address.city}\n${account.value.address.region ? account.value.address.region + ' / ' : ''}${account.value.address.country ? account.value.address.country.name_translation_key : ''}`;
      }
    }
  }
  return a;
})
const language = computed(() => {
  let l = "";
  if (account.value) {
    account.value.account.settings.forEach(s => {
      if (s.name_translation_key == 'locale') {
        l = s.value;
      }
    })
  }
  return l
})
const referralCode = computed(() => account.value?.account?.referral_code ?? "")
const referralLink = computed(() => account.value?.account?.referral_link ?? "")
const showAddPayment = ()=>{
  addNewPaymentAcoount.value = true
}
const closeAddPaymentAccount = ()=>{
  addNewPaymentAcoount.value = false
}
const onPaymentAccountAdded = (paymentAccount:PaymentAccount)=>{
  paymentAccounts.value.unshift(paymentAccount);
  addNewPaymentAcoount.value = false
}
const onChannelUpdated = async () => {
  let acc = await AccountService.loadAccount(account.value.id);
  account.value = acc;
  AccountStorage.saveAccount(acc);
  showSuccessNotification.value = true
  notificationText.value = t('channel_updated')
  notificationTitle.value = t('success');
  notificationType.value = NotificationTypes.sucess;
  closeUpdatePhoneNumber();
  closeUpdateAddress();
}
const onAddressUpdated = (address: Address) => {

  let newAccount: Account = JSON.parse(JSON.stringify(account.value));
  newAccount.address = address;
  account.value = newAccount;
  AccountStorage.saveAccount(newAccount);
  showSuccessNotification.value = true
  notificationText.value = t('address_updated')
  notificationTitle.value = t('success');
  notificationType.value = NotificationTypes.sucess;
  closeUpdateAddress();
}
const onPasswordUpdated = () => {
  showSuccessNotification.value = true
  notificationText.value = t('password_updated')
  notificationTitle.value = t('success');
  notificationType.value = NotificationTypes.sucess;
  showPasswordUpdatePopup.value = false
}
const onProfileUpdated = () => {
  showSuccessNotification.value = true
  notificationText.value = t('profile_avatar_updated')
  notificationTitle.value = t('success');
  notificationType.value = NotificationTypes.sucess;
}
const formatPaymentAccountDisplay = (paymentAccount: PaymentAccount) => {
  let bankName = "";
  let iban = "";
  paymentAccount.payment_account_specs.forEach(spec => {
    if (spec.name == PaymentAccountSpecs.bank_name) {
      bankName = spec.value;
    }
    if (spec.name == PaymentAccountSpecs.iban) {
      iban = formatIban(spec.value);
    }
  })
  return bankName + " " + iban;
}
const onlanguagechange = async (value: any) => {
  const accountId = account.value.account.id;
  try {
    await AccountService.updateSettings(accountId, { locale: value.target.value });
    let newAccount = JSON.parse(JSON.stringify(account.value));
    newAccount.account.settings.forEach(s => {
      if (s.name_translation_key == 'locale') {
        s.value = value.target.value;

      }
    })
    AccountStorage.saveAccount(newAccount);
    const url = "http://" + window.location.host + switchLocalePath(value.target.value);
    window.open(url, '_self');
  }
  catch (err) {
    notificationText.value = handleError(err);
    notificationTitle.value = t('error');
    notificationType.value = NotificationTypes.danger;
  }
  //location.reload();
}
const setBankAccountAsDefault = async (bankAccountId:number)=>{
  try {
    isModfyingBankAccount.value = true;
    await PaymentAccountService.setPaymentAccountAsDefault(bankAccountId);
    paymentAccounts.value = await PaymentAccountService.getClientPaymentAccounts();

  } catch (error) {
    notificationText.value = handleError(error);
    notificationTitle.value = t('error');
    notificationType.value = NotificationTypes.danger;
  }
  finally{
    isModfyingBankAccount.value = false
  }
}
const deleteBankAccount = async (bankAccountId:number)=>{
  selectedPaymentAccountToDelete.value = bankAccountId;
  showConfirmation.value = true;
}
const handleError = (value) => {
  
  if (value instanceof MissingInformationException || value instanceof BadInputException) {
    return value.getRealMessage();
  }
  else if (value instanceof ServerErrorException) {
    useBugsnag().notify(value)
    return t(value.getTranslationKey());
  }
  else
  {
    useBugsnag().notify(value);
    return value.message;
  }
    
}
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch($e) {
    console.error($e)
  }
}
const copyOnlyReferralLink = async() => {
  copyingLink.value = true
  setTimeout(() => {
    copyingLink.value = false
  }, 500);
  copyToClipboard(referralLink.value)
}
onMounted(async () => {
  account.value = AccountStorage.getAccount();
  if (account.value) {
    account.value.account.settings.forEach(s => {
      if (s.name_translation_key == 'locale') {
        selectedLanguage.value = s.value;
      }
    })
  }
  try {
    paymentAccounts.value = await PaymentAccountService.getClientPaymentAccounts();
  }
  catch (err) {
    errorLoadingBankAccount.value = err;
  }

})
</script>
