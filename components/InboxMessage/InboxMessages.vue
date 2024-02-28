<template>
    <ul v-if="hasMessages && !messageLoading" role="list"
        class="divide-y divide-gray-200 rounded-md border border-gray-200 max-h-[83vh] overflow-y-auto">
        <li v-for="(message, index) in messages" :key="index" @click="setSelectedMessage(message)"
            :class="`${selectedMessage.id == message.id ? 'bg-blue-100' : ''}`"
            class="flex justify-between py-4 pl-4 pr-5 text-sm leading-6 cursor-pointer">
            <div class="flex w-0 flex-1 items-center">
                <div class="grid gap-2">
                    <div class="truncate font-medium">
                        {{ message.title }}
                    </div>
                    <div class="truncate text-gray-400">
                        {{ message.summary }}
                    </div>
                </div>
            </div>
            <div class="ml-8 flex flex-col justify-end items-end gap-4">
                <div v-if="!message.is_read" class="w-2 h-2 rounded-full bg-blue-700"></div>
                <div href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                    {{ formatDateByMoment(message.created_at) }}
                </div>
            </div>
        </li>
        <li v-if="moreToCome" class="py-4 pl-4 pr-5 cursor-pointer" @click.prevent="loadMoreInboxMessages">
            <div class="text-blue-500 text-sm text-center mt-3">
                <a v-if="!loadMore">{{ $t('see_more') }}</a>
                <span v-else>
                    <Loading></Loading>
                </span>
            </div>
        </li>
    </ul>
    <div v-else-if="noNewMessages" class="flex items-center min-h-[83vh]">
        <p>
            {{ $t('you_have_no_message_yet') }}
        </p>
    </div>
    <ul v-else role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200">
        <li>
            <ListSkeleton />
        </li>
    </ul>
    <p class="mt-2 text-sm text-red-600 text-center" v-if="errorText">{{ errorText }}</p>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue'
import ListSkeleton from '@/components/common/ListSkeleton.vue'
import Loading from '@/components/common/Loading.vue'
import Pagination from '@/components/common/Pagination.vue';
import { InboxMessageService } from '@/lib/services/index';
import { formatDateByMoment } from '@/lib/Formatters';
import {getMessageFromError} from '@/helpers/ApiErrorResponseHandler';
import { AccountStorage } from '@/storage';
//emits
const emit = defineEmits<{
  setSelectedMessage: [any: {}]
}>()
//data variables
const messages = ref([])
const selectedMessage = ref({})
const messageLoading = ref(false);
//pagination data variables
const page = ref(1);
const perPage = ref(7);
const loadMore = ref(false);
const moreToCome = ref(true);
const errorText = ref("");
const noNewMessages = ref(false);

//computed
const queryParams = computed(() => {
    const params = { page: page.value, perPage: perPage.value }

    return params
})
const hasMessages = computed(() => {
    return !!(messages.value && messages.value.length)
})
const accountId = computed(() => AccountStorage.getAccountId());

//functions
const loadData = async () => {
    if (!loadMore.value) {
        messageLoading.value = true
    }

    try {
        if (accountId.value) {
            let data = await InboxMessageService.getInboxMessages(accountId.value, queryParams.value);
            page.value = data.currentPage + 1;
            moreToCome.value = data.currentPage < data.lastPage;
            if (data?.data?.length) {
                messages.value = [...messages.value, ...data.data];
            }else{
                noNewMessages.value = true
            }
            if (messages.value?.length && !selectedMessage.value.id) {
                setSelectedMessage(messages.value[0])
            }
        }
        errorText.value = ""
    } catch (error) {
        console.error(error);
        errorText.value = getMessageFromError(error)
    } finally {
        messageLoading.value = false
        loadMore.value = false;
    }
}

const loadMoreInboxMessages = async () => {
    loadMore.value = true;
    loadData()
}

const setSelectedMessage = (message = {}) => {
    emit("setSelectedMessage", message)
    selectedMessage.value = message
}

//onmounted
onMounted(() => {
    loadData()
})
</script>