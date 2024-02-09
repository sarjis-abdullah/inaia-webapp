<template>
    
    <section class="border-t border-b border-r p-[.7rem] mb-4">
        {{ selectedTicket }}
        <section class="flex justify-between">
            <section>
                <div>Client</div>
                <div>{{ selectedTicket.name }}</div>
            </section>
            <section>
                <div>{{ selectedTicket.subject }}</div>
                <div>{{ formatDateByMoment(selectedTicket.created_at, dateFormat2) }}</div>
            </section>
            <section class="flex items-center gap-1">
                <div>
                    <SupportTicketStatus v-if="selectedTicket?.support_status?.name_translation_key"
                        :status='selectedTicket.support_status.name_translation_key' class="mr-2">
                        {{ $t(selectedTicket.support_status.name_translation_key) }}
                    </SupportTicketStatus>
                </div>
                <div>
                    <div>
                        <Menu as="div" class="relative ml-3">
                            <div>
                                <MenuButton
                                    class="flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 hover:ring-offset-blue-100">
                                    <EllipsisVerticalIcon class="w-5 h-5" />
                                </MenuButton>
                            </div>
                            <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem v-slot="{ active }">
                                    <article @click="closeTicket"
                                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                                        class="flex gap-2">
                                        <div>
                                            <LockClosedIcon class="w-5 h-5" />
                                        </div>
                                        <div>
                                            <header class="font-bold">Close ticket</header>
                                            <p>by closing this ticket you won't be able to continue this
                                                conversation</p>
                                        </div>
                                    </article>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </section>
        </section>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import SupportTicketStatus from './SupportTicketStatus'
import { formatDateByMoment, dateFormat2 } from '@/lib/Formatters';
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { LockClosedIcon } from '@heroicons/vue/20/solid'

//props
const props = defineProps({
    ticket: {
        type: Object,
        default: () => ({})
    },
})
//data variables

//computed
const selectedTicket = computed(()=> props.ticket)
// const closeTicket = () => {
//     selectedTicket.value
// }

</script>