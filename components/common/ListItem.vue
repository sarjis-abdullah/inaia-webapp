<template>
    <div class="px-0 py-2 flex">
        <div class="px-0 justify-center font-semibold">
            {{ props.title }}
        </div>
        <div class="px-0 text-sm text-right justify-center flex-1">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    title:{
        default:''
    }
})
</script>