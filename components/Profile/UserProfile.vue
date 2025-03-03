<script setup lang="ts">
import { onMounted, ref, inject, Ref } from 'vue';
import { AccountService } from '@/lib/services';
import { AccountStorage } from '@/storage';
import defaultImage from '@/assets/img/defaultAvatar.png';
import Loading from '@/components/common/Loading.vue';
import InLineApiError from '@/components/common/InLineApiError.vue';
import SelectAvatar from '@/components/common/SelectAvatar.vue';
import { type Account } from '@/lib/models';

//emits
const emit = defineEmits<{
  (e: 'onUpdate'): void,
}>()
const updateProfileAvatarProvider = inject('updateProfileAvatarProvider', () => ({}))

const photoPreview: Ref<string|null> = ref(null);
const account: Ref<Account|null> = ref(null);
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

const updateProfileInformation = async (e: Event) => {
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
        emit('onUpdate')
    } catch (error) {
        submitErr.value = error
        useBugsnag().notify(error);
    } finally {
        loading.value = false
    }
};

const handleOnSelectAvatar = (base_64_url: string)=> {
    photoPreview.value = base_64_url
    newAvatarCreated.value = false
}

onMounted(() => {
    account.value = AccountStorage.getAccount();

})
</script>

<template>
    <form @submit="updateProfileInformation" formId="updateProfileInfoForm">
        <div class="col-span-6 sm:col-span-4 z-[1]">
            <SelectAvatar iconClass="top-4" className="w-32 h-32 mx-auto" v-if="account?.avatar || defaultAvatar" :avatarUrl="defaultAvatar" @onSelectAvatar="handleOnSelectAvatar"/>
            <Loading v-else className="rounded-full w-32 h-32 mx-auto !block" :width="128" :height="128"/>

            <div class="flex justify-center ml-4 mt-2" v-if="loading">
                <Loading/>
            </div>
            <div v-else-if="!loading && !newAvatarCreated" class="flex justify-center">
                <button type="submit" v-show="photoPreview" class="font-semibold text-blue-600 hover:text-blue-500 mt-2 ml-3">{{
                    $t('edit') }}
                </button>
            </div>
        </div>
    </form>
    <InLineApiError :err="submitErr"/>
</template>
