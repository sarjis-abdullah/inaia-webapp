<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue';
import { CameraIcon } from '@heroicons/vue/20/solid';
import defaultImage from '@/assets/img/defaultAvatar.png';

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
        <div class="mt-2 relative cursor-pointer" @click.prevent="selectNewPhoto">
            <img v-if="!photoPreview" :src="defaultAvatar" :alt="'user.name'" class="rounded-full object-cover" :class="className">

            <span v-else class="block rounded-full bg-cover bg-no-repeat bg-center border" :class="className"
                :style="'background-image: url(\'' + photoPreview + '\');'" />
            <!-- <button
                class="absolute rounded-full left-0 top-0 h-20 w-20 bg-gray-900 text-white font-semibold opacity-50 hover:text-white hover:font-semibold hover:opacity-50 hover:border hover:border-sukuuk-main"
                type="button" >
                <CameraIcon class="h-5 w-5 mx-auto"></CameraIcon>
            </button> -->
        </div>
    </div>
</template>
