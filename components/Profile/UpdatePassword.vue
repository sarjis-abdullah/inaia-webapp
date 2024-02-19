<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">

        <div class="bg-white pb-8 px-4 shadow sm:rounded-lg sm:px-10">
            <img src="~/assets/img/pageicons/emailVerif.png" alt="update_password" class="w-32 h-auto mb-5 mx-auto" />
            <h2 class="text-center mb-8 text-2xl font-bold">{{ $t('update_password') }}</h2>
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
                    <label for="password" class="block text-sm font-medium text-gray-700">{{ $t('password')
                    }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">

                        <input type="text" name="password" id="password" v-model="state.password"
                            class="block  w-full 10 pl-3 py-2 rounded-md"
                            :class="!showNewPasswordError ? inputStyle : inputErrorStyle" />
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                            v-if="state.password.length == 0">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    </div>
                </div>
                <div>
                    <label for="password_confirmation" class="block text-sm font-medium text-gray-700">{{ $t('password_confirmation')
                    }}</label>
                    <div class="relative mt-1 rounded-md shadow-sm">

                        <input type="text" name="password_confirmation" id="password_confirmation" v-model="state.password_confirmation"
                            class="block  w-full 10 pl-3 py-2 rounded-md"
                            :class="!showConfirmPasswordError ? inputStyle : inputErrorStyle" />
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                            v-if="state.password_confirmation.length == 0">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    </div>
                </div>

                <p class="mt-2 text-sm text-red-600" id="email-error" v-if="submittingError">{{ $t('account_info_error') }}
                </p>
                <p class="mt-2 text-sm text-red-600" id="email-error" v-if="state.password && state.password_confirmation && !passwordMatched">{{ $t('password_mismatch_alert') }}
                </p>
                <p class="mt-2 text-sm text-yellow-600">{{ $t('password_update_alert') }}
                </p>

                <div class="mt-8 text-center">
                    <button v-if="!isSubmitting" type="submit" :disabled="disableSubmition || isSubmitting" @click.prevent="save"
                        :class="(disableSubmition || isSubmitting) ? 'opacity-50' : 'opacity-100'"
                        class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{
                            $t('save') }}</button>
                    <Loading v-else/>
                    <InLineApiError :err="submitErr" />
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid';
import LogoutHelper from '@/helpers/LogoutHelper';
const router = useRouter();
import { ref, reactive, computed } from 'vue';
import { PasswordUpdateRequest } from '@/lib/requests';
import { AccountService } from '~~/lib/services';
import Loading from "@/components/common/Loading.vue";
import InLineApiError from '@/components/common/InLineApiError.vue';
const isSubmitting = ref(false);
const inputErrorStyle = 'border-red-300   text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';
const inputStyle = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
const minimumPasswordLength = 8

const { t } = useI18n();
const submittingError = ref(false);
const submitErr = ref(null);
const inputType = ref("text");
const state = reactive({
    old_password: '',
    password: '',
    password_confirmation: '',
});
const emit = defineEmits<{
    (e: 'onSave'): void
}>()

//computed
const showOldPasswordError = computed(()=> {
    
    return !((state.old_password.length > 0) && (state.old_password.length >= minimumPasswordLength))
})
const showNewPasswordError = computed(()=> {
    
    return !((state.password.length > 0) && (state.password.length >= minimumPasswordLength))
})
const showConfirmPasswordError = computed(()=> {
    
    return !((state.password_confirmation.length > 0) && (state.password_confirmation.length >= minimumPasswordLength))
})

const shouldShowRequiredError = computed(() => {
    const { old_password, password, password_confirmation } = state
    if (!old_password || !password || !password_confirmation) {
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
const passwordMatched = computed(()=> {
    if (state?.password === state?.password_confirmation) {
        return true
    }
    return false
})
const disableSubmition = computed(() => {
    if (shouldShowRequiredError.value) {
        return true
    }
    if (state.password === state.password_confirmation) {
        return false
    }
    return true
})

async function save() {
    isSubmitting.value = true;
    submitErr.value = null;
    try {
        const obj: PasswordUpdateRequest = state;
        const result = await AccountService.updatePassword(obj)
        console.log(result);
        emit('onSave');
        setTimeout(() => {
            // LogoutHelper(router)
        }, 1);
    }
    catch (err) {
        submitErr.value = err;
    }
    finally {
        isSubmitting.value = false;
    }
}

</script>
