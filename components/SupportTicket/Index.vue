<template>
    <section class="grid grid-cols-1-2 gap-4">
        <section>
            <SupportTickets @setSelectedTicket="setSelectedTicket"/>
        </section>
        <section>
            <SupportTicketSingleDetails :ticket="selectedTicket"/>
        </section>
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SupportTickets from './SupportTickets'
import SupportTicketSingleDetails from './SupportTicketSingleDetails'

//data variables
const selectedTicket = ref({})

//functions
const setSelectedTicket = (ticket) => {
    selectedTicket.value = ticket
}

</script>