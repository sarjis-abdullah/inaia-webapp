<template>
    <div class="bg-green-200 text-green-700 ring-green-600/20" :class="statusClass" v-if="status == SupportTicketStatusList.new">
        <slot></slot>
    </div>
    <div class="bg-red-200 text-red-700 ring-red-600/20" :class="statusClass" v-else-if="status == SupportTicketStatusList.closed">
        <slot></slot>
    </div>
    <div class="bg-blue-200 text-blue-700 ring-blue-600/20" :class="statusClass" v-else-if="status == SupportTicketStatusList.open || status == SupportTicketStatusList.has_new_answer">
        <slot></slot>
    </div>
    <div class="bg-green-200 text-green-700 ring-green-600/20" :class="statusClass" v-else-if="status == SupportTicketStatusList.has_new_message">
        <slot></slot>
    </div>
    <div class="default" :class="statusClass" v-else>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import {ref, PropType} from 'vue'
import { SupportTicketStatusList } from '@/lib/contants/index'
defineProps({
    status:{
        type: String as PropType<SupportTicketStatusList>,
        required: true
    }
})
const statusClass = 'inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset '
</script>