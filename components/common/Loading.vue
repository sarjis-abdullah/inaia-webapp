<template>
    <span class="loading__anim" :class="className" :style="{width : width + 'px',height: height+'px'}"></span>
</template>
<script setup lang="ts">
const props = defineProps({
    height:{
             type:Number,
             default:35
         },
         width:{
             type:Number,
             default:35
         },
         className: {
            type: String,
            default: ""
         }
})
</script>
<style scoped>
    @keyframes rotate { to {  transform: rotate(1turn) }}
    .loading__anim {
        border-radius:50%;
        display: inline-block;
        border: 2px solid rgba(189,189,189 ,0.25);
        border-left-color: rgba(3,155,229 ,1);
        border-top-color: rgba(3,155,229 ,1);
        animation: rotate 600ms infinite linear;
        }
</style>