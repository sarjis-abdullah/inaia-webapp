<template>
    <section class="grid grid-cols-1-2 gap-4">
        <section>
            <InboxMessages @setSelectedMessage="selectMessage"/>
        </section>
        <section>
            <InboxMessageDetails :selectedMessage="selectedMessage" />
        </section>
    </section>
</template>
  
<script setup>
import InboxMessageDetails from './InboxMessageDetails.vue'
import InboxMessages from './Index.vue'

import {ref} from 'vue'

//data variables
const selectedMessage = ref({})

//functions
const selectMessage = (message) => {
    selectedMessage.value = message
    window?.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

</script>