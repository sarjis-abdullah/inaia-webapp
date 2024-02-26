<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import defaultImage from '@/assets/img/defaultAvatar.png';
import { PencilIcon } from '@heroicons/vue/20/solid';

//emits
const emit = defineEmits<{
    onSelectAvatar: [String: {}]
}>()
//props
const props = defineProps({
    avatarUrl: {
        type: String,
        default: ""
    },
    className: {
        type: String,
        default: "h-20 w-20"
    },
    iconClass: {
        type: String,
        default: "top-[4px]"
    }
})
const photoPreview: Ref<string | ArrayBuffer | null> = ref(null);
const photoInput: Ref<string | ArrayBuffer | null> = ref(null);
const defaultAvatar = computed(() => {
    return photoPreview.value ?? props.avatarUrl ?? defaultImage
});

const selectNewPhoto = () => photoInput.value.click()

const updatePhotoPreview = () => {
    const photo = photoInput.value.files[0];

    if (!photo) return;

    const reader = new FileReader();

    reader.onload = (e: any) => photoPreview.value = e.target.result

    reader.readAsDataURL(photo);
};

watch(photoPreview, (currentValue) => {
    if (currentValue) {
        emit('onSelectAvatar', photoPreview.value)
    }
})
</script>

<template>
    <div class="col-span-6 sm:col-span-4 z-[1]">
        <input ref="photoInput" type="file" class="hidden" accept=".svg,.jpg,.png,.gif" @change="updatePhotoPreview">
        <div class="mt-2 relative cursor-pointer" :class="className" @click.prevent="selectNewPhoto">
            <img v-if="!photoPreview" :src="defaultAvatar" :alt="'user.name'"
                class="rounded-full object-cover border opacity-70 hover:opacity-90" :class="className">

            <span v-else class="block rounded-full bg-cover bg-no-repeat bg-center border" :class="className"
                :style="'background-image: url(\'' + photoPreview + '\');'" />
            <svg :class="iconClass" class="h-5 w-5 absolute left-[85%] translate-x-[-50%] translate-y-[-50%] opacity-100 hover:opacity-70"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path>
            </svg>
        </div>
</div></template>
