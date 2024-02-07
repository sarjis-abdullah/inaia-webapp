<template>
    <li @click="setSelectedTicket()" :class="`${selectedTicket.id == ticket.id ? 'bg-blue-100' : ''}`"
        class="grid gap-1 items-center text-sm leading-6 cursor-pointer p-2" style="grid-template-columns: 14% 63% 21%;">
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
                <span
                    class="uppercase text-[#03acca] bg-[#aaedf9] inline-block text-center rounded-md py-[.35rem] px-[.375rem] text-xs">Answered</span>
            </div>
            <div class="text-gray-400 hover:text-gray-500">
                {{ formatDateByMoment(ticket.created_at, dateFormat2) }}
            </div>
        </div>
    </li>
</template>
  
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import moment from 'moment'
import ListSkeleton from '@/components/common/ListSkeleton.vue'
import Loading from '@/components/common/Loading.vue'
import Pagination from '@/components/common/Pagination.vue';
import { SupportTicketService } from '@/lib/services/index';
import { formatDateByMoment, dateFormat2 } from '@/lib/Formatters';
import { getMessageFromError } from '@/helpers/ApiErrorResponseHandler';
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
//data variables
const selectedTicket = ref({})

//functions
const setSelectedTicket = () => {
    // selectedTicket.value = props.ticket
    emit("setSelectedTicket", props.ticket)
}

</script>