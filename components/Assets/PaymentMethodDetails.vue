<template>
  <section class="min-h-[60vh] overflow-y-auto relative">
    <article v-if="!editMode">
      <header class="flex justify-between">
        <h2
          v-if="currentPaymentMethod"
          class="leading-7 text-gray-900 text-2xl font-bold max-w-[12rem] mx-auto mb-6 text-center"
          v-html="$t(currentPaymentMethod)"
        ></h2>
        <span></span>
      </header>
      <picture>
        <source src="~/assets/img/paymentout.png" />
        <img
          src="~/assets/img/paymentout.png"
          alt="referral info"
          class="w-32 h-auto mb-5 mx-auto"
        />
      </picture>
      <div v-if="initialLoading" class="flex justify-center">
        <Loading />
      </div>
      <div v-else class="mt-4 text-center">
        <p class="py-2">{{ displayPragraph }}</p>
      </div>
      <ul
        class="grid gap-4 mt-4"
        v-if="
          currentPaymentMethod == PaymentMethods.bankTranfer &&
          inaiaPaymentDetails
        "
      >
        <li class="flex justify-between">
          <span>
            {{ $t('accountHolder') }}
          </span>
          <span>
            {{ "INAIA GmbH" }}
          </span>
        </li>
        <li class="flex justify-between">
          <span>
            {{ $t('iban') }}
          </span>
          <div
            v-if="depot?.payment_details?.inaia_iban"
            @click="copy(depot.payment_details.inaia_iban)"
            class="flex gap-1 items-center cursor-pointer"
          >
            <span>{{ depot?.payment_details?.inaia_iban }}</span>
            <ClipboardDocumentIcon class="h-5 w-5" />
          </div>
        </li>
        <li class="flex justify-between">
          <span>
            {{ $t('reference') }}
          </span>
          <div
            v-if="depot?.payment_details?.reference"
            @click="copy(depot.payment_details.reference)"
            class="flex gap-1 items-center cursor-pointer"
          >
            <span>{{ depot.payment_details.reference }}</span>
            <ClipboardDocumentIcon class="h-5 w-5" />
          </div>
        </li>
      </ul>
      <ul
        class="grid gap-4"
        v-if="currentPaymentMethod == PaymentMethods.bankAccount"
      >
        <li
          v-for="(item, index) in bankInfoWhenPaymentMethodBankAccount"
          :key="index"
          class="flex justify-between"
        >
          <span>
            {{ $t(item.name) }}
          </span>
          <span>
            {{ item.value }}
          </span>
        </li>
      </ul>

      <transition
        leave-active-class="transition ease-in duration-1000"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="copying"
          class="text-sm rounded-md text-center absolute bottom-16 w-full"
        >
          {{ $t("copied") }}
        </div>
      </transition>
      <div class="mt-8 flex gap-2 absolute bottom-0 w-full">
        <button
          v-if="
            newPaymentAccount || depot?.payment_method != currentPaymentMethod
          "
          @click="cancel"
          type="button"
          class="opacity-100 flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          v-if="
            (newPaymentAccount ||
              depot?.payment_method != currentPaymentMethod) &&
            !updateDepoLoading
          "
          @click="updateDepotPaymentInformation"
          type="button"
          class="opacity-100 flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {{ $t('update') }}
        </button>
        <button
          v-else-if="
            (newPaymentAccount ||
              depot?.payment_method != currentPaymentMethod) &&
            updateDepoLoading
          "
          disabled
          class="opacity-100 flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Loading :height="20" :width="20" />
        </button>
        <button
          v-else-if="
            currentPaymentMethod == PaymentMethods.bankAccount ||
            currentPaymentMethod == PaymentMethods.bankTranfer
          "
          @click="editPaymentMethod"
          type="button"
          class="opacity-100 flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none"
        >
        {{ $t('edit') }}
        </button>
        <button
          v-else
          @click="updatePaymentMethod"
          type="button"
          class="opacity-100 flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          <Loading v-if="updateDepoLoading" :height="20" :width="20" />
          <span v-else>
            {{ $t('update') }}
          </span>
        </button>
      </div>
    </article>

    <article v-else-if="!showBankAccounts && editMode">
      <header class="flex justify-between">
        <ChevronLeftIcon
          @click="editMode = false"
          class="h-6 w-6 cursor-pointer"
        />
        <h2 class="leading-7 text-gray-900 text-2xl font-bold mb-6 text-center">
          {{ $t("paymentMethods") }}
        </h2>
        <span class="h-6 w-6"></span>
      </header>
      <div v-if="methodLoading" class="flex justify-center">
        <Loading />
      </div>
      <ul
        role="list"
        v-if="!methodLoading && paymentMethods?.length"
        class="divide-y divide-gray-200 rounded-b-md border border-gray-200"
      >
        <li
          class="grid gap-1 items-center text-sm leading-6 cursor-pointer p-2"
          style="grid-template-columns: 90% 10%"
          v-for="method in paymentMethods"
          :key="method.id"
        >
          <div
            class="text-base grid gap-2 items-start"
            style="grid-template-columns: 15% 85%"
            @click="loadBankAccounts(method)"
          >
            <div class="mt-2">
              <svg
                class="h-8 w-8"
                v-if="method.has_payment_accounts"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>bank</title>
                <path
                  d="M11.5,1L2,6V8H21V6M16,10V17H19V10M2,22H21V19H2M10,10V17H13V10M4,10V17H7V10H4Z"
                />
              </svg>
              <svg
                class="h-12 w-12 mt-2"
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>bank-transfer-out</title>
                <path
                  d="M15,15V12H18V10L22,13.5L18,17V15H15M14,8.7V10H2V8.7L8,5L14,8.7M2,17H14V19H2V17M7,11H9V16H7V11M3,11H5V16H3V11M11,11H13V16H11V11Z"
                />
              </svg>
            </div>
            <div>
              <div class="font-semibold">
                {{ t(method?.name_translation_key) }}
              </div>
              <div>{{ method.description }}</div>
            </div>
          </div>
          <div class="flex flex-col justify-end items-end w-full pr-2">
            <ChevronRightIcon
              v-if="method.has_payment_accounts"
              class="h-5 w-5"
            />
            <span v-else class=""></span>
          </div>
        </li>
      </ul>
    </article>
    <article v-if="showBankAccounts">
      <header class="flex justify-between">
        <ChevronLeftIcon
          @click="showBankAccounts = false"
          class="h-6 w-6 cursor-pointer"
        />
        <h2 class="leading-7 text-gray-900 text-2xl font-bold mb-6 text-center">
          {{ $t("yourBankAccounts") }}
        </h2>
        <span class="h-6 w-6"></span>
      </header>
      <div v-if="accountLoading" class="flex justify-center">
        <Loading />
      </div>
      <div v-if="!accountLoading" class="flex justify-between items-center text-sm leading-6 border-b px-2 pb-2">
        <span>{{ $t('new_bank_account') }}</span>
        <button class="opacity-100 flex justify-center rounded-md border border-transparent bg-blue-600 py-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none" @click="addNewPaymentAcoount = true">
          {{$t('add')}}
        </button>
      </div>
      <ul
        role="list"
        v-if="!accountLoading && bankAccounts?.length"
        class="divide-y divide-gray-200 rounded-b-md"
      >
        <li
          class="grid gap-1 items-center text-sm leading-6 cursor-pointer p-2"
          v-for="account in bankAccounts"
          :key="account.id"
          @click="selectNewBankAccount(account)"
        >
          <div class="text-base flex gap-2 items-start justify-between">
            <div class="font-semibold">
              {{ account.bank_name }}
            </div>
            <div>{{ formatIban(account.iban) }}</div>
          </div>
        </li>
      </ul>
    </article>
    <p v-if="errorText" class="text-red-500 text-center">{{ errorText }}</p>
  </section>
  <AddPaymentAcount
    :showAddPaymentAccount="addNewPaymentAcoount"
    :accountId="account.account.id"
    v-if="addNewPaymentAcoount && account && account.account"
    @onClose="closeAddPaymentAccount"
    @OnAdd="onPaymentAccountAdded"
  />
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue";
import { copyToClipboard } from "@/helpers/clipboardHelper.ts";
import {
  PaymentAccount,
  PaymentDetails,
  type Depot,
  PaymentMethod,
} from "@/lib/models";
import { CurrencyService, AddDepotService } from "@/lib/services";
import ListItem from "@/components/common/ListItem.vue";
import Modal from "@/components/common/Modal.vue";
import Loading from "@/components/common/Loading.vue";
import DepotStatus from "@/components/Assets/DepotStatus.vue";
import AddPaymentAcount from "@/components/PaymentAccount/AddPaymentAcount.vue";
import {
  PlusIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ClipboardDocumentIcon,
} from "@heroicons/vue/20/solid";
import { PaymentMethods } from "~/lib/contants/PaymentMethods";
import { UpdateDepotRequest } from "~/lib/requests";
import { AccountStorage } from "@/storage";
import { PaymentAccountSpecs } from "~/lib/contants";
import { Account } from '@/lib/models/Account';
const { t, locale } = useI18n();
const emit = defineEmits<{
  onClose: [];
  updateDepoProps: [Depot];
}>();
const { depot } = defineProps({
  depot: {
    type: Object as PropType<Depot>,
  }
});
interface ExtendedPaymentMethod extends PaymentMethod {
  description?: string;
}
const editMode = ref(false);
const errorText = ref("");
const copying = ref(false);
const currentPaymentAccount: Ref<PaymentAccount | null> = ref(null);
const currentPaymentMethod: Ref<string | null> = ref(null);
const inaiaPaymentDetails: Ref<PaymentDetails | null> = ref(null);
const displayPragraph = computed(() => {
  if (
    currentPaymentMethod.value == PaymentMethods.bankTranfer &&
    inaiaPaymentDetails.value
  ) {
    return t("transferMoneytoInaia");
  }
  if (
    currentPaymentMethod.value == PaymentMethods.bankTranfer &&
    !inaiaPaymentDetails.value
  ) {
    return t("bankTranferMethod");
  }
  if (!currentPaymentMethod.value) {
    return t("noPaymentMethodSelectedForSavingPlan");
  }
  if (
    currentPaymentMethod.value == PaymentMethods.bankAccount &&
    !currentPaymentAccount.value
  ) {
    return t("noBankAccountSelectedForSavingPlan");
  }
  return "";
});

const bankInfoWhenPaymentMethodBankAccount = computed(() => {
  if (
    currentPaymentAccount.value &&
    currentPaymentAccount.value.payment_account_specs &&
    currentPaymentAccount.value.payment_account_specs.length > 0
  ) {
    return currentPaymentAccount.value.payment_account_specs
      .filter((element) => {
        if (element.name == PaymentAccountSpecs.bank_name || element.name == PaymentAccountSpecs.iban) {
          return element;
        }
      })
      .reverse();
  }
  return null;
});
const initialLoading = ref(false);
const loadInfo = async () => {
  try {
    initialLoading.value = true;
    if (depot?.payment_account_id) {
      const details = await AddDepotService.detailPaymentAccount(
        depot.payment_account_id
      );
      if (details) {
        currentPaymentAccount.value = details;
      }
    }
  } catch (err) {
    if (err?.message) {
      errorText.value = err.message;
    }
  } finally {
    initialLoading.value = false;
  }
};
const init = () => {
  if (depot) {
    currentPaymentMethod.value = depot.payment_method;
    if (depot?.payment_details) {
      inaiaPaymentDetails.value = depot.payment_details;
    }
  }
  if (
    depot &&
    depot.payment_method == PaymentMethods.bankAccount &&
    depot.payment_account_id != null
  ) {
    loadInfo();
  } else {
    currentPaymentAccount.value = null;
  }
};

const methodLoading = ref(false);
const paymentMethods = ref([]);
const loadPaymentMethod = async () => {
  try {
    methodLoading.value = true;
    const result = await AddDepotService.getTheListOfPaymentMethods();
    if (result?.length) {
      paymentMethods.value = result?.map((item: ExtendedPaymentMethod) => {
        let obj = item;
        if (item.name_translation_key == PaymentMethods.bankTranfer) {
          obj.description = t("bank_transfer_paragraph");
        } else {
          obj.description = t("paymentMethodBankMessage");
        }
        return obj;
      });
    }
    methodLoading.value = false;
  } catch (err) {
    methodLoading.value = false;
    errorText.value = err.message
  }
};
const showBankAccounts = ref(false);
const accountLoading = ref(false);
const bankAccounts: Ref<PaymentAccount|[]> = ref([]);
const loadBankAccounts = async (method: PaymentMethod) => {
  if (!method.has_payment_accounts) {
    currentPaymentMethod.value = method.name_translation_key;
    editMode.value = false;
    return;
  }
  showBankAccounts.value = true;
  accountLoading.value = true;
  try {
    const result = await AddDepotService.getTheListOfPaymentAccounts();
    if (result?.length) {
      bankAccounts.value = result.map((item) => {
        return {
          ...item,
          bank_name: item?.payment_account_specs?.find(
            (spec: string) => spec?.name == PaymentAccountSpecs.bank_name
          )?.value,
          iban: item?.payment_account_specs?.find((spec: string) => spec?.name == PaymentAccountSpecs.iban)
            .value,
        };
      });
    }
  } catch (error) {
    errorText.value = err.message;
  } finally {
    accountLoading.value = false;
  }
};
const editPaymentMethod = () => {
  editMode.value = true;
  loadPaymentMethod();
};
const formatIban = (iban) => {
  const lastDigits = iban.substr(iban.length - 4);
  return "**** " + lastDigits;
};
const cancel = () => {
  emit("onClose");
  editMode.value = false;
  newPaymentAccount.value = false;
  showBankAccounts.value = false;
};
const updateDepoLoading = ref(false);
const updateDepotPaymentInformation = async () => {
  if (depot?.id) {
    let newData: UpdateDepotRequest = {
      id: depot.id,
      payment_method: "",
    };
    if (currentPaymentMethod.value) {
      newData.payment_method = currentPaymentMethod.value;
    }
    if (
      (currentPaymentMethod.value == PaymentMethods.bankAccount,
      currentPaymentAccount.value?.id)
    ) {
      (newData.payment_account_id = undefined),
        (newData.payment_account_id = currentPaymentAccount.value.id);
    }
    try {
      updateDepoLoading.value = true;
      const res = await AddDepotService.updateDepotInfo(depot.id, newData);
      emit("updateDepoProps", res);
    } catch (err) {
      errorText.value = err.message;
    } finally {
      updateDepoLoading.value = false;
      cancel();
    }
  }
};
const newPaymentAccount = ref(false);
const selectNewBankAccount = (account) => {
  showBankAccounts.value = false;
  currentPaymentMethod.value = PaymentMethods.bankAccount;
  if (account?.id != currentPaymentAccount.value?.id) {
    newPaymentAccount.value = true;
  }
  currentPaymentAccount.value = account;
  editMode.value = false;
};
const updatePaymentMethod = async () => {
  try {
    updateDepoLoading.value = true;
    const newData = {
      id: depot?.id,
      payment_method: PaymentMethods.bankTranfer,
    };
    const res = await AddDepotService.updateDepotInfo(depot.id, newData);
    emit("updateDepoProps", res);
  } catch (err) {
    errorText.value = err.message;
  } finally {
    updateDepoLoading.value = false;
    cancel();
  }
};

const addNewPaymentAcoount = ref(false);
const closeAddPaymentAccount = () => {
  addNewPaymentAcoount.value = false;
};
const onPaymentAccountAdded = (paymentAccount:PaymentAccount) => {
  if (paymentAccount && bankAccounts.value?.length) {
    bankAccounts.value.unshift(paymentAccount)
    selectNewBankAccount(paymentAccount)
  }
  addNewPaymentAcoount.value = false;
};
const copy = (text: string) => {
  copyToClipboard(text);
  copying.value = true;
  setTimeout(() => {
    copying.value = false;
  }, 500);
};

const account: Ref<Account|null> = ref(null);
onMounted(() => {
  init();
  account.value = AccountStorage.getAccount();
});
</script>
