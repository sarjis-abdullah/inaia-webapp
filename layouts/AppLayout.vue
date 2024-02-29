<template>
  <div class="min-h-full">
    <TradingModal :open="showTrading" @closed="closeTrading" />
    <Disclosure as="nav" class="bg-blue-700" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <NuxtLink :to="'/'+lang+'/dashboard'" class="flex flex-row"><img class="h-8 w-24 cursor-pointer" src="~/assets/img/logo/logo_contrast.png" alt="INAIA GmbH" />
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
                <Menu as="div" class="relative inline-block text-left" v-if="isVerified">
                  <div>
                    <MenuButton
                      class="text-white hover:bg-blue-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium flex">
                      {{ $t('trading') }}
                      <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </MenuButton>
                  </div>

                  <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                        <NuxtLink :to="'/'+lang+'/trading/buy'"
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                          <img src="./../assets/img/icons/gold_purchase.png" class="h-5 w-5 flex-shrink-0 rounded-full bg-gray-300 mr-2"/>
                          {{ $t('buy_assets') }}
                        </NuxtLink>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <NuxtLink :to="'/'+lang+'/trading/sell'"
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                          <img src="./../assets/img/icons/gold_sell.png" class="h-5 w-5 flex-shrink-0 rounded-full bg-gray-300 mr-2"/>
                          {{ $t('sell_assets') }}
                        </NuxtLink>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <NuxtLink :to="'/'+lang+'/trading/delivery'"
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                          <img src="./../assets/img/icons/gold_delivery.png" class="h-5 w-5 flex-shrink-0 rounded-full bg-gray-300 mr-2"/>
                          {{ $t('gold_delivery') }}
                          </NuxtLink>
                        </MenuItem>
                      </div>
                      <div class="py-1">

                        <MenuItem v-slot="{ active }">
                          <NuxtLink :to="'/'+lang+'/trading/transfer'"
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                          <img src="./../assets/img/icons/gold_sell.png" class="h-5 w-5 flex-shrink-0 rounded-full bg-gray-300 mr-2"/>
                          {{ $t('asset_transfer') }}
                          </NuxtLink>
                        </MenuItem>
                      </div>

                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </div>
          <div class="hidden md:flex items-center">
            <div class="hover:bg-blue-500 hover:bg-opacity-75 relative rounded-full bg-blue-700 p-2 text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 cursor-pointer">
                <span v-if="newInboxMessageCount"
                  class="absolute top-[-4px] right-[-2px] h-4 w-4 text-[10px] text-blue-700 text-center rounded-full bg-white ">
                  {{ newInboxMessageCount }}
                </span>
                <span class="sr-only">View Inbox Messages</span>

                <InboxIcon @click="gotoInboxMessage" class="h-6 w-6" aria-hidden="true" />
              </div>
              <div @click="gotoSupport" class="hover:bg-blue-500 hover:bg-opacity-75 cursor-pointer relative rounded-full bg-blue-700 p-2 text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                  <span v-if="newSupportTicketAnswerCount" class="absolute top-[-10px] right-[-2px] h-4 w-4 text-[10px] text-blue-700 rounded-full bg-white ">
                    {{ newSupportTicketAnswerCount }}
                  </span>
                  <span class="sr-only">View Support Messages</span>
                    <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 13.973V10.7297C20 9.452 19.7483 8.18679 19.2594 7.00632C18.7704 5.82586 18.0537 4.75326 17.1502 3.84977C16.2467 2.94628 15.1741 2.2296 13.9937 1.74063C12.8132 1.25167 11.548 1 10.2703 1C8.99253 1 7.72732 1.25167 6.54685 1.74063C5.36639 2.2296 4.29379 2.94628 3.3903 3.84977C2.48681 4.75326 1.77012 5.82586 1.28116 7.00632C0.792194 8.18679 0.540527 9.452 0.540527 10.7297V13.973" stroke="#D3E4FF" stroke-linecap="round"/>
                    <path d="M0.540541 13.9732V13.4326H0V13.9732H0.540541ZM0.540541 14.5137H3.78378V13.4326H0.540541V14.5137ZM4.32432 15.0542V18.2975H5.40541V15.0542H4.32432ZM1.08108 18.2975V13.9732H0V18.2975H1.08108ZM2.7027 19.9191C2.27262 19.9191 1.86016 19.7483 1.55604 19.4441C1.25193 19.14 1.08108 18.7276 1.08108 18.2975H0C0 19.0143 0.284748 19.7017 0.791603 20.2086C1.29846 20.7154 1.9859 21.0002 2.7027 21.0002V19.9191ZM4.32432 18.2975C4.32432 18.7276 4.15348 19.14 3.84936 19.4441C3.54525 19.7483 3.13278 19.9191 2.7027 19.9191V21.0002C3.4195 21.0002 4.10695 20.7154 4.6138 20.2086C5.12066 19.7017 5.40541 19.0143 5.40541 18.2975H4.32432ZM3.78378 14.5137C3.92714 14.5137 4.06463 14.5706 4.166 14.672C4.26737 14.7734 4.32432 14.9109 4.32432 15.0542H5.40541C5.40541 14.6242 5.23456 14.2117 4.93044 13.9076C4.62633 13.6035 4.21386 13.4326 3.78378 13.4326V14.5137ZM20 13.9732H20.5405V13.4326H20V13.9732ZM16.7568 14.5137H20V13.4326H16.7568V14.5137ZM19.4595 13.9732V18.2975H20.5405V13.9732H19.4595ZM16.2162 18.2975V15.0542H15.1351V18.2975H16.2162ZM17.8378 19.9191C17.4078 19.9191 16.9953 19.7483 16.6912 19.4441C16.3871 19.14 16.2162 18.7276 16.2162 18.2975H15.1351C15.1351 19.0143 15.4199 19.7017 15.9267 20.2086C16.4336 20.7154 17.121 21.0002 17.8378 21.0002V19.9191ZM19.4595 18.2975C19.4595 18.7276 19.2886 19.14 18.9845 19.4441C18.6804 19.7483 18.2679 19.9191 17.8378 19.9191V21.0002C18.5546 21.0002 19.2421 20.7154 19.7489 20.2086C20.2558 19.7017 20.5405 19.0143 20.5405 18.2975H19.4595ZM16.7568 13.4326C16.3267 13.4326 15.9142 13.6035 15.6101 13.9076C15.306 14.2117 15.1351 14.6242 15.1351 15.0542H16.2162C16.2162 14.9109 16.2732 14.7734 16.3745 14.672C16.4759 14.5706 16.6134 14.5137 16.7568 14.5137V13.4326Z" fill="#D3E4FF"/>
                  </svg>
                </div>
                <Menu as="div" class="relative ml-3">
                  <div>
                    <MenuButton class="flex max-w-xs items-center rounded-full bg-blue-600 text-sm focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                      <span class="sr-only">Open user menu</span>
                      <img v-if="updatedAvatar || avatar || defaultAvatar" class="h-8 w-8 rounded-full" :src="updatedAvatar || avatar || defaultAvatar" alt="" />
                      <div v-else class="h-8 w-8 rounded-full"><Loading/></div>
                    </MenuButton>
                  </div>
                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                        <a @click="item.action" class="cursor-pointer" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</a>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <Menu as="div" class="relative inline-block text-left" v-if="isVerified">
                  <div>
                    <MenuButton
                      class="text-white bg-blue-600 hover:bg-blue-500 hover:bg-opacity-75 px-3 py-3 rounded-md text-sm font-medium flex mr-3">
                      <PlusIcon class=" mr-1 h-5 w-5" aria-hidden="true" />
                      {{ $t('trading') }}
                      
                    </MenuButton>
                  </div>

                  <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                        <NuxtLink :to="'/'+lang+'/trading/buy'"
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                          <img src="./../assets/img/icons/gold_purchase.png" class="h-5 w-5 flex-shrink-0 rounded-full bg-gray-300 mr-2"/>
                          {{ $t('buy_assets') }}
                        </NuxtLink>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <NuxtLink :to="'/'+lang+'/trading/sell'"
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                          <img src="./../assets/img/icons/gold_sell.png" class="h-5 w-5 flex-shrink-0 rounded-full bg-gray-300 mr-2"/>
                          {{ $t('sell_assets') }}
                        </NuxtLink>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <NuxtLink :to="'/'+lang+'/trading/delivery'"
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                          <img src="./../assets/img/icons/gold_delivery.png" class="h-5 w-5 flex-shrink-0 rounded-full bg-gray-300 mr-2"/>
                          {{ $t('gold_delivery') }}
                          </NuxtLink>
                        </MenuItem>
                      </div>
                      <div class="py-1">

                        <MenuItem v-slot="{ active }">
                          <NuxtLink :to="'/'+lang+'/trading/transfer'"
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                          <img src="./../assets/img/icons/gold_sell.png" class="h-5 w-5 flex-shrink-0 rounded-full bg-gray-300 mr-2"/>
                          {{ $t('asset_transfer') }}
                          </NuxtLink>
                        </MenuItem>
                      </div>

                    </MenuItems>
                  </transition>
                </Menu>
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md bg-blue-600 p-2 text-blue-200 hover:bg-blue-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
            :class="[item.current ? 'bg-blue-900 text-white' : 'text-white hover:bg-blue-500 hover:bg-opacity-75', 'block px-3 py-2 rounded-md text-base font-medium cursor-pointer']"
            :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>

        </div>

        <div class="border-t border-blue-700 pt-4 pb-3">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="avatar" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-white">{{ name }}</div>
              <div class="text-sm font-medium text-blue-300">{{ email }}</div>
            </div>
            <button type="button"
              class="relative ml-auto flex-shrink-0 rounded-full bg-blue-600 p-1 text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              <span class="sr-only">View Inbox Messages</span>
              <span v-if="newInboxMessageCount"
                class="absolute top-[-10px] right-[-4px] h-4 w-4 text-[10px] text-blue-700 rounded-full bg-white text-center">
                {{ newInboxMessageCount }}
              </span>
              <InboxIcon @click="gotoInboxMessage" class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" @click.prevent="item.action"
              class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-500 hover:bg-opacity-75 cursor-pointer">
              {{ item.name }}
            </DisclosureButton>
          </div>
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
  import Footer from '@/components/Footer.vue';
  import Loading from '@/components/common/Loading.vue';
import { Account } from '~~/lib/models/Account';
import { computed,onMounted,Ref,provide } from 'vue';
import { AccountService } from '~~/lib/services/AccountService';
import { AccountStorage } from '~~/storage/AccountStorage';
import TradingModal from '@/components/TradingModal';
import LogoutHelper from '~~/helpers/LogoutHelper';
import defaultAvatar from '@/assets/img/defaultAvatar.png';
const user:Ref<Account>= ref(null);
const updatedAvatar = ref();
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
onMounted(async () => {
  const account = AccountStorage.getAccount();
  if (account) {
    user.value = account;
  }
  else {
    const contactId = AccountStorage.getContactId();
    user.value = await AccountService.getAccount(parseInt(contactId));
  }

})
const isVerified = computed(() => {
  if (user.value) {
    return user.value.is_verified;
  }
  else {
    return false;
  }
})
const route = router.currentRoute.value.name?.toString();
const lang = computed(()=>{
  return locale.value
})
const pageName = computed(() => {
  if (route?.includes('depot-detail')) {
    return 'depot_detail'
  }
  return 'dashboard'
})
const newInboxMessageCount = computed(() => {
  if (user.value?.account?.new_inbox_message_count) {
    return user.value.account.new_inbox_message_count
  }
  return 0
})
const newSupportTicketAnswerCount  = computed(()=>{
    if(user.value?.account?.new_support_ticket_answer_count){
      return user.value.account.new_support_ticket_answer_count
    }
    return 0
  })
const showTrading = ref(false);
const openTrading = () => {
  showTrading.value = true;
}
const closeTrading = () => {
  showTrading.value = false;
}
const avatar = computed(() => {
  let avatar = '';
  if (user && user.value && user.value.avatar) {
    avatar = user.value.avatar;
  }
  return avatar;
})
const email = computed(() => {
  let email = "";
  if (user.value) {
    user.value.channels.forEach(channel => {
      if (channel.type.value == "email") {
        email = channel.value;
      }
    })
  }
  return email;
})
const name = computed(() => {
  let name = "";
  if (user.value) {
    name = user.value.name;
    if (user.value.person_data) {
      name += ' ' + user.value.person_data.middlename ? user.value.person_data.middlename : '' + ' ' + user.value.person_data.surname;
    }
  }
  return name;
})
const navigation = [
  {
    name: t('dashboard'), action: () => {
      const url = "http://" + window.location.host + '/' + locale.value + '/dashboard';
      window.open(url, '_self');
    }, current: false
  },
]
const userNavigation = [
  {
    name: t('your_profile'), action: () => {
      router.push("/" + locale.value + '/profile')
    }
  },
  {
    name: t('sign_out'), action: () => {
      LogoutHelper(router);
    } },
  ]
  const gotoInboxMessage = ()=> {
    const url = '/' + locale.value + '/inbox-message';
    router.push(url)
  }
  const gotoSupport = ()=> {
    const url = '/' + locale.value + '/support-tickets';
    router.push(url)
  }
  const updateProfileAvatarProvider =(account: Account)=> {
    updatedAvatar.value = account.avatar
  }
  provide('updateProfileAvatarProvider', updateProfileAvatarProvider);
  </script>
