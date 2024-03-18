<template>
    <div class="min-h-full">

      <Disclosure as="nav" class="bg-blue-700" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <NuxtLink :to="'/'+locale+'/login'" class="flex flex-row"><img class="h-8 w-24 cursor-pointer" src="~/assets/img/logo/logo_contrast.png" alt="INAIA GmbH" />
                  <div class="text-white ml-2 text-sm">BETA</div>
                </NuxtLink>
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a v-for="item in navigation" :key="item.name" @click="item.action"
                    :class="[item.current ? 'bg-blue-800 text-white' : 'text-white hover:bg-blue-500 hover:bg-opacity-75', 'px-3 py-2 rounded-md text-sm font-medium cursor-pointer']"
                    :aria-current="item.current ? 'page' : undefined">
                    {{ item.name }}
  
                  </a>
                  
                </div>
              </div>
            </div>
           
           
          </div>
        </div>
  
        <DisclosurePanel class="md:hidden">
          <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
              :class="[item.current ? 'bg-blue-900 text-white' : 'text-white hover:bg-blue-500 hover:bg-opacity-75', 'block px-3 py-2 rounded-md text-base font-medium cursor-pointer']"
              :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
  
          </div>

        </DisclosurePanel>
      </Disclosure>
  
  
      <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <!-- Replace with your content -->
          <div class="px-4 py-4 sm:px-0">
            <slot />
          </div>
          <!-- /End replace -->
        </div>
      </main>
  
    </div>
  </template>
    
    <script setup lang="ts">
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { Bars3Icon, XMarkIcon,ChevronDownIcon, InboxIcon } from '@heroicons/vue/24/outline';
    import { PlusIcon } from '@heroicons/vue/20/solid'
  const {t,locale} = useI18n();
  const router = useRouter();
  useHead({
    htmlAttrs: {
      class: 'h-full bg-gray-50'
    },
    bodyAttrs: {
      class: 'h-full align-middle'
    }
  })
  const navigation = [
    {
      name: t('signIn'), action: () => {
        const url = "http://" + window.location.host + '/' + locale.value + '/login';
        window.open(url, '_self');
      }, current: false
    },
  ]
 
    
    
    </script>
  