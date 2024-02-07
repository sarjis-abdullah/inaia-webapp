<template>
    <ul v-if="hasTickets && !ticketLoading" role="list"
        class="divide-y divide-gray-200 rounded-md border border-gray-200 max-h-screen overflow-y-auto">
        <li v-for="(ticket, index) in tickets" :key="index" @click="setselectedTicket(ticket)"
            :class="`${selectedTicket.id == ticket.id ? 'bg-blue-100' : ''}`"
            class="grid gap-1 items-center text-sm leading-6 cursor-pointer p-2"
            style="grid-template-columns: 14% 63% 21%;">
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
import { SupportTicketService } from '@/lib/services/index';
import { formatDateByMoment, dateFormat2 } from '@/lib/Formatters';
import { getMessageFromError } from '@/helpers/ApiErrorResponseHandler';
import { AccountStorage } from '@/storage';
//emits
const emit = defineEmits<{
    setselectedTicket: [any: {}]
}>()
//data variables
const tickets = ref([])
const groupedMessages = ref([])
const selectedTicket = ref({})
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
        if (true) {
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
                // data.data.forEach((element,index)=>{
                //     const creationDate = moment(element.created_at);
                //     const pureDate = moment({year:creationDate.get('year'),month:creationDate.get('month'),date:creationDate.get('date')});
                //     let goupMessage = groupedMessages.value.find(x=>pureDate.isSame(x.date));
                //     if(goupMessage)
                //     {
                //         if (!goupMessage?.messages?.length) {
                //             goupMessage.messages = []
                //         }
                //         goupMessage.messages.push(element);
                //     }
                //     else
                //     {
                //         groupedMessages.value.push({
                //             id:index,
                //             date:pureDate,
                //             messages:[element]
                //         })
                //     }
                // })
                // messages.value = [...messages.value, ...data.data];
            }
            // if (messages.value?.length && !selectedTicket.value.id) {
            //     setselectedTicket(messages.value[0])
            // }
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

const setselectedTicket = (ticket = {}) => {
    // emit("setselectedTicket", ticket)
    // selectedTicket.value = ticket
    // window?.scrollTo({
    //     top: 0,
    //     behavior: 'smooth',
    // });
}

//onmounted
onMounted(() => {
    loadData()
})
</script>