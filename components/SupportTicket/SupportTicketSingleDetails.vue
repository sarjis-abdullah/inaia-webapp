<template>
    <div v-if="!ticketLoading && hasGroupMessages" class="m-4">
        <div 
        class="grid gap-4 overflow-y-auto mesaageListToScrollTarget" 
        :class="shouldShowMessageBoxAndCloseTicket ? 'max-h-[40vh]' : 'max-h-[60vh]'" ref="mesaageListToScrollTarget">
            <div v-for="(group, ind) in groupedMessages" :key="ind" class="">

                <div class="flex justify-center items-center mb-4">
                    <div class="text-center">{{ isDateIsCurrentDay(group.date) ? 'Today' : group.date }}</div>
                </div>

                <ul class="grid gap-4">
                    <li v-for="(item, index) in group.messages" :key="index" :id="'message-' + item.id">
                        <section class="w-[60%] rounded-lg p-4"
                            :class="item.created_by == accountId ? 'bg-blue-100 ml-auto' : 'bg-gray-100 mr-auto'">
                            <header class="flex items-center gap-2">
                                <span class="font-bold text-base">{{ getOwnerName(item.owner) }}</span>
                                <span class="text-sm">
                                    {{ formatTime(item.created_at) }}
                                </span>
                            </header>
                            <div v-html="item.message"></div>
                        </section>
                    </li>
                </ul>
            </div>
        </div>

        <form class="mt-4" v-if="shouldShowMessageBoxAndCloseTicket">
            <textarea type="text" class="bg-[#f5f5f5] w-full p-3 border-0" :placeholder="$t('write_answer')" rows="3"
                v-model="messageText"></textarea>
            <div class="flex justify-end">
                <button v-if="!messageLoading" :disabled="messageLoading || !messageText" type="button"
                    class="flex justify-end gap-2 mt-2 bg-[#0074d9] text-white px-2 py-2 rounded-md" @click="sendMessage">
                    {{ $t('send_message') }}
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>send</title>
                        <path fill="white" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                    </svg>
                </button>
                <Loading v-else />
            </div>
        </form>
    </div>
    <div v-if="!hasGroupMessages && !ticket.id" class="flex flex-col justify-center h-[50vh] items-center">
        <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>message-arrow-left-outline</title>
            <path
                d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2M20 16H5.2L4 17.2V4H20V16M16 11V9H11.5L13.3 7.2L12 6L8 10L12 14L13.2 12.8L11.5 11H16Z" />
        </svg>
        <div>{{ $t('select_ticket') }}</div>
    </div>
    <div v-if="ticketLoading" class="flex justify-center h-[50vh] items-center">
        <Loading />
    </div>
    <p class="mt-2 text-sm text-red-600 text-center" v-if="errorText">{{ errorText }}</p>
</template>
  
<script setup>
import { ref, computed, watch } from 'vue'
import moment from 'moment'
import ListSkeleton from '@/components/common/ListSkeleton.vue'
import Loading from '@/components/common/Loading.vue'
import Pagination from '@/components/common/Pagination.vue';
import { SupportTicketService } from '@/lib/services/index';
import { formatDateByMoment, formatTime, dateFormat2 } from '@/lib/Formatters';
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
const messageLoading = ref(false);
const mesaageListToScrollTarget = ref(null);
const messageText = ref("");
const errorText = ref("");

//computed
const thisTicket = computed(() => props.ticket)
const hasGroupMessages = computed(() => (groupedMessages.value && groupedMessages.value.length))
const accountId = computed(() => AccountStorage.getAccountId());
const messageData = computed(() => {
    return {
        created_by: accountId.value,
        message: messageText.value,
        support_ticket_id: props.ticket.id,
    }
});
const shouldShowMessageBoxAndCloseTicket = computed(()=> {
    return props.ticket && props.ticket.support_status && props.ticket.support_status.name_translation_key != 'closed'
})

//functions
function groupDataByDate(data) {
    const groupedData = [];

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

const isDateIsCurrentDay = (date) => moment().isSame(date, 'day')

const sendMessage = async () => {
    try {
        messageLoading.value = true
        let data = await SupportTicketService.sendMessageForSupportTicket(messageData.value);
        if (data?.id) {
            const formatDate = (createdAt = dateFormat2) => formatDateByMoment(createdAt, dateFormat2)
            const createdAT = data.created_at
            const checkCondition = item => formatDate(item.date) == formatDate(createdAT)
            const found = groupedMessages.value.find(checkCondition)
            if (found) {
                groupedMessages.value = groupedMessages.value.map(item => {
                    if (formatDate(item.date) == formatDate(createdAT)) {
                        return {
                            ...item,
                            messages: [...item.messages, data]
                        }
                    }
                    return item
                })
            } else {
                groupedMessages.value = [...groupedMessages.value, { date: data.created_at, messages: [data] }]
            }
        }
        messageLoading.value = false
        errorText.value = ""
    } catch (error) {
        errorText.value = error.message ?? getMessageFromError(error)
    } finally {
        messageText.value = ""
        messageLoading.value = false
    }
}
const getOwnerName = (owner) => {
    let name = owner?.contact?.name ?? ""
    if (owner?.contact?.person_data) {
        name += ' ' + owner.contact?.person_data.surname
    }
    return name
}
const scrollIntoView = () => {
    if (hasGroupMessages && mesaageListToScrollTarget.value) {
        let lastGroupMessage = groupedMessages.value[groupedMessages.value.length - 1]
        if (lastGroupMessage && lastGroupMessage.messages) {
            const messageLength = lastGroupMessage.messages.length
            const lastMessage = lastGroupMessage.messages[messageLength - 1]
            console.log(lastMessage, "last message");
            var messageArea = document.querySelector("#message-" + lastMessage.id.toString());
            console.log(messageArea, "messageArea");
            if (messageArea)
                messageArea.scrollIntoView();
        }

    }
}

watch(props, () => {
    if (props?.ticket.id) {
        groupedMessages.value = []
        loadData()
    }
}, { deep: true, immediate: true })

watch(mesaageListToScrollTarget, () => {
    scrollIntoView()
}, { deep: false, immediate: true })

watch(groupedMessages, () => {
    setTimeout(() => {
        scrollIntoView()
    }, 100);
}, { deep: true, immediate: false })
</script>