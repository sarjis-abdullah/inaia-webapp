<template>
    <Listbox as="div" v-model="selectedConfirmationMethod">
                                <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{
                                    $t('confirmationMethod') }}</ListboxLabel>
                                <div class="relative mt-2">
                                    <ListboxButton
                                        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
                                        <span class="block truncate">{{
                                            selectedConfirmationMethod ? selectedConfirmationMethod.translated_name : $t('select') }}</span>
                                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </ListboxButton>

                                    <transition leave-active-class="transition ease-in duration-100"
                                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <ListboxOptions
                                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            <ListboxOption as="template" v-for="method in confirmationMethods"
                                                :key="method.id" :value="method" v-slot="{ active, selected }">
                                                <li
                                                    :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                                    <span
                                                        :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                                            method.translated_name }}</span>

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
import {  AssetTradingService } from "@/lib/services";
import { type ConfirmationMethod } from '@/lib/models';
import { AccountStorage } from '@/storage';
import { ChannelTypes, ConfirmationMethods } from '@/lib/contants'
import { validatePhoneNumber,validateEmail} from '@/lib/utils/Validators'
const selectedConfirmationMethod:Ref<ConfirmationMethod> = ref(null);
import { Ref } from 'vue';
const confirmationMethods : Ref<Array<ConfirmationMethod>> = ref([]);

const emit = defineEmits<{
  (e: 'onConfirmationMethodSet',confirmationMethod:ConfirmationMethod): void
}>()
watch(selectedConfirmationMethod,()=>{
    if(selectedConfirmationMethod){
        emit('onConfirmationMethodSet',selectedConfirmationMethod.value)
    }
})
onMounted(async ()=>{
    try{
        const account = AccountStorage.getAccount();
        let hasPin = false;
        let hasEmail = false;
        let hasPhoneNumber = false;
        if(account){
            hasPin = account.account.has_pin;
            account.channels.forEach(channel=>{
                if(channel.type.name_translation_key == ChannelTypes.email){
                    hasEmail = validateEmail(channel.value)
                }
                if(channel.type.name_translation_key == ChannelTypes.mobile){
                    hasPhoneNumber = validatePhoneNumber(channel.value)
                }
            })
        }
         const data  = await AssetTradingService.getConfirmationMethods();
         if(data && data.length > 0){
            if(!hasPin){
                let index = data.findIndex(m=>m.name_translation_key == ConfirmationMethods.mobilePin)
                data.splice(index,1);
            }
            if(!hasEmail){
                let index = data.findIndex(m=>m.name_translation_key == ConfirmationMethods.email)
                data.splice(index,1);
            }
            if(!hasPhoneNumber){
                let index = data.findIndex(m=>m.name_translation_key == ConfirmationMethods.sms)
                data.splice(index,1);
            }
            confirmationMethods.value = data;
         }
        }
        catch(err){
            useBugsnag().notify(err);
        }
})
</script>