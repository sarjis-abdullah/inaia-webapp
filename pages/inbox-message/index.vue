<template>
    <InboxMessage />
</template>
<script lang="ts" setup>
import InboxMessage from '@/components/InboxMessage/Index.vue';
import { Ref } from 'vue';
definePageMeta({
    layout: "app-layout",
    middleware: ['protected']
});
</script>