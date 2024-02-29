<template>
    <div class="text-center text-lg text-rose-400">
        {{ $t(props.message) }}
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    message:{
        default: ""
    }
})
</script> 