<template>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="close()">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Trading</DialogTitle>
                    <div class="mt-2 grid grid-cols-1 divide-y">
                        <NuxtLink :to="'/'+lang+'/trading/buy'" class="text-gray-700 group flex items-start px-4 py-2 hover:bg-gray-200">
                          <img src="./../assets/img/icons/gold_purchase.png" class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 mr-2"/>
                          <div class="text-left">
                            <div>{{ $t('buy_assets') }}</div>
                            <div class="text-sm text-gray-500">{{ $t('buyGoldParagraph') }}</div>
                          </div>
                        </NuxtLink>
                      <NuxtLink :to="'/'+lang+'/trading/sell'" class="text-gray-700 group flex items-start px-4 py-2 hover:bg-gray-200">
                        <img src="./../assets/img/icons/gold_sell.png" class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 mr-2"/>
                        <div class="text-left">
                          <div>{{ $t('sell_assets') }}</div>
                          <div class="text-sm text-gray-500">{{ $t('sellGoldParagraph') }}</div>
                        </div>
                      </NuxtLink>
                      <NuxtLink :to="'/'+lang+'/trading/delivery'" class="text-gray-700 group flex items-start px-4 py-2 hover:bg-gray-200">
                      <img src="./../assets/img/icons/gold_delivery.png" class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 mr-2"/>
                      <div class="text-left">
                        <div>{{ $t('gold_delivery') }}</div>
                        <div class="text-sm text-gray-500">{{ $t('goldDeliveryPhrase') }}</div>
                      </div>
                      </NuxtLink>
                      <NuxtLink :to="'/'+lang+'/trading/transfer'" class="text-gray-700 group flex items-start px-4 py-2 hover:bg-gray-200">
                      <img src="./../assets/img/icons/gold_sell.png" class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 mr-2"/>
                      <div class="text-left">
                        <div>{{ $t('asset_transfer') }}</div>
                        
                      </div>
                      
                      </NuxtLink>
                    </div>
                  </div>
                </div>
                
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { CheckIcon } from '@heroicons/vue/24/outline'
  const {locale} = useI18n();
  const lang = computed(()=>{
    return locale.value
  });
  const props = defineProps({
    open:{
      default:false
    }
  })
  const emit = defineEmits<{
    (e: 'closed'): void
  }>()
  const close = ()=>{
    emit('closed');
  }
  </script>