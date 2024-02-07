<template>
    <div v-if="!ticketLoading && hasGroupMessages">
        <div class="grid gap-4 max-h-[60vh] overflow-y-auto">
            <div v-for="(group, ind) in groupedMessages" :key="ind" class="">

                <div class="flex justify-center items-center mb-4">
                    <div class="text-center">{{ isDateIsCurrentDay(group.date) ? 'Today' : group.date }}</div>
                </div>

                <ul class="grid gap-4">
                    <li v-for="(item, index) in group.messages" :key="index">
                        <section class="w-[60%] rounded-lg p-4"
                            :class="item.created_by != accountId ? 'bg-blue-100 ml-auto' : 'bg-gray-100 mr-auto'">
                            <header class="font-bold text-base">
                                {{ getOwnerName(item.owner) }}
                            </header>
                            <div>
                                {{ item.message }}
                            </div>
                        </section>
                    </li>
                </ul>
            </div>
        </div>

        <div class="mt-4">
            <textarea type="text" class="bg-[#f5f5f5] w-full p-3 border-0" :placeholder="$t('write_answer')" rows="5"
                v-model="messageText"></textarea>
            <div class="flex justify-end">
                <button type="button" class="flex justify-end gap-2 mt-2 bg-[#0074d9] text-white px-2 py-3 rounded-sm"
                    @click="sendMessage" :disabled="true">
                    {{ $t('send_message') }}
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>send</title>
                        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <div v-if="!hasGroupMessages && !ticket.id" class="flex flex-col justify-center h-[50vh] items-center">
        <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>message-arrow-left-outline</title><path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2M20 16H5.2L4 17.2V4H20V16M16 11V9H11.5L13.3 7.2L12 6L8 10L12 14L13.2 12.8L11.5 11H16Z" /></svg>
        <div>{{ $t('select_ticket') }}</div>
    </div>
    <div v-if="ticketLoading" class="flex justify-center h-[50vh] items-center">
        <Loading />
    </div>
    <p class="mt-2 text-sm text-red-600 text-center" v-if="errorText">{{ errorText }}</p>
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
import { AccountStorage } from '@/storage';

//props
const props = defineProps({
    ticket: {
        type: Object,
        default: () => ({})
    },
})
//data variables
const groupedMessages = ref([])
const ticketLoading = ref(false);
const messageText = ref("");
const errorText = ref("");

//computed
const thisTicket = computed(() => props.ticket)
const hasGroupMessages = computed(() => (groupedMessages.value && groupedMessages.value.length))
const accountId = computed(() => AccountStorage.getAccountId());

//functions
function groupDataByDate(data) {
    const groupedData = [];
    let todayAdded = false;

    data.forEach(item => {
        const createdAt = moment(item.created_at);
        const formattedDate = createdAt.format('YYYY-MM-DD');
        const existingGroup = groupedData.find(group => group.date === formattedDate);
        if (existingGroup) {
            existingGroup.messages.push({ message: item.message, ...item });
        } else {
            groupedData.push({ date: formattedDate, messages: [{ message: item.message, ...item }] });
        }
    });

    return groupedData;
}
const loadData = async () => {
    ticketLoading.value = true
    try {
        let data = await SupportTicketService.getSingleSupportTicket(props.ticket.id);
        if (data?.id) {
            groupedMessages.value = groupDataByDate(data.messages)
        }
        errorText.value = ""
    } catch (error) {
        console.error(error);
        errorText.value = getMessageFromError(error)
    } finally {
        ticketLoading.value = false
    }
}

const sendMessage = () => {
    console.log(thisTicket.value, 134567);
}
const getOwnerName = (owner) => {
    let name = owner?.contact?.name ?? ""
    if (owner?.contact?.person_data) {
        name += ' ' + owner.contact?.person_data.surname
    }
    return name
}
const isDateIsCurrentDay = (date) => moment().isSame(date, 'day')

watch(props, () => {
    if (props?.ticket.id) {
        groupedMessages.value = []
        loadData()
    }
}, { deep: true, immediate: true })
</script>