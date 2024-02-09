<template>
    <section class="grid" style="grid-template-columns: 4fr 7fr;">
        <section>
            <SupportTickets @setSelectedTicket="setSelectedTicket" />
        </section>
        <section class="border-b border-r">
            
            <SupportTicketSingleDetails :ticket="selectedTicket" />
        </section>
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SupportTickets from './SupportTickets'
import SupportTicketSingleDetails from './SupportTicketSingleDetails'
import SupportTicketStatus from './SupportTicketStatus'
import { formatDateByMoment, dateFormat2 } from '@/lib/Formatters';
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon, LockClosedIcon } from '@heroicons/vue/20/solid'

//data variables
const selectedTicket = ref({})

//functions
const setSelectedTicket = (ticket) => {
    selectedTicket.value = ticket
}

</script>