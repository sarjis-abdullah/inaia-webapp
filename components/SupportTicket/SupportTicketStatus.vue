<template>
    <div class="bg-[#1aae6f]" :class="statusClass" v-if="status == 'new'">
        <slot></slot>
    </div>
    <div class="bg-blue-500" :class="statusClass" v-else-if="status == 'closed'">
        <slot></slot>
    </div>
    <div class="bg-blue-500" :class="statusClass" v-else-if="status == 'open' || status == 'has_new_answer'">
        <slot></slot>
    </div>
    <div class="bg-red-500" :class="statusClass" v-else-if="status == 'has_new_message'">
        <slot></slot>
    </div>
    <div class="default" :class="statusClass" v-else>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        status: {
            class: String
        }
    },
    data() {
        return {
            statusClass: "text-white py-1 px-2 rounded-md text-xs"
        }
    },
}
</script>