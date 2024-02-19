<template>
    <ul role="list" class="border-t border-r border-l rounded-tl-md border-gray-200">
        <li class="p-4 cursor-pointer">
            <button v-if="!createTicketProcessing" @click="openCreateTicketModal = !openCreateTicketModal"
                class="flex justify-end gap-2 bg-[#0074d9] text-white px-2 py-2 rounded-md">
                {{ $t('create_ticket') }}
            </button>
            <Loading v-else></Loading>
        </li>
    </ul>

    <ul v-if="hasTickets && !ticketLoading" role="list"
        class="divide-y divide-gray-200 rounded-b-md border border-gray-200 max-h-[70vh] overflow-y-auto">
        <SupportTicketSingle v-for="(ticket, index) in formattedTickets" :key="index" :ticket="ticket"
            @setSelectedTicket="setSelectedTicket" />
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
    <Modal :open="openCreateTicketModal" @onClose="toggleCreateTicketModal" maxWidth="sm:max-w-2xl"
        :title="`${$t('new_ticket')}`">
        <form class="grid gap-4">
            <div class="flex flex-col gap-2">
                <div>{{ $t('subject') }}</div>
                <input type="text" name="subject" required v-model="subject"
                    class="block  w-full 10 pl-3 py-2 rounded-md border-gray-300" placeholder="Add a subject" />
            </div>
            <div class="flex flex-col gap-2">
                <div>{{ $t('message') }}</div>
                <textarea type="text" class="bg-[#f5f5f5] w-full border-gray-300 rounded-md"
                    :placeholder="$t('write_message')" rows="3" v-model="message"></textarea>
            </div>
        </form>
        <template v-slot:footer>
            <div class="flex justify-end gap-2 mt-4">
                <button @click="openCreateTicketModal = false" class="px-2 py-1 border-gray-300 rounded-md">Cancel</button>
                <button :disabled="(!message || !subject)" v-if="!createTicketProcessing" @click="createSupportTicket"
                    class="px-2 py-1 border-gray-300 bg-blue-500 text-white rounded-md">
                    {{ $t('send') }}
                </button>
                <Loading v-else />
            </div>
        </template>
    </Modal>
    <Notification :show="showSnackbar" :title="$t('success')" :text="$t('ticketCreatedSuccessfully')"
        :type="notificationType" @close="showSnackbar = false" />
</template>
  
<script setup lang="ts">
import { ref, computed, Ref } from 'vue'
import ListSkeleton from '@/components/common/ListSkeleton.vue'
import Loading from '@/components/common/Loading.vue'
import Notification from '@/components/common/Notification.vue'
import SupportTicketSingle from '@/components/SupportTicket/SupportTicketSingle.vue';
import Modal from '@/components/common/Modal.vue';
import { SupportTicketService } from '@/lib/services/index';
import { getMessageFromError } from '@/helpers/ApiErrorResponseHandler';
import { AccountStorage } from '@/storage';
import { SupportTicket } from '@/lib/models';
import { useUserInfo } from '@/hooks/useUserInfo';
import { NotificationTypes } from '@/constants/NotificationTypes';
//emits
const emit = defineEmits<{
    setSelectedTicket: [SupportTicket: {}]
}>()
//props
const props = defineProps({
    updatedTicket: {
        type: Object,
        default: () => ({})
    },
})
//data variables
const tickets: Ref<SupportTicket[]> = ref([])
const ticketLoading = ref(false);
const createTicketProcessing = ref(false);
const openCreateTicketModal = ref(false);
const showSnackbar = ref(false);
const subject = ref("");
const message = ref("");
//pagination data variables
const page = ref(1);
const perPage = ref(7);
const loadMore = ref(false);
const moreToCome = ref(true);
const errorText = ref("");

//computed
const notificationType = computed(() => NotificationTypes.sucess)
const queryParams = computed(() => {
    const params = { page: page.value, perPage: perPage.value }

    return params
})
const hasTickets = computed(() => {
    return !!(tickets.value && tickets.value.length)
})
const accountId = computed(() => AccountStorage.getAccountId());
const supportData = computed(() => {
    return {
        "account_id": accountId.value,
        "subject": subject.value,
        "message": message.value
    }
});
const formattedTickets = computed(() => {
    return tickets.value.map(ticket => {
        const account = ticket.account.contact ? useUserInfo(ticket.account.contact) : {}
        return { ...ticket, name: account?.fullName }
    });
});

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
            tickets.value = [...tickets.value, ...data.data]
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
const toggleCreateTicketModal = () => {
    createTicketProcessing.value = false
    openCreateTicketModal.value = false
    subject.value = ""
    message.value = ""
}

const createSupportTicket = async () => {
    createTicketProcessing.value = true

    try {
        let data = await SupportTicketService.createSupportTicket(supportData.value);
        if (data?.id) {
            tickets.value = [data, ...tickets.value]
        }
        showSnackbar.value = true
        errorText.value = ""
    } catch (error) {
        console.error(error);
        errorText.value = getMessageFromError(error)
    } finally {
        toggleCreateTicketModal()
    }
}

const loadMoreTickets = async () => {
    loadMore.value = true;
    loadData()
}

const setSelectedTicket = (ticket: SupportTicket) => {
    emit("setSelectedTicket", ticket)
}

//onmounted
onMounted(() => {
    loadData()
})

//wathers
watch(props, () => {
    if (props.updatedTicket?.id) {
        tickets.value = tickets.value.map(item => {
            if (item.id == props.updatedTicket.id) {
                return {
                    ...item,
                    support_status: props.updatedTicket.support_status,
                    support_status_id: props.updatedTicket.support_status_id,
                }
            }
            return item
        })
    }

}, { deep: true, immediate: false })
</script>