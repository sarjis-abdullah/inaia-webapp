<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white pb-8 px-4 shadow sm:rounded-lg sm:px-10">
            <img src="~/assets/img/pageicons/emailVerif.png" alt="update_password" class="w-32 h-auto mb-5 mx-auto" />
            <h2 class="text-center mb-8 text-2xl font-bold">{{ $t('update_password') }}</h2>
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="old_password" class="block text-sm font-medium text-gray-700">
                        {{ $t('old_password') }}
                    </label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <input :type="inputType" name="old_password" id="old_password" v-model="state.old_password"
                            class="block  w-full 10 pl-3 py-2 rounded-md" :class="inputStyle" />
                    </div>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">
                        {{ $t('new_password') }}
                    </label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                        <input :type="inputType" name="password" id="password" v-model="state.password"
                            class="block  w-full 10 pl-3 py-2 rounded-md"
                            :class="!passwordValidated && state.password.length > 0 ? inputErrorStyle : inputStyle" />
                    </div>
                    <p class="mt-2 text-sm text-red-600" id="email-error"
                        v-if="!passwordValidated && state.password.length > 0">
                        {{ $t('password_message') }}
                    </p>
                </div>
                <div>
                    <label for="password_confirmation" class="block text-sm font-medium text-gray-700">
                        {{ $t('password_confirmation') }}</label>
                    <div class="mt-1">
                        <input id="password_confirmation" name="password" class="block  w-full 10 pl-3 py-2 rounded-md" :type="inputType"
                            v-model="state.password_confirmation"
                            :class="confirmedPasswordValidated ? inputStyle : inputErrorStyle" />
                    </div>
                    <p class="mt-1 text-center text-sm text-red-500" v-if="!confirmedPasswordValidated && state.password_confirmation">{{
                        $t('confirm_password_is_required') }}</p>
                </div>

                <p class="mt-2 text-sm text-red-600" id="email-error" v-if="submittingError">{{ $t('account_info_error') }}
                </p>
                <p class="mt-2 text-sm text-yellow-600">{{ $t('password_update_alert') }}
                </p>
                <div class="mt-8 text-center">
                    <button v-if="!isSubmitting" type="submit" :disabled="disabled || isSubmitting" @click.prevent="save"
                        :class="(disabled || isSubmitting) ? 'opacity-50' : 'opacity-100'"
                        class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{
                            $t('save') }}</button>
                    <Loading v-else />
                    <InLineApiError :err="submitErr" />
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { validatePassword } from '@/lib/utils/Validators';
import LogoutHelper from '@/helpers/LogoutHelper';
const router = useRouter();
import { ref, reactive } from 'vue';
import { PasswordUpdateRequest } from '@/lib/requests';
import { AccountService } from '~~/lib/services';
import Loading from "@/components/common/Loading.vue";
import InLineApiError from '@/components/common/InLineApiError.vue';
const isSubmitting = ref(false);
const inputErrorStyle = 'border-red-300   text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';
const inputStyle = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
const { t } = useI18n();
const submittingError = ref(false);
const passwordValidated = ref(true);
const emailValidated = ref(true);
const confirmedPasswordValidated = ref(true)
const disabled = ref(true);
const submitErr = ref(null);
const inputType = ref("password");
const state = reactive({
    old_password: '',
    password: '',
    password_confirmation: '',
});
const emit = defineEmits<{
    (e: 'onSave'): void
}>()

async function save() {
    isSubmitting.value = true;
    submitErr.value = null;
    try {
        const obj: PasswordUpdateRequest = state;
        await AccountService.updatePassword(obj)
        emit('onSave');
        LogoutHelper(router)
    }
    catch (err) {
        submitErr.value = err;
    }
    finally {
        isSubmitting.value = false;
    }
}
watch(state, (currentValue) => {
    if (state.old_password && state.password) {
        passwordValidated.value = validatePassword(currentValue.password);
        confirmedPasswordValidated.value = passwordValidated.value && (currentValue.password_confirmation == currentValue.password)
        disabled.value = !(passwordValidated.value && emailValidated.value && confirmedPasswordValidated.value)
    }

})

</script>
