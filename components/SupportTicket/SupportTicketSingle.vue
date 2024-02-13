<template>
    <li @click="setSelectedTicket(ticket)" :class="`${showSelectedInURL ? 'bg-blue-100' : ''}`"
        class="grid gap-1 items-center text-sm leading-6 cursor-pointer p-2" style="grid-template-columns: 14% 60% 24%;">
        <picture>
            <img class="h-12 w-12 rounded-full"
                src="https://s3.eu-central-1.amazonaws.com/staging-storage.inaia.cloud/profile/1706132271-Mahdi.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIARXODEP55RFK2VQOH%2F20240207%2Feu-central-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20240207T052840Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=21600&amp;X-Amz-Signature=1dc24ae7baf9808bc627a7f6d39d348c5993ec93b4d754f06285781fd7c3c96a"
                alt="">
        </picture>
        <div class="grid gap-2">
            <div class="truncate text-sm">
                {{ ticket.name }}
            </div>
            <div class="truncate text-base font-bold">
                {{ ticket.subject }}
            </div>
        </div>
        <div class="grid gap-2 justify-end">
            <div>
                <SupportTicketStatus v-if="ticket?.support_status?.name_translation_key"
                    :status='ticket.support_status.name_translation_key' class="mr-2">
                    {{ $t(ticket.support_status.name_translation_key) }}
                </SupportTicketStatus>
            </div>
            <div class="text-gray-400 hover:text-gray-500">
                {{ formatDateByMoment(ticket.created_at, dateFormat2) }}
            </div>
        </div>
    </li>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue'
import SupportTicketStatus from './SupportTicketStatus.vue';
import { formatDateByMoment, dateFormat2 } from '@/lib/Formatters';
const {t,locale} = useI18n();
const router = useRouter();
const route = useRoute()
//emits
const emit = defineEmits<{
    setSelectedTicket: [any: {}]
}>()
//props
const props = defineProps({
    ticket: {
        type: Object,
        default: () => ({})
    },
})
//computed props
const showSelectedInURL = computed(()=> {
    return props.ticket.id == route.query.id
})

//functions
const setSelectedTicket = (ticket = {}) => {
    const url = '/' + locale.value + '/support-tickets?id=' + ticket.id;
    router.push(url)
    emit("setSelectedTicket", ticket)
}

</script>