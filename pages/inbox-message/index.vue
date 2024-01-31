<template>
    <InboxMessages />
</template>
<script lang="ts" setup>
import InboxMessages from '@/components/Message/InboxMessages.vue';
import { Ref } from 'vue';
definePageMeta({
    layout: "app-layout",
    middleware: ['protected']
});
</script>