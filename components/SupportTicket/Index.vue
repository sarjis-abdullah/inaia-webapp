<template>
    <section class="grid" style="grid-template-columns: 4fr 7fr;">
        <section>
            <SupportTickets @setSelectedTicket="setSelectedTicket" />
        </section>
        <section class="border-b border-r">
            <section v-if="selectedTicket?.id" class="border-t border-b border-r p-[.7rem] mb-4">
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
                            <div class="hover:bg-blue-200 py-2 px-1 rounded-md">
                                <EllipsisVerticalIcon class="w-5 h-5" />
                            </div>
                        </div>
                    </section>
                </section>
            </section>
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

//data variables
const selectedTicket = ref({})

//functions
const setSelectedTicket = (ticket) => {
    selectedTicket.value = ticket
}

</script>