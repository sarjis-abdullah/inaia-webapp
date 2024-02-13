<template>
    <transition name="slide-fade">
        <div v-if="show" class="flex fixed top-[64px] right-0 bg-green-500 text-white p-4 z-50">
            <div>{{ message }}</div>
            <button @click="dismiss" class="ml-4 focus:outline-none">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </transition>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits<{
    "update:show": [any: {}]
}>()

//props
const props = defineProps({
    message: {
        type: String,
        default: ""
    },
    show: {
        type: Boolean,
        default: false
    },
})

const visible = ref(props.show);

const dismiss = () => {
    emit('update:show', false);
    visible.value = false;
};

watch(props, () => {
    if (props.show) {
        setTimeout(() => {
            emit('update:show', false);
        }, 3000);
    }
}, { deep: true, immediate: false })

</script>
  
<style>
.slide-fade-enter-active {
    transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-fade-enter-from {
    transform: translateY(100%);
    opacity: 0;
}

.slide-fade-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.slide-fade-leave-active {
    transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-fade-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.slide-fade-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
</style>
  