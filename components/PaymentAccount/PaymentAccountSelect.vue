<template>
    <Listbox as="div" v-model="selectedPaymentAccount">
                                <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{
                                    $t('bank_account') }}</ListboxLabel>
                                <div class="relative mt-2">
                                    <ListboxButton
                                        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
                                        <span class="block truncate">{{
                                            selectedPaymentAccount ? formatBankAccount(selectedPaymentAccount) : $t('select') }}</span>
                                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </ListboxButton>

                                    <transition leave-active-class="transition ease-in duration-100"
                                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <ListboxOptions
                                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            <ListboxOption as="template" v-for="account in paymentAccounts"
                                                :key="account.id" :value="account" v-slot="{ active, selected }">
                                                <li
                                                    :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                                    <span
                                                        :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                                            formatBankAccount(account) }}</span>

                                                    <span v-if="selected"
                                                        :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                </li>
                                            </ListboxOption>
                                        </ListboxOptions>
                                    </transition>
                            </div>
                        </Listbox>
</template>
<script lang="ts" setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import {  PaymentAccountService } from "@/lib/services";
import { type PaymentAccount } from '@/lib/models';
const selectedPaymentAccount:Ref<PaymentAccount> = ref(null);
import { Ref} from 'vue';
import { PaymentAccountSpecs } from '~~/lib/contants';
import { formatIban } from '@/lib/Formatters';
const paymentAccounts : Ref<Array<PaymentAccount>> = ref([]);
const formatBankAccount = (option:PaymentAccount)=>{
    let format = '';
    if(option && option.payment_account_specs.length > 0){
        let bankName = '';
        let iban = '';
        option.payment_account_specs.forEach(spec=>{
            if(spec.name == PaymentAccountSpecs.bank_name){
                    bankName = spec.value
                }
                if(spec.name == PaymentAccountSpecs.iban){
                    iban = formatIban(spec.value)
                }
        })
        return bankName + ' ' +iban
    }
    return format;
}
const emit = defineEmits<{
  (e: 'onPaymentAccountSet',paymentAccountId:PaymentAccount): void
}>()
watch(selectedPaymentAccount,()=>{
    if(selectedPaymentAccount){
        emit('onPaymentAccountSet',selectedPaymentAccount.value)
    }
})
onMounted(async ()=>{
    try{
         paymentAccounts.value = await PaymentAccountService.getClientPaymentAccounts();
         if(paymentAccounts.value && paymentAccounts.value.length > 0){
            paymentAccounts.value.forEach(account=>{
                if(account.is_default){
                    selectedPaymentAccount.value = account;
                }
            })
         }
        }
        catch(err){
            useBugsnag().notify(err);
        }
})
</script>