<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="flex justify-between mb-3 mt-6 mx-6">
                <div class="flex items-center gap-2">
                  <ExclamationTriangleIcon
                    class="h-6 w-6 text-blue-600 mr-2"
                    aria-hidden="true"
                  />
                  <header>
                    <h3>
                      {{
                        hasTwoFaEnabled
                          ? $t("confirm_disable_two_factor_authentication")
                          : $t("confirm_enable_two_factor_authentication")
                      }}
                    </h3>
                    <p class="text-sm text-gray-500" v-if="hasTwoFaEnabled">
                      {{
                        $t("do_you_want_to_disable_two_factor_authentication?")
                      }}
                    </p>
                    <p class="text-sm text-gray-500" v-else>
                      {{
                        $t("do_you_want_to_enable_two_factor_authentication?")
                      }}
                    </p>
                  </header>
                </div>
                <a @click="cancel" class="cursor-pointer">
                  <XMarkIcon class="w-6 h-6" />
                </a>
              </div>
              <figure class="flex justify-center">
                <div v-if="isLoading" class="mb-8">
                  <Loading />
                </div>
                <figcaption
                  v-else-if="!isLoading && svgContent && !hasTwoFaEnabled"
                  class="flex justify-center items-center flex-col gap-2 px-8 mb-8"
                >
                  <p class="text-sm text-gray-500">
                    {{
                      $t("scan_the_qr_code_below_with_your_authenticator_app")
                    }}
                  </p>

                  <picture>
                    <div v-html="svgContent" v-if="svgContent"></div>
                  </picture>

                  <div class="grid gap-2">
                    <header class="flex items-center justify-center gap-2">
                      <h2 class="text-sm font-medium text-gray-900 text-center">
                        {{ $t("two_fa_confirmation") }}
                      </h2>
                    </header>
                    <div class="text-center my-4">
                      <CodeInputs
                        v-if="confirmed"
                        @complete="submit"
                        :length="6"
                      />
                    </div>
                    <p class="text-sm text-gray-500 text-center">
                      {{ $t("enter_6_digit_code_prompt") }}
                    </p>
                    <p class="text-sm text-gray-500 text-center">
                      {{ $t("keep_mobile_device_secure") }}
                    </p>
                  </div>
                </figcaption>
                <section
                  v-if="hasTwoFaEnabled && !isLoading && showCodeInput"
                  class="flex flex-col items-center mt-8 mb-12 px-8"
                >
                  <div class="grid gap-2 mb-8">
                    <p class="text-sm text-gray-500 text-center">
                      {{ $t("enter_6_digit_code_to_confirm_disable_two_fa") }}
                    </p>
                  </div>
                  <CodeInputs @complete="confirmDisableTwofa" :length="6" />
                  <div class="grid gap-2 mt-8">
                    <p class="text-sm text-gray-500 text-center">
                      {{ $t("two_fa_disable_warning_message") }}
                    </p>
                  </div>
                </section>
              </figure>
              <div v-if="serverErrorMsg" class="flex justify-center mb-8">
                <p class="text-sm text-red-500">{{ serverErrorMsg }}</p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { AccountService } from "~/lib/services";
import Loading from "@/components/common/Loading.vue";
import { AccountStorage } from "~/storage";
import { Account } from "@/lib/models";
import CodeInputs from "@/components/Register/CodeInputs";

const props = defineProps({
  show: {
    default: false,
  },
  hasTwoFaEnabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<{
  cancel: [Account: {}];
  enable: [Account: {}];
  disable: [];
}>();
const accountId = computed(() => AccountStorage.getContactId());
const account: Ref<Account | null> = ref(null);
const svgContent = ref("");
const showCodeInput = ref(true);

const cancel = () => {
  emit("cancel", account.value);
  svgContent.value = "";
};
const enable2FALocally = () => {
  emit("enable", account.value);
  svgContent.value = "";
};
const loadAccount = async () => {
  try {
    if (accountId.value) {
      account.value = await AccountService.loadAccount(accountId.value);
      AccountStorage.saveAccount(account.value);
    }
  } catch (error) {
    serverErrorMsg.value = error.message ?? "";
  }
};
const isLoading = ref(true);
const serverErrorMsg = ref("");
const initTwoFA = async () => {
  try {
    isLoading.value = true;
    showCodeInput.value = false;
    const res = await AccountService.initTwoFA();
    svgContent.value = res.qrCode;
  } catch (error) {
    serverErrorMsg.value = error.message ?? "";
  } finally {
    isLoading.value = false;
  }
};
const confirmDisableTwofa = async (code: string) => {
  try {
    isLoading.value = true;
    const obj = { pin: code };
    const res = await AccountService.disableTwoFA(obj);
    svgContent.value = res.qrCode;
    emit("disable");
    await loadAccount();
  } catch (error) {
    serverErrorMsg.value = error.message ?? "";
  } finally {
    isLoading.value = false;
  }
};
const confirmed = ref(true);
const submit = async (code: string) => {
  try {
    isLoading.value = true;
    await AccountService.verifyTwoFA({ pin: code });
    await loadAccount();
    confirmed.value = false;
    enable2FALocally();
    svgContent.value = "";
  } catch (error) {
    serverErrorMsg.value = error.message ?? "";
  } finally {
    isLoading.value = false;
  }
};
onMounted(() => {
  if (!props.hasTwoFaEnabled) initTwoFA();
  else isLoading.value = false;
});
</script>
