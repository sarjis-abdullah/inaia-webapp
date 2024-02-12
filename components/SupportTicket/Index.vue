<template>
    <section class="grid" style="grid-template-columns: 4fr 7fr;">
        <section>
            <SupportTickets @setSelectedTicket="setSelectedTicket" />
        </section>
        <section class="relative border-b border-r">
            <SupportTicketSingleDetails :ticket="selectedTicket" />
        </section>
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SupportTickets from './SupportTickets.vue'
import SupportTicketSingleDetails from './SupportTicketSingleDetails.vue'

//data variables
const selectedTicket = ref({})

//functions
const setSelectedTicket = (ticket = {}) => {
    selectedTicket.value = ticket
}

</script>