<template>
    <Listbox as="div" v-model="selectedPaymentMethod">
                                <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{
                                    $t('payment_method') }}</ListboxLabel>
                                <div class="relative mt-2">
                                    <ListboxButton
                                        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
                                        <span class="block truncate">{{
                                            selectedPaymentMethod ? $t(selectedPaymentMethod) : $t('select') }}</span>
                                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </ListboxButton>

                                    <transition leave-active-class="transition ease-in duration-100"
                                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <ListboxOptions
                                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            <ListboxOption as="template" v-for="method in paymentMethods" :key="method.id"
                                                :value="method.name_translation_key" v-slot="{ active, selected }">
                                                <li
                                                    :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                                    <span
                                                        :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                                            $t(method.name_translation_key) }}</span>

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
import { PaymentMethod } from '@/lib/models';
import {PaymentMethodsService} from '@/lib/services'
import {watch,Ref} from 'vue'
const selectedPaymentMethod = ref(null);
const paymentMethods :Ref<Array<PaymentMethods>> = ref([]);
const emit = defineEmits<{
  (e: 'onPaymentMethodSet',paymentMethod:string): void
}>()
watch(selectedPaymentMethod,()=>{
    if(selectedPaymentMethod){
        emit('onPaymentMethodSet',selectedPaymentMethod.value)
    }
})
onMounted(async ()=>{
    try{
         paymentMethods.value = await PaymentMethodsService.getTheListOfPaymentMethods();
         if(paymentMethods.value && paymentMethods.value.length == 1){
            emit('onPaymentMethodSet',paymentMethods.value[0])
         }
        }
        catch(err){
            useBugsnag().notify(err);
        }
})
</script>