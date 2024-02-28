<template>
    <div class=" bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 class="text-center mb-8 text-2xl text-gary-900">{{ $t('inboxMessages') }}</h2>
        <section class="grid grid-cols-1-2 gap-4" v-if="!emptyMessages">
            
            <section>
                <InboxMessages @setSelectedMessage="selectMessage" @emptyMessage="(val)=>emptyMessages = val"/>
            </section>
            <section>
                <InboxMessageDetails :selectedMessage="selectedMessage" />
            </section>
        </section>
        <div v-else class="min-h-[83vh]">
        <p class="text-center">
            <img src="~/assets/img/icons/Ghost.png" alt="empty inbox" class="w-32 h-auto mb-5 mx-auto"/>
            {{ $t('you_have_no_message_yet') }}
        </p>
    </div>
</div>
</template>
  
<script setup>
import {ref} from 'vue'
import InboxMessageDetails from './InboxMessageDetails.vue'
import InboxMessages from './InboxMessages.vue'
//data variables
const selectedMessage = ref({})
const emptyMessages = ref(false)
//functions
const selectMessage = (message) => {
    selectedMessage.value = message
}

</script>