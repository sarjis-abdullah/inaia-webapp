<script setup>
import { onMounted, ref, reactive } from 'vue';
import { CameraIcon } from '@heroicons/vue/20/solid';
import { AccountService } from '@/lib/services';
import { AccountStorage } from '@/storage';

const props = defineProps({
    readonly: {
        type: Boolean,
        default: false
    },
});

const photoPreview = ref(null);
const photoInput = ref(null);
const defaultImage = "https://s3.eu-central-1.amazonaws.com/staging-storage.inaia.cloud/profile/1708588713-Mahdi.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARXODEP55RFK2VQOH%2F20240222%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240222T093452Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Signature=45d02c6b0374b30c0f3c4a970a93e01ddf34bd079837bc616dfce7e3f6f8e372"
const contactId = computed(() => AccountStorage.getContactId());
const payload = computed(() => {
    return {
        avatar: photoPreview.value
    }
});

const updateProfileInformation = async(e) => {
    e.preventDefault();
    await AccountService.updateProfile(contactId.value, payload.value)
};

const selectNewPhoto = () => photoInput.value.click()

const updatePhotoPreview = () => {
    const photo = photoInput.value.files[0];

    if (!photo) return;

    const reader = new FileReader();

    reader.onload = e => photoPreview.value = e.target.result

    reader.readAsDataURL(photo);
};

const deletePhoto = () => {
    console.log("delete");
    // Inertia.delete(route('current-user-photo.destroy'), {
    //     preserveScroll: true,
    //     onSuccess: () => {
    //         photoPreview.value = null;
    //         clearPhotoFileInput();
    //     },
    // });
};

const clearPhotoFileInput = () => {
    if (photoInput.value?.value)
        photoInput.value.value = null;
};
</script>

<template>
    <div v-if="readonly">
        <img class="h-8 w-8 rounded-full" src="" alt="">
    </div>
    <form @submit="updateProfileInformation" formId="updateProfileInfoForm">

        <!-- Profile Photo -->
        <div class="col-span-6 sm:col-span-4">
            <!-- Profile Photo File Input -->
            <input ref="photoInput" type="file" class="hidden" accept=".svg,.jpg,.png,.gif" @change="updatePhotoPreview">

            <!--                <JetLabel for="photo" value="Photo" />-->

            <!-- Current Profile Photo -->
            <div class="mt-2 relative">
                <img v-if="!photoPreview" :src="defaultImage" :alt="'user.name'" class="rounded-full h-20 w-20 object-cover">

                <span v-else class="block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center"
                    :style="'background-image: url(\'' + photoPreview + '\');'" />
                <button
                    class="absolute rounded-full left-0 top-0 h-20 w-20 bg-gray-900 text-white font-semibold opacity-50 hover:text-white hover:font-semibold hover:opacity-50 hover:border hover:border-sukuuk-main"
                    type="button" @click.prevent="selectNewPhoto">
                    <CameraIcon class="h-5 w-5 mx-auto"></CameraIcon>
                </button>
            </div>

            <!-- New Profile Photo Preview -->
            <button type="submit"  v-show="photoPreview" class="mt-2">
               Update
            </button>


            <!-- <button v-if="user.profile_photo_path" type="button" class="mt-2" @click.prevent="deletePhoto">
                Remove Photo
            </button> -->

            <!-- <p :message="form.errors.photo" class="mt-2" /> -->
        </div>
    </form>
</template>
