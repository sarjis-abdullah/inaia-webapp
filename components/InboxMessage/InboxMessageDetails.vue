<template>
    <section v-if="thisMessage?.id && !messageLoading" class="border border-gray-200 p-6">
        <article class="grid gap-2">
            <header>
                <h3 class="text-3xl font-medium leading-6 text-gray-900">
                    {{ thisMessage.title }}
                </h3>
                <h6 class="text-base font-medium leading-6 text-gray-900 mt-2">
                    {{ formatDateByMoment(thisMessage.created_at) }}
                </h6>
            </header>
            <div class="text-xl font-medium leading-6 text-gray-900">
                {{ thisMessage.summary }}
            </div>
            <div class="text-base mt-4" v-html="thisMessage.message_text"></div>
        </article>
        <section v-if="thisMessage?.documents?.length" class="mt-4">
            <header class="text-base font-medium leading-6 text-gray-900">Documents</header>
            <section class="mt-2 text-sm text-gray-900">
                <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li v-for="doc in thisMessage.documents"
                        class="flex items-center justify-between py-4 pl-4 pr-5 leading-6">
                        <div class="flex w-0 flex-1 items-center">
                            <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                <span class="truncate font-base">
                                    {{ doc.display_text ?? "Attachment" }}
                                </span>
                            </div>
                        </div>
                        <div class="ml-4 flex-shrink-0">
                            <a :href="doc.document.link" target="_blank"
                                class="font-medium text-blue-600 hover:text-blue-500">
                                <EyeIcon class="h-5 w-5" />
                            </a>
                        </div>
                    </li>
                </ul>
            </section>
        </section>
    </section>
    <section v-else-if="messageLoading" class="flex justify-center items-center h-[50vh]">
        <Loading />
    </section>
    <p class="mt-2 text-sm text-red-600 text-center" v-if="errorText">{{ errorText }}</p>
</template>
  
<script setup>
import { ref, computed, watch } from 'vue'
import { PaperClipIcon, EyeIcon } from '@heroicons/vue/20/solid'
import Loading from '@/components/common/Loading.vue';
import { InboxMessageService } from '@/lib/services/index';
import { formatDateByMoment } from '@/lib/Formatters';
import {getMessageFromError} from '@/helpers/ApiErrorResponseHandler';
import { AccountStorage } from '@/storage';

const props = defineProps({
    selectedMessage: {
        type: Object,
        required: true,
        default: () => ({})
    }
})
const messageLoading = ref(true)
const thisMessage = ref({})
const errorText = ref("")

//computed
const accountId = computed(() => AccountStorage.getAccountId());
//functions
const loadData = async () => {
    if (!props.selectedMessage.is_read && props.selectedMessage.id) {
        messageLoading.value = true

        try {
            thisMessage.value = await InboxMessageService.getSingleInboxMessage(props.selectedMessage.id, accountId.value);
            errorText.value = ""
        } catch (error) {
            console.error(error);
            errorText.value = getMessageFromError(error)
            
        } finally {
            messageLoading.value = false
        }
    } else {
        thisMessage.value = props.selectedMessage
        messageLoading.value = false
    }
}

//watchers
watch(props, () => {
    loadData()
}, { deep: true, immediate: true })
</script>