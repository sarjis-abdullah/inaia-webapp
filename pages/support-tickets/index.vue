<template>
    <SupportTicket />
</template>
<script lang="ts" setup>
import SupportTicket from '@/components/SupportTicket/Index.vue';
definePageMeta({
    layout: "app-layout",
    middleware: ['protected']
});
</script>