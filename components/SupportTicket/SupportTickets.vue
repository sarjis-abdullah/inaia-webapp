<template>
    <ul v-if="hasTickets && !ticketLoading" role="list"
        class="divide-y divide-gray-200 rounded-md border border-gray-200 max-h-[80vh] overflow-y-auto">
        <SupportTicketSingle v-for="(ticket, index) in tickets" :key="index" :ticket="ticket" @setSelectedTicket="setSelectedTicket"/>
        <li v-if="moreToCome" class="py-4 pl-4 pr-5 cursor-pointer" @click.prevent="loadMoreTickets">
            <div class="text-blue-500 text-sm text-center mt-3">
                <a v-if="!loadMore">{{ $t('see_more') }}</a>
                <span v-else>
                    <Loading></Loading>
                </span>
            </div>
        </li>
    </ul>
    <ul v-else role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200">
        <li>
            <ListSkeleton />
        </li>
    </ul>
    <p class="mt-2 text-sm text-red-600 text-center" v-if="errorText">{{ errorText }}</p>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue'
import moment from 'moment'
import ListSkeleton from '@/components/common/ListSkeleton.vue'
import Loading from '@/components/common/Loading.vue'
import Pagination from '@/components/common/Pagination.vue';
import SupportTicketSingle from './SupportTicketSingle.vue';
import { SupportTicketService } from '@/lib/services/index';
import { formatDateByMoment, dateFormat2 } from '@/lib/Formatters';
import { getMessageFromError } from '@/helpers/ApiErrorResponseHandler';
import { AccountStorage } from '@/storage';
//emits
const emit = defineEmits<{
    setSelectedTicket: [any: {}]
}>()
//data variables
const tickets = ref([])
const ticketLoading = ref(false);
//pagination data variables
const page = ref(1);
const perPage = ref(10);
const loadMore = ref(false);
const moreToCome = ref(true);
const errorText = ref("");

//computed
const queryParams = computed(() => {
    const params = { page: page.value, perPage: perPage.value }

    return params
})
const hasTickets = computed(() => {
    return !!(tickets.value && tickets.value.length)
})
const accountId = computed(() => AccountStorage.getAccountId());

//functions
const loadData = async () => {
    if (!loadMore.value) {
        ticketLoading.value = true
    }

    try {
        let data = await SupportTicketService.getSupportTickets(queryParams.value);
        page.value = data.currentPage + 1;
        moreToCome.value = data.currentPage < data.lastPage;
        if (data?.data?.length) {
            tickets.value = [...tickets.value, ...data.data].map(ticket => {
                const getName = () => {
                    if (ticket && ticket.account && ticket.account.contact) {
                        let name = ticket.account.contact.name;
                        if (ticket.account.contact.person_data) {
                            name += ' ' + ticket.account.contact.person_data.surname;
                        }
                        return name;
                    }
                    return '';
                }
                return { ...ticket, name: getName() }
            });
        }
        errorText.value = ""
    } catch (error) {
        console.error(error);
        errorText.value = getMessageFromError(error)
    } finally {
        ticketLoading.value = false
        loadMore.value = false;
    }
}

const loadMoreTickets = async () => {
    loadMore.value = true;
    loadData()
}

const setSelectedTicket = (ticket = {}) => {
    emit("setSelectedTicket", ticket)
}

//onmounted
onMounted(() => {
    loadData()
})
</script>