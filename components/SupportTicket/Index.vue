<template>
    <div class=" bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 class="text-center mb-8 text-2xl text-gary-900">{{ $t('supportTickets') }}</h2>
    <section class="grid" style="grid-template-columns: 4fr 7fr;">
        <section>
            <SupportTickets :updatedTicket="updatedTicket" @setSelectedTicket="setSelectedTicket" />
        </section>
        <section class="relative min-h-[75vh]">
            <SupportTicketSingleDetails @updateTicketData="updateTicketData" :ticket="selectedTicket" />
        </section>
    </section>
</div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import SupportTickets from '@/components/SupportTicket/SupportTickets.vue'
import SupportTicketSingleDetails from '@/components/SupportTicket/SupportTicketSingleDetails.vue'
import { SupportTicket } from '@/lib/models';

//data variables
const selectedTicket: Ref<SupportTicket> = ref({} as SupportTicket)
const updatedTicket: Ref<SupportTicket> = ref({} as SupportTicket)

//functions
const setSelectedTicket = (ticket: SupportTicket) => {
    selectedTicket.value = ticket
}
const updateTicketData = (ticket: SupportTicket) => {
    updatedTicket.value = ticket
}

</script>