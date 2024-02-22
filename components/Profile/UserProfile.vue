<script setup lang="ts">
import { onMounted, ref, inject } from 'vue';
import { CameraIcon } from '@heroicons/vue/20/solid';
import { AccountService } from '@/lib/services';
import { AccountStorage } from '@/storage';
import defaultImage from '@/assets/img/defaultAvatar.png';
import Loading from '@/components/common/Loading.vue';
import { Ref } from 'nuxt/dist/app/compat/capi';
import { Account } from '~~/lib/models';

const updateProfileAvatarProvider = inject('updateProfileAvatarProvider', () => ({}))

const photoPreview = ref(null);
const photoInput = ref(null);
const account = ref(null);
const loading = ref(false);
const newAvatarCreated = ref(false);
const errorText: Ref<string> = ref("");
const contactId = computed(() => AccountStorage.getContactId());
const payload = computed(() => {
    return {
        avatar: photoPreview.value
    }
});
const defaultAvatar = computed(() => {
    return photoPreview.value ?? account.value?.avatar ?? defaultImage
});

const updateProfileInformation = async (e) => {
    e.preventDefault();
    loading.value = true
    try {
        const result = await AccountService.updateProfile(contactId.value, payload.value)
        const obj: Account = {
            ...account.value,
            avatar: result.avatar
        }
        AccountStorage.saveAccount(obj);
        updateProfileAvatarProvider(result)
        newAvatarCreated.value = true
    } catch (error) {
        errorText.value = error
    } finally {
        loading.value = false
    }
};

const selectNewPhoto = () => photoInput.value.click()

const updatePhotoPreview = () => {
    const photo = photoInput.value.files[0];

    if (!photo) return;

    const reader = new FileReader();

    reader.onload = e => photoPreview.value = e.target.result

    reader.readAsDataURL(photo);

    newAvatarCreated.value = false
};

onMounted(() => {
    account.value = AccountStorage.getAccount();
})
</script>

<template>
    <form @submit="updateProfileInformation" formId="updateProfileInfoForm">
        <div class="col-span-6 sm:col-span-4">
            <input ref="photoInput" type="file" class="hidden" accept=".svg,.jpg,.png,.gif" @change="updatePhotoPreview">
            <div v-if="account?.avatar" class="mt-2 relative">
                <img v-if="!photoPreview" :src="defaultAvatar" :alt="'user.name'"
                    class="rounded-full h-20 w-20 object-cover">

                <span v-else class="block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center"
                    :style="'background-image: url(\'' + photoPreview + '\');'" />
                <button
                    class="absolute rounded-full left-0 top-0 h-20 w-20 bg-gray-900 text-white font-semibold opacity-50 hover:text-white hover:font-semibold hover:opacity-50 hover:border hover:border-sukuuk-main"
                    type="button" @click.prevent="selectNewPhoto">
                    <CameraIcon class="h-5 w-5 mx-auto"></CameraIcon>
                </button>
            </div>
            <Loading class="rounded-full w-20 h-20" v-else/>

            <div class="ml-4 mt-2" v-if="loading">
                <Loading/>
            </div>
            <button v-else-if="!loading && !newAvatarCreated" type="submit" v-show="photoPreview"  class="font-semibold text-blue-600 hover:text-blue-500 mt-2 ml-3">{{
                $t('update') }}
            </button>
        </div>
    </form>
</template>
