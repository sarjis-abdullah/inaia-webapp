<template>
    <section class="grid" style="grid-template-columns: 4fr 7fr;">
        <section>
            <SupportTickets :updatedTicket="updatedTicket" @setSelectedTicket="setSelectedTicket" />
        </section>
        <section class="relative border-b border-r">
            <SupportTicketSingleDetails @updateTicketData="updateTicketData" :ticket="selectedTicket" />
        </section>
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SupportTickets from '@/components/SupportTicket/SupportTickets.vue'
import SupportTicketSingleDetails from '@/components/SupportTicket/SupportTicketSingleDetails.vue'

//data variables
const selectedTicket = ref({})
const updatedTicket = ref({})

//functions
const setSelectedTicket = (ticket = {}) => {
    selectedTicket.value = ticket
}
const updateTicketData = (ticket = {}) => {
    updatedTicket.value = ticket
}

</script>