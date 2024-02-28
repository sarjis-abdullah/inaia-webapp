<template>
    <section v-if="thisTicket?.id" class="border-t border-b border-r p-[.7rem] mb-4">
        <section class="flex justify-between">
            <section>
                <div>
                    {{ $t('client') }}
                </div>
                <div>{{ formattedTicket?.name }}</div>
            </section>
            <section>
                <div>{{ thisTicket.subject }}</div>
                <div>{{ formatDateByMoment(thisTicket.created_at, dateFormat2) }}</div>
            </section>
            <section class="flex items-center gap-1">
                <div>
                    <SupportTicketStatus v-if="formattedTicket?.support_status?.name_translation_key"
                        :status='formattedTicket.support_status.name_translation_key' class="mr-2">
                        {{ $t(formattedTicket.support_status.name_translation_key) }}
                    </SupportTicketStatus>
                </div>
                <div>
                    <div>
                        <Menu as="div" class="relative ml-3">
                            <div>
                                <MenuButton
                                    class="flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 hover:ring-offset-blue-100">
                                    <EllipsisVerticalIcon class="w-5 h-5" />
                                </MenuButton>
                            </div>
                            <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem v-slot="{ active }">
                                    <article @click="confirmWarningTicketModal = !confirmWarningTicketModal"
                                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                                        class="flex gap-2 cursor-pointer">
                                        <div v-if="currentStatus != SupportTicketStatusList.closed">
                                            <LockClosedIcon class="w-5 h-5" />
                                        </div>
                                        <div>
                                            <header class="font-bold">
                                                {{ currentStatus != SupportTicketStatusList.closed ? $t('close_ticket') : $t('open_ticket') }}
                                            </header>
                                            <p v-if="currentStatus != SupportTicketStatusList.closed">{{ $t('close_ticket_message') }}</p>
                                            <p v-else>{{ $t('open_ticket_message') }}</p>
                                        </div>
                                    </article>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </section>
        </section>
    </section>
    <div v-if="!ticketLoading" class="m-4">
        <div v-if="hasGroupMessages" class="grid gap-4 overflow-y-auto mesaageListToScrollTarget"
            :class="shouldShowMessageBoxAndCloseTicket ? 'max-h-[40vh]' : 'max-h-[60vh]'" ref="mesaageListToScrollTarget">
            <div v-for="(group, ind) in groupedMessages" :key="ind" class="">

                <div class="flex justify-center items-center mb-4">
                    <div class="text-center">{{ isDateIsCurrentDay(group.date) ? $t('today') : group.date }}</div>
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
    </div>
    <div v-if="groupedMessages.length == 0"></div>
    <div v-else-if="!hasGroupMessages && !thisTicket?.id && !queryId" class="flex flex-col justify-center h-[50vh] items-center">
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
    <Modal :open="confirmWarningTicketModal" @onClose="toggleTicketClosing" :title="currentStatus != SupportTicketStatusList.closed ? $t('are_you_sure_you_want_to_close_ticket') : $t('are_you_sure_you_want_to_open_ticket')">
        <template v-slot:footer>
            <div class="flex justify-end gap-2 mt-4">
                <button @click="confirmWarningTicketModal = false" class="px-2 py-1 border-gray-300 rounded-md">
                    {{ $t('cancel') }}
                </button>
                <button v-if="!statusLoading" @click="updateSupportTicketStatus"
                    class="px-2 py-1 border-gray-300 rounded-md bg-blue-400 text-white">
                    {{ $t('ok') }}
                </button>
                <Loading v-else />
            </div>
        </template>
    </Modal>
    <form class="p-4 absolute bottom-0 w-full" v-if="shouldShowMessageBoxAndCloseTicket">
        <textarea type="text" class="bg-[#f5f5f5] w-full border-0" :placeholder="$t('write_answer')" rows="3"
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
    <Notification :show="showSnackbar" :title="$t('success')" :text="currentStatus != SupportTicketStatusList.closed ? $t('ticket_opened_successfully') : $t('ticket_closed_successfully')"
        :type="notificationType" @close="showSnackbar = false" />
</template>
  
<script setup lang="ts">
import { ref, computed, watch, Ref, PropType } from 'vue'
import moment from 'moment'
import Loading from '@/components/common/Loading.vue'
import Modal from '@/components/common/Modal.vue';
import Notification from '@/components/common/Notification.vue';
import SupportTicketStatus from '@/components/SupportTicket/SupportTicketStatus.vue';
import { SupportTicketService } from '@/lib/services/index';
import { formatDateByMoment, formatTime, dateFormat2 } from '@/lib/Formatters';
import { getMessageFromError } from '@/helpers/ApiErrorResponseHandler';
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import { AccountStorage } from '@/storage';
import { SupportTicket, SupportTicketMessage, SupportTicketStatus as SupportTicketStatusModel } from '@/lib/models';
import { useUserInfo } from '@/hooks/useUserInfo';
import { NotificationTypes } from '@/constants/NotificationTypes';
import { SupportTicketStatusList } from '@/lib/contants/index'
const route = useRoute()

//emits
const emit = defineEmits<{
    updateTicketData: [SupportTicket: {}]
}>()
//props
const props = defineProps({
    ticket: {
        type: Object as PropType<SupportTicket>,
        default: () => ({})
    },
})
interface GroupMessages {
    date: string;
    messages: SupportTicketMessage[];
}
//data variables
const groupedMessages: Ref<GroupMessages[]> = ref([])
const ticketLoading = ref(false);
const messageLoading = ref(false);
const confirmWarningTicketModal = ref(false);
const showSnackbar = ref(false);
const statusLoading = ref(false);
const mesaageListToScrollTarget = ref(null);
const messageText = ref("");
const errorText = ref("");
const statusList: Ref<SupportTicketStatusModel[]> = ref([]);
const thisTicket: Ref<SupportTicket|any> = ref(null)
//computed
const notificationType = computed(() => NotificationTypes.sucess)
const hasGroupMessages = computed(() => (groupedMessages.value && groupedMessages.value.length))
const accountId = computed(() => AccountStorage.getAccountId());
const formattedTicket = computed(() => {
    const user = thisTicket.value?.account?.contact ? useUserInfo(thisTicket.value.account.contact) : {}
    return {
        ...thisTicket.value,
        name: user?.fullName ?? ""
    }
});
const queryId = computed(() => route?.query?.id ?? null);
const messageData = computed(() => {
    return {
        created_by: accountId.value,
        message: messageText.value,
        support_ticket_id: props.ticket.id ?? queryId.value,
    }
});
const shouldShowMessageBoxAndCloseTicket = computed(() => {
    return thisTicket.value && thisTicket.value.support_status && thisTicket.value.support_status.name_translation_key != SupportTicketStatusList.closed
})
const statusListQueryParams = computed(() => {
    const params = { page: 1, perPage: 5 }

    return params
})
const currentStatus = computed(() => {
    return thisTicket.value?.support_status?.name_translation_key
})
const statusCanBeChangeTo = computed(() => {
    let updateAbleStatus = SupportTicketStatusList.open
    if (currentStatus.value != SupportTicketStatusList.closed) {
        updateAbleStatus = SupportTicketStatusList.closed
    }
    return statusList.value.find(s => s.name_translation_key == updateAbleStatus)
})
const payloadForChangeStatus = computed(() => {
    return {
        support_status_id: statusCanBeChangeTo.value?.id
    }
})

//functions
function groupDataByDate(data: Array<SupportTicketMessage>) {
    const groupedData: GroupMessages[] = [];

    data.forEach((item) => {
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
const loadData = async (id: number) => {
    ticketLoading.value = true
    try {
        let data = await SupportTicketService.getSingleSupportTicket(id);
        if (data?.id) {
            thisTicket.value = data
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

const isDateIsCurrentDay = (date: string) => moment().isSame(date, 'day')

const sendMessage = async () => {
    try {
        messageLoading.value = true
        let data = await SupportTicketService.sendMessageForSupportTicket(messageData.value);
        if (data?.id) {
            const formatDate = (createdAt = dateFormat2) => formatDateByMoment(createdAt, dateFormat2)
            const createdAT = data.created_at
            const checkCondition = (item: any) => formatDate(item.date) == formatDate(createdAT)
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
const updateSupportTicketStatus = async () => {
    try {
        statusLoading.value = true
        let data: any = await SupportTicketService.updateSupportTicketStatus(thisTicket.value.id, payloadForChangeStatus.value);
        if (data?.id) {
            thisTicket.value = {
                ...thisTicket.value,
                support_status: data.support_status,
                support_status_id: data.support_status_id,
            }
            emit("updateTicketData", thisTicket.value)
            showSnackbar.value = true
        }
        statusLoading.value = false
        errorText.value = ""
    } catch (error: any) {
        errorText.value = error.message ?? getMessageFromError(error)
    } finally {
        statusLoading.value = false
        confirmWarningTicketModal.value = false
    }
}
const loadSupportStatusList = async () => {
    try {
        statusLoading.value = true
        const object = {
            support_status_id: 5
        }
        let data = await SupportTicketService.getSupportTicketStatusList(statusListQueryParams.value);
        if (data?.data?.length) {
            statusList.value = data.data
        }
        statusLoading.value = false
        errorText.value = ""
    } catch (error: any) {
        errorText.value = error.message ?? getMessageFromError(error)
    } finally {
        statusLoading.value = false
        confirmWarningTicketModal.value = false
    }
}
const getOwnerName = (owner: any) => {
    const user = owner?.contact? useUserInfo(owner.contact) : {}
    return user?.fullName ?? ""
}
const scrollIntoView = () => {
    if (hasGroupMessages && mesaageListToScrollTarget.value) {
        const lastGroupMessage = groupedMessages.value[groupedMessages.value.length - 1]
        if (lastGroupMessage && lastGroupMessage.messages) {
            const messageLength = lastGroupMessage.messages.length
            const lastMessage = lastGroupMessage.messages[messageLength - 1]
            if (lastMessage && lastMessage.id) {
                const messageArea = document.querySelector("#message-" + lastMessage.id.toString());
                if (messageArea)
                    messageArea.scrollIntoView();
            }
        }

    }
}

const toggleTicketClosing = () => {
    confirmWarningTicketModal.value = false
}

watch(props, () => {
    if (props.ticket) {
        thisTicket.value = props.ticket
    }
    if (props?.ticket?.id) {
        groupedMessages.value = []
        thisTicket.value = props.ticket
        loadData(props.ticket.id)
    }else if (queryId.value) {
        loadData(queryId.value)
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

//mounted
onMounted(()=> {
    loadSupportStatusList()
})
</script>