<template>
    <div class="min-h-full">
      <TradingModal :open="showTrading" @closed="closeTrading"/>
      <Disclosure as="nav" class="bg-blue-700 sticky top-0" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img class="h-8 w-24" src="~/assets/img/logo/logo.png" alt="INAIA GmbH" />
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a v-for="item in navigation" :key="item.name" @click="item.action" :class="[item.current ? 'bg-blue-800 text-white' : 'text-white hover:bg-blue-500 hover:bg-opacity-75', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">
                    {{ item.name }}
                    
                </a>
                <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="text-white hover:bg-blue-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium flex">
        Trading
        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
              <PencilSquareIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              Buy assets
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
              <DocumentDuplicateIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              Sell assets
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
              <ArchiveBoxIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              Gold delivery
            </a>
          </MenuItem>
        </div>
        <div class="py-1">
          
          <MenuItem v-slot="{ active }">
            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
              <ArrowRightCircleIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              Money transfer
            </a>
          </MenuItem>
        </div>
        
      </MenuItems>
    </transition>
  </Menu>
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <div class="cursor-pointer relative rounded-full bg-blue-700 p-1 text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                  <span v-if="newInboxMessageCount" class="absolute top-[-10px] right-[-4px] h-4 w-4 text-[10px] text-blue-700 rounded-full bg-white p-[2px]">
                    {{ newInboxMessageCount }}
                  </span>
                  <span class="sr-only">View Inbox Messages</span>
                  
                  <InboxIcon @click="gotoInboxMessage" class="h-6 w-6" aria-hidden="true" />
                </div>
                <div @click="gotoSupport" class="cursor-pointer relative rounded-full bg-blue-700 p-1 text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                  <span v-if="newSupportTicketAnswerCount" class="absolute top-[-10px] right-[-4px] h-4 w-4 text-[10px] text-blue-700 rounded-full bg-white p-[2px]">
                    {{ newSupportTicketAnswerCount }}
                  </span>
                  <span class="sr-only">View Support Messages</span>
                  
                  <svg fill="white" class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>headphones</title><path d="M12,1C7,1 3,5 3,10V17A3,3 0 0,0 6,20H9V12H5V10A7,7 0 0,1 12,3A7,7 0 0,1 19,10V12H15V20H18A3,3 0 0,0 21,17V10C21,5 16.97,1 12,1Z" /></svg>
                </div>
  
                <!-- Profile dropdown -->
                <Menu as="div" class="relative ml-3">
                  <div>
                    <MenuButton class="flex max-w-xs items-center rounded-full bg-blue-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                      <span class="sr-only">Open user menu</span>
                      <img class="h-8 w-8 rounded-full" :src="updatedAvatar ?? avatar" alt="" />
                    </MenuButton>
                  </div>
                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                        <a @click="item.action" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</a>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <button type="button" @click="openTrading" class="inline-flex mr-4 items-center rounded-md border border-blue-900 bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"><PlusIcon class="h-6 w-6" aria-hidden="true" />Trading</button>
              <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-blue-600 p-2 text-blue-200 hover:bg-blue-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                <span class="sr-only">Open main menu</span>
                <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>
  
        <DisclosurePanel class="md:hidden">
          <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-blue-900 text-white' : 'text-white hover:bg-blue-500 hover:bg-opacity-75', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
            
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
              <button type="button" class="relative ml-auto flex-shrink-0 rounded-full bg-blue-600 p-1 text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                <span class="sr-only">View Inbox Messages</span>
                <span v-if="newInboxMessageCount" class="absolute top-[-10px] right-[-4px] h-4 w-4 text-[10px] text-blue-700 rounded-full bg-white p-[2px]">
                {{ newInboxMessageCount }}
                </span>
                <InboxIcon @click="gotoInboxMessage" class="h-6 w-6" aria-hidden="true" />
              </button>
              <button type="button" @click="gotoSupport" class="cursor-pointer relative rounded-full bg-blue-700 p-1 text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                  <span v-if="newSupportTicketAnswerCount" class="absolute top-[-10px] right-[-4px] h-4 w-4 text-[10px] text-blue-700 rounded-full bg-white p-[2px]">
                    {{ newSupportTicketAnswerCount }}
                  </span>
                  <span class="sr-only">View Support Messages</span>
                  
                  <svg fill="white" class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>headphones</title><path d="M12,1C7,1 3,5 3,10V17A3,3 0 0,0 6,20H9V12H5V10A7,7 0 0,1 12,3A7,7 0 0,1 19,10V12H15V20H18A3,3 0 0,0 21,17V10C21,5 16.97,1 12,1Z" /></svg>
                </button>
            </div>
            <div class="mt-3 space-y-1 px-2">
              <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" @click.prevent="item.action" class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-500 hover:bg-opacity-75">
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
            <slot/>
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
import { Account } from '~~/lib/models/Account';
import { computed,onMounted,Ref,provide } from 'vue';
import { AccountService } from '~~/lib/services/AccountService';
import { AccountStorage } from '~~/storage/AccountStorage';
import TradingModal from '@/components/TradingModal';
import LogoutHelper from '~~/helpers/LogoutHelper';
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
onMounted(async ()=>{
    const contactId = AccountStorage.getContactId();
    user.value = await AccountService.getAccount(parseInt(contactId));
})
  const route = router.currentRoute.value.name?.toString();
  const pageName  = computed(()=>{
    if(route?.includes('depot-detail')){
      return 'depot_detail'
    }
    return 'dashboard'
  })
  const newInboxMessageCount  = computed(()=>{
    if(user.value?.account?.new_inbox_message_count){
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
  const openTrading = ()=>{
    showTrading.value = true;
  }
  const closeTrading = ()=>{
    showTrading.value = false;
  }
  const avatar = computed(()=>{
    let avatar = '';
    if(user && user.value && user.value.avatar){
      avatar = user.value.avatar;
    }
    return avatar;
  })
  const email = computed(()=>{
    let email = "";
    if(user.value){
       user.value.channels.forEach(channel=>{
        if(channel.type.value == "email"){
            email = channel.value;
        }
       }) 
    }
    return email;
  })
 const name = computed(()=>{
    let name = "";
    if(user.value){
        name = user.value.name;
        if(user.value.person_data){
            name+=' '+user.value.person_data.middlename?user.value.person_data.middlename:'' +' '+ user.value.person_data.surname;
        }
    }
    return name;
 })
  const navigation = [
    { name: t('dashboard'), action: ()=>{
      const url = "http://" + window.location.host + '/' +locale.value+'/dashboard';
      window.open(url,'_self');
    }, current: false },
  ]
  const userNavigation = [
    { name: t('your_profile'), action: ()=>{
      router.push("/"+locale.value+'/profile')
    } },
    { name: t('sign_out'), action: ()=>{
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
  const onUserProfileUpdate = (data)=> {
    console.log(data, "onUserProfileUpdate");
  }
  const updateProfileAvatarProvider =(account)=> {
    updatedAvatar.value = account.avatar
  }
  provide('updateProfileAvatarProvider', updateProfileAvatarProvider);
  </script>