<template>
  <div>
    <div class="grid grid-cols-3 gap-10 mt-10">
      <div class="col-span-2">

        <DepotHistoryChart :depot="depot" v-if="depot" />

      </div>
      <div class="">
        <SavingPlanDetail :depot="depot" class="mb-6" :isVerified="isVerified"/>
        <div class="flex flex-row justify-between items-center rounded-lg bg-white shadow p-3" v-if="depot && isVerified">
          <NuxtLink :to="'/' + lang + '/trading/buy/' + id"
            class="flex w-full cursor-pointer mx-1 justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            {{ $t('buy') }}</NuxtLink>
          <NuxtLink :to="tradeableAmount == 0 ? '' : '/' + lang + '/trading/sell/' + id"
            :class="['flex w-full cursor-pointer mx-1 justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2', tradeableAmount == 0 ? 'opacity-50' : 'opacity-100']">
            {{ $t('sell') }}</NuxtLink>
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton :disabled="tradeableAmount == 0"
                :class="['text-white flex w-full mx-1 justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2', tradeableAmount == 0 ? 'opacity-50' : 'opacity-100']">

                <Bars3Icon class="h-5 w-5" aria-hidden="true" />
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
                  <NuxtLink :to="tradeableAmount == 0 ? '' : '/' + lang + '/trading/delivery/' + id"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                    <img src="~/assets/img/icons/gold_delivery.png"
                      class="h-5 w-5 flex-shrink-0 rounded-full bg-gray-300 mr-2" />
                    {{ $t('gold_delivery') }}
                  </NuxtLink>
                  </MenuItem>
                </div>
                <div class="py-1">

                  <MenuItem v-slot="{ active }">
                  <NuxtLink :to="tradeableAmount == 0 ? '' : '/' + lang + '/trading/transfer/' + id"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                    <img src="~/assets/img/icons/gold_sell.png"
                      class="h-5 w-5 flex-shrink-0 rounded-full bg-gray-300 mr-2" />
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
    <DepotOrders :depot="depot" v-if="depot" class="mt-6" />
  </div>
</template>
<script lang="ts" setup>
import { Ref, ref, onMounted } from 'vue';
import { Account, Depot } from '@/lib/models';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, ChevronDownIcon, InboxIcon } from '@heroicons/vue/24/outline';
import DepotDetails from '@/components/Assets/DepotDetails';
import DepotHistoryChart from '@/components/Assets/DepotHistoryChart';
import SavingPlanDetail from '@/components/Assets/SavingPlanDetail';
import DepotOrders from '@/components/Orders/DepotOrders';
import { AssetsService } from '~~/lib/services';
import { AccountStorage } from '~~/storage';
definePageMeta({
  layout: "app-layout",
  middleware: ['protected'],
});
const { t, locale } = useI18n();
const route = useRoute();
const id = route.params.id;
const depot: Ref<Depot | null> = ref(null);
const loadingData = ref(false);
const account :Ref<Account> = ref(null)
const lang = computed(() => {
  return locale.value
})
const isVerified = computed(() => {
  
  if (account?.value) {
    return account.value.is_verified;
  }
  else {
    return false;
  }
})
const tradeableAmount = computed(() => {
  if (depot.value) {
    return depot.value.gram_amount - depot.value.gram_amount_pending_orders
  }
  else {
    return 0
  }
})
onMounted(async () => {
  try {
    loadingData.value = true
      account.value = AccountStorage.getAccount();
    depot.value = await AssetsService.getDepotDetails(id);
  }
  catch (err) {
    loadingData.value = false
  }
})
</script>