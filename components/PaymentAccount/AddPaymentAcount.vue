<template>
    <Modal :open="showAddPaymentAccount" @onClose="closed">
        <div class="isolate -space-y-px rounded-md shadow-sm">
            <div :class="(isAccountHolderChanged && !state.accountHolder)?containerErrorStyle:containerGoodStyle">
            <label for="accountholder" class="block text-xs font-medium text-gray-900">{{ $t('accountHolder') }}</label>
            <input type="text" name="accountholder" id="accountholder" :class="(isAccountHolderChanged && !state.accountHolder)?errorStyle:goodStyle" placeholder="Mohamed Ahmed" v-model="state.accountHolder"/>
            </div>
            <div :class="(isIbanChanged && !state.iban)?containerErrorStyle:containerGoodStyle">
            <label for="iban" class="block text-xs font-medium text-gray-900">{{ $t('iban') }}</label>
            <input type="text" name="iban" id="iban" :class="(isIbanChanged && !state.iban)?errorStyle:goodStyle" placeholder="YYXXX00000000123456789" v-model="state.iban" />
            </div>
        </div>
        <div class="flex items-center justify-between mt-3">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" v-model="state.defaultSet"/>
              <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">{{ $t('setAsDefault') }}</label>
            </div>
          </div>
          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" v-model="state.paymentAuthorized"/>
              <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">{{ $t('authorizeInaiaToAcceptPayment') }}</label>
            </div>
          </div>

        <div>
                  <div class="mt-8">
                    <button type="submit" :disabled="!saveActivated || isSubmitting" @click.prevent="save"
                        :class="(!saveActivated || isSubmitting)?'opacity-50':'opacity-100'"
                        class="flex w-full justify-center font-bold rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{ $t('save') }}</button>
                  </div>
                  <InLineApiError :err="error"/>
                </div>
    </Modal>
</template>
<script lang="ts" setup>

import Modal from '@/components/common/Modal';
import InLineApiError from '@/components/common/InLineApiError'
import { PaymentAccount } from '~~/lib/models';
import { PaymentAccountService } from '~~/lib/services';
import { PaymentMethods } from '~~/lib/contants/PaymentMethods';
const props = defineProps({
    showAddPaymentAccount:{
        type:Boolean,
        default:false
    },
    accountId:{
        type:Number,
        default:-1
    }
    
})
const saveActivated = ref(false);
const isSubmitting = ref(false);
const error = ref(null);
const isAccountHolderChanged = ref(false);
const isIbanChanged = ref(false);
const errorStyle = "block w-full border-0 p-0 text-red-900 placeholder:text-red-400 focus:ring-0 sm:text-sm sm:leading-6";
const goodStyle = "block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6";
const containerErrorStyle = "relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600";
const containerGoodStyle = "relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-blue-600";
const state = reactive({
    accountHolder:'',
    iban:'',
    defaultSet:false,
    paymentAuthorized:false
})
watch(state,(value)=>{
    if(value.accountHolder!='' && !isAccountHolderChanged.value){
        isAccountHolderChanged.value = true;
    }
    if(value.iban!='' && !isIbanChanged.value){
        isIbanChanged.value = true;
    }
    if(value.iban && value.accountHolder && value.paymentAuthorized){
        saveActivated.value = true;
    }
    else{
        saveActivated.value = false;
    }
})
const emit = defineEmits<{
  (e: 'onClose'): void
  (e:'OnAdd',paymentAccount:PaymentAccount):void
}>()

 const closed = ()=>{
  emit('onClose');
 }
const save = async()=>{
    try {
        isSubmitting.value = true;
        const newPaymentAccount = await PaymentAccountService.addPaymentAccount({
            is_default:state.defaultSet,
            iban:state.iban,
            account_holder:state.accountHolder,
            account_id:props.accountId,
            payment_method:PaymentMethods.bankAccount,
            confirmation_checked:state.paymentAuthorized
        })
        emit('OnAdd',newPaymentAccount);
    } catch (err) {
        error.value = err;
        useBugsnag().notify(err);
    }
    finally{
        isSubmitting.value = false
    }
}
</script>
