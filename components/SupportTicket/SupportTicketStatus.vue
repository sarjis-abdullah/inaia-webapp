<template>
    <div class="bg-[#1aae6f]" :class="statusClass" v-if="status == SupportTicketStatusList.new">
        <slot></slot>
    </div>
    <div class="bg-red-500" :class="statusClass" v-else-if="status == SupportTicketStatusList.closed">
        <slot></slot>
    </div>
    <div class="bg-blue-500" :class="statusClass" v-else-if="status == SupportTicketStatusList.open || status == SupportTicketStatusList.has_new_answer">
        <slot></slot>
    </div>
    <div class="bg-[#1aae6f]" :class="statusClass" v-else-if="status == SupportTicketStatusList.has_new_message">
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
const statusClass = "text-white py-1 px-2 rounded-md text-xs"
</script>