<template>
    <li @click="setSelectedTicket(ticket)" :class="`${showSelectedInURL ? 'bg-blue-100' : ''}`"
        class="grid gap-1 items-center text-sm leading-6 cursor-pointer p-2" style="grid-template-columns: 70% 30%;">
        
        <div class="truncate text-base font-semibold">
                {{ ticket.subject }}
            </div>
        <div class="flex flex-col justify-end items-end w-full pr-2">
            <div>
                <SupportTicketStatus v-if="ticket?.support_status?.name_translation_key"
                    :status='ticket.support_status.name_translation_key' >
                    {{ $t(ticket.support_status.name_translation_key) }}
                </SupportTicketStatus>
            </div>
            <div class="text-gray-400 text-xs mt-1">
                {{ formatDateByMoment(ticket.created_at, dateFormat2) }}
            </div>
        </div>
    </li>
</template>
  
<script setup lang="ts">
import {computed } from 'vue'
import SupportTicketStatus from '@/components/SupportTicket/SupportTicketStatus.vue';
import { formatDateByMoment, dateFormat2 } from '@/lib/Formatters';
import { type SupportTicket } from '@/lib/models';
const {t,locale} = useI18n();
const router = useRouter();
const route = useRoute()
//emits
const emit = defineEmits<{
    setSelectedTicket: [SupportTicket: {}]
}>()
//props
const props = defineProps({
    ticket: {
        type: Object as PropType<SupportTicket>,
        default: () => ({})
    },
})
//computed props
const showSelectedInURL = computed(()=> {
    return Number(props.ticket.id) == Number(route.query.id)
})

//functions
const setSelectedTicket = (ticket: SupportTicket) => {
    const url = '/' + locale.value + '/support-tickets?id=' + ticket.id;
    router.push(url)
    emit("setSelectedTicket", ticket)
}

</script>