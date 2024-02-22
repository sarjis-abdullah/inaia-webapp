<script setup lang="ts">
import { onMounted, ref, inject, Ref } from 'vue';
import { AccountService } from '@/lib/services';
import { AccountStorage } from '@/storage';
import defaultImage from '@/assets/img/defaultAvatar.png';
import Loading from '@/components/common/Loading.vue';
import InLineApiError from '@/components/common/InLineApiError.vue';
import SelectAvatar from '@/components/common/SelectAvatar.vue';
import { Account } from '@/lib/models';

const updateProfileAvatarProvider = inject('updateProfileAvatarProvider', () => ({}))

const photoPreview = ref(null);
const account = ref(null);
const loading = ref(false);
const newAvatarCreated = ref(false);
const submitErr: Ref<string> = ref("");
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
        submitErr.value = error
    } finally {
        loading.value = false
    }
};

const handleOnSelectAvatar = (base_64_url: any)=> {
    photoPreview.value = base_64_url
}

onMounted(() => {
    account.value = AccountStorage.getAccount();
})
</script>

<template>
    <form @submit="updateProfileInformation" formId="updateProfileInfoForm">
        <div class="col-span-6 sm:col-span-4 z-[1]">
            <SelectAvatar v-if="account?.avatar" :avatarUrl="defaultAvatar" @onSelectAvatar="handleOnSelectAvatar"/>
            <Loading v-else className="rounded-full w-20 h-20"/>

            <div class="ml-4 mt-2" v-if="loading">
                <Loading/>
            </div>
            <button v-else-if="!loading && !newAvatarCreated" type="submit" v-show="photoPreview"  class="font-semibold text-blue-600 hover:text-blue-500 mt-2 ml-3">{{
                $t('update') }}
            </button>
        </div>
    </form>
    <InLineApiError :err="submitErr"/>
</template>
