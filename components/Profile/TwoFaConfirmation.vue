<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative z-10" @close="cancel">
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
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <ExclamationTriangleIcon
                      class="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                      >{{
                        hasTwoFaEnabled
                          ? $t("confirm_disable_two_factor_authentication")
                          : $t("confirm_enable_two_factor_authentication")
                      }}</DialogTitle
                    >
                    <div class="mt-2">
                      <p class="text-sm text-gray-500" v-if="hasTwoFaEnabled">
                        {{
                          $t(
                            "do_you_want_to_disable_two_factor_authentication?"
                          )
                        }}
                      </p>
                      <p class="text-sm text-gray-500" v-else>
                        {{
                          $t("do_you_want_to_enable_two_factor_authentication?")
                        }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <figure class="flex justify-center">
                <Loading v-if="isLoading" />
                <figcaption
                  v-else-if="!isLoading && svgContent && !hasTwoFaEnabled"
                  class="flex justify-center items-center flex-col gap-2 px-8"
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
                      <CheckCircleIcon
                        class="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                      <h2 class="text-sm font-medium text-gray-900">
                        {{ $t("two_factor_authentication_enabled_success") }}
                      </h2>
                    </header>
                    <p class="text-sm text-gray-500">
                      {{ $t("enter_6_digit_code_prompt") }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ $t("keep_mobile_device_secure") }}
                    </p>
                  </div>
                </figcaption>
                <section
                  v-if="hasTwoFaEnabled && !isLoading"
                  class="flex flex-col items-center mt-8 mb-12 px-8"
                >
                  <div class="grid gap-2 mb-8">
                    <p class="text-sm text-gray-500">
                      {{ $t("enter_6_digit_code_to_confirm_disable_two_fa") }}
                    </p>
                  </div>
                  <CodeInputs @complete="confirmDisableTwofa" :length="6" />
                  <div class="grid gap-2 mt-8">
                    <p class="text-sm text-gray-500">
                      {{ $t("two_fa_disable_warning_message") }}
                    </p>
                  </div>
                </section>
              </figure>
              <div v-if="serverErrorMsg" class="flex justify-center">
                <p class="text-sm text-red-500">{{ serverErrorMsg }}</p>
              </div>

              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  v-if="!hasTwoFaEnabled"
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto outline-none focus:outline-0"
                  @click="svgContent ? enable() : confrim()"
                >
                  {{ svgContent ? $t("ok") : $t("confirm") }}
                </button>
                <button
                  v-if="!svgContent"
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto outline-none focus:outline-0"
                  @click="cancel"
                  ref="cancelButtonRef"
                >
                  {{ $t("cancel") }}
                </button>
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
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";
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
  confirm: {},
});
const emit = defineEmits<{
  cancel: [Account: {}];
  enable: [Account: {}];
  disable: [];
}>();
const accountId = computed(() => AccountStorage.getContactId());
const account: Ref<Account | null> = ref(null);
const svgContent = ref("");

const cancel = () => {
  emit("cancel", account.value);
  svgContent.value = "";
};
const enable = () => {
  emit("enable", account.value);
  svgContent.value = "";
};
const loadAccount = async () => {
  try {
    if (accountId.value) {
      account.value = await AccountService.loadAccount(accountId.value);
      AccountStorage.saveAccount(account.value);
    }
  } catch (error) {}
};
const isLoading = ref(false);
const serverErrorMsg = ref("");
const confrim = async () => {
  try {
    isLoading.value = true;
    const res = await AccountService.enableTwoFA();
    svgContent.value = res.qrCode;
    await loadAccount();
  } catch (error) {
    serverErrorMsg.value = error.message ?? "";
  } finally {
    isLoading.value = false;
  }
};
const confirmDisableTwofa = async (code: string) => {
  try {
    isLoading.value = true;
    const obj = { code };
    const res = await AccountService.disableTwoFA(obj);
    svgContent.value = res.qrCode;
    emit("disable");
  } catch (error) {
    serverErrorMsg.value = error.message ?? "";
  } finally {
    isLoading.value = false;
  }
};
</script>
