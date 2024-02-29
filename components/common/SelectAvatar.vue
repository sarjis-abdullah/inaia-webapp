<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import defaultImage from '@/assets/img/defaultAvatar.png';
import { PencilIcon } from '@heroicons/vue/20/solid';

//emits
const emit = defineEmits<{
    onSelectAvatar: [string: void]
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
    const photo = photoInput.value?.files[0];

    if (!photo) return;

    const reader = new FileReader();

    reader.onload = (e: Event) => {
        const target = e.target as FileReader;
        if(target.result)
            photoPreview.value = target.result
    }

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
                class="rounded-full object-cover border opacity-100 hover:opacity-70" :class="className">

            <span v-else class="block rounded-full bg-cover bg-no-repeat bg-center border" :class="className"
                :style="'background-image: url(\'' + photoPreview + '\');'" />
            
        </div>
</div></template>
