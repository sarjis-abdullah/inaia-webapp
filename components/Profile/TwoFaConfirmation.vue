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
                        $t("Confirm Enable Two-Factor Authentication")
                      }}</DialogTitle
                    >
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {{
                          $t("do_you_want_to_enable_two_Factor_authentication?")
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
                    Scan the QR code below with your authenticator app (e.g.,
                    Google Authenticator, Authy).
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
                        Two-Factor Authentication has been enabled successfully!
                      </h2>
                    </header>
                    <p class="text-sm text-gray-500">
                      Each time you log in, you will be prompted to enter a
                      6-digit code from your authenticator app to complete the
                      login process.
                    </p>
                    <p class="text-sm text-gray-500">
                      Keep your mobile device secure, as it will be required to
                      generate the authentication codes. If you lose access to
                      your authenticator app, you may need to contact support
                      for assistance.
                    </p>
                  </div>
                </figcaption>
                <div v-else-if="serverErrorMsg">
                  <p class="text-sm text-red-500">{{ serverErrorMsg }}</p>
                </div>
              </figure>

              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  @click="svgContent ? enable() : confrim()"
                >
                  {{ svgContent ? $t("ok") : $t("confirm") }}
                </button>
                <button
                  v-if="!svgContent"
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
  cancel: [{}];
  enable: [{}];
}>();
const accountId = computed(() => AccountStorage.getContactId());
const account = ref({});
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
    await loadAccount()
  } catch (error) {
    serverErrorMsg.value = error.message ?? "";
  } finally {
    isLoading.value = false;
  }
};
</script>
