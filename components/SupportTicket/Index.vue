<template>
    <section class="grid grid-cols-1-2 gap-4">
        <section>
            <SupportTickets/>
        </section>
        <section>
            Ticket
        </section>
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SupportTickets from './SupportTickets'

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