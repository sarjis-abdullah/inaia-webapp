<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">

        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <img src="~/assets/img/pageicons/emailVerif.png" alt="address" class="w-32 h-auto mb-5 mx-auto" />
            <h2 class="text-center mb-8 text-2xl font-bold">{{ $t('enter_address') }}</h2>
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="old_password" class="block text-sm font-medium text-gray-700">{{ $t('old_password')
                    }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <input type="text" name="old_password" id="old_password" v-model="state.old_password"
                            class="block  w-full 10 pl-3 py-2 rounded-md"
                            :class="!showOldPasswordError ? inputStyle : inputErrorStyle" />

                    </div>
                </div>
                <div>
                    <label for="new_password" class="block text-sm font-medium text-gray-700">{{ $t('new_password')
                    }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">

                        <input type="text" name="new_password" id="new_password" v-model="state.new_password"
                            class="block  w-full 10 pl-3 py-2 rounded-md"
                            :class="!showNewPasswordError ? inputStyle : inputErrorStyle" />
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                            v-if="state.new_password.length == 0">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    </div>
                </div>
                <div>
                    <label for="confirm_password" class="block text-sm font-medium text-gray-700">{{ $t('confirm_password')
                    }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">

                        <input type="text" name="confirm_password" id="confirm_password" v-model="state.confirm_password"
                            class="block  w-full 10 pl-3 py-2 rounded-md"
                            :class="!showConfirmPasswordError ? inputStyle : inputErrorStyle" />
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                            v-if="state.confirm_password.length == 0">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    </div>
                </div>

                <p class="mt-2 text-sm text-red-600" id="email-error" v-if="submittingError">{{ $t('account_info_error') }}
                </p>

                <div class="mt-8">
                    {{ disableSubmition }}
                    <button type="submit" :disabled="disableSubmition || isSubmitting" @click.prevent="save"
                        :class="(disableSubmition || isSubmitting) ? 'opacity-50' : 'opacity-100'"
                        class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{
                            $t('save') }}</button>
                    <InLineApiError :err="submitErr" />
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { EnvelopeIcon, ExclamationCircleIcon, UserIcon, LockClosedIcon, HashtagIcon } from '@heroicons/vue/20/solid';

import { ref, reactive, toRefs, watch, computed, onMounted, PropType } from 'vue';
import { PasswordUpdateRequest } from '@/lib/requests';
import { AccountService } from '~~/lib/services';
import { getMessageFromError } from '@/helpers/ApiErrorResponseHandler';
import Notification from "@/components/common/Notification";
import InLineApiError from '@/components/common/InLineApiError';
// const disableSubmition = ref(false);
const isSubmitting = ref(false);
const inputErrorStyle = 'border-red-300   text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';
const inputStyle = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
const errorIconColor = 'text-red-900';
const iconColor = 'text-gray-400';
const minimumPasswordLength = 8

const showNotification = ref(false);
const { t } = useI18n();
const onNotificationClosed = () => {
    showNotification.value = false;
}

const submittingError = ref(false);
const submitErr = ref(null);
const inputType = ref("text");
const state = reactive({
    old_password: '',
    new_password: '',
    confirm_password: '',
});
const handleCountryChange = (value: number) => {
    state.country_id = value;
}
const emit = defineEmits<{
    // (e: 'onSave', address: Address): void
}>()

//computed
const showOldPasswordError = computed(()=> {
    
    return !((state.old_password.length > 0) && (state.old_password.length >= minimumPasswordLength))
})
const showNewPasswordError = computed(()=> {
    
    return !((state.new_password.length > 0) && (state.new_password.length >= minimumPasswordLength))
})
const showConfirmPasswordError = computed(()=> {
    
    return !((state.confirm_password.length > 0) && (state.confirm_password.length >= minimumPasswordLength))
})

const shouldShowRequiredError = computed(() => {
    const { old_password, new_password, confirm_password } = state
    if (!old_password || !new_password || !confirm_password) {
        return true
    }
    const c1 = showOldPasswordError.value
    const c2 = showNewPasswordError.value
    const c3 = showConfirmPasswordError.value
    if (c1 || c2 || c3) {
        return true
    }
    return false
})
const disableSubmition = computed(() => {
    if (shouldShowRequiredError.value) {
        return true
    }
    if (state.new_password === state.confirm_password) {
        return false
    }
    return true
})

async function save() {
    isSubmitting.value = true;
    submitErr.value = null;
    try {
        const obj: PasswordUpdateRequest = state;
        // emit('onSave', address);
    }
    catch (err) {
        submitErr.value = err;
    }
    finally {
        isSubmitting.value = false;
    }
}

</script>
