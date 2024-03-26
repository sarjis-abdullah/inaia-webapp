<template>
  <section>
    <article v-if="!editMode">
      <header class="flex justify-between">
        <!-- <ChevronLeftIcon @click="editMode = false" class="h-6 w-6 cursor-pointer" /> -->
        <h2
          v-if="currentPaymentMethod"
          class="leading-7 text-gray-900 text-2xl font-bold max-w-[12rem] mx-auto mb-6 text-center"
          v-html="$t(currentPaymentMethod.name_translation_key)"
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
      <div class="mt-4 text-center">
        <p class="py-2">{{ displayPragraph }}</p>
      </div>
      <ul class="grid gap-4">
        <li
          v-for="(item, index) in bankInfo"
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

      <div class="mt-8 flex gap-2">
        <button
          v-if="newPaymentAccount"
          @click="cancel"
          type="button"
          class="opacity-100 flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          v-if="newPaymentAccount && !updateDepoLoading"
          @click="updateDepotPaymentInformation"
          type="button"
          class="opacity-100 flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update
        </button>
        <button
        v-else-if="newPaymentAccount && updateDepoLoading"
        disabled
          class="opacity-100 flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Loading :height="20" :width="20" />
        </button>
        <button
          v-else
          @click="editPaymentMethod"
          type="button"
          class="opacity-100 flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Edit
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
        <span></span>
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
                v-if="method.hasBankAccounts"
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
                {{ t(method.name_translation_key) }}
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
        <span></span>
      </header>
      <div v-if="accountLoading" class="flex justify-center">
        <Loading />
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
            <!-- @click="selectBankAccount(account)" -->
            <div class="font-semibold">
              {{ account.bank_name }}
            </div>
            <div>{{ formatIban(account.iban) }}</div>
          </div>
        </li>
      </ul>
    </article>
  </section>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue";
import { type Depot } from "@/lib/models";
import { CurrencyService, AddDepotService } from "@/lib/services";
import ListItem from "@/components/common/ListItem";
import Modal from "@/components/common/Modal.vue";
import Loading from "@/components/common/Loading.vue";
import DepotStatus from "@/components/Assets/DepotStatus";
import {
  PlusIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/20/solid";
import { PaymentMethods } from "~/lib/contants/PaymentMethods";
import { UpdateDepotRequest } from "~/lib/requests";
const { t, locale } = useI18n();
const emit = defineEmits<{
  (e: "onClose"): void;
}>();
const { depot, isVerified } = defineProps({
  depot: {
    type: Object as PropType<Depot>,
  },
  isVerified: {
    type: Boolean,
  },
});

const editMode = ref(false);
const errorText = ref("");
const currentPaymentAccount = ref(null);
const currentPaymentMethod = ref(null);
const inaiaPaymentDetails = ref(null);
const displayPragraph = computed(() => {
  if (
    currentPaymentMethod.value &&
    currentPaymentMethod.value?.name_translation_key == "bank_transfer" &&
    inaiaPaymentDetails.value
  ) {
    return t("transferMoneytoInaia");
  }
  if (
    currentPaymentMethod.value &&
    currentPaymentMethod.value?.name_translation_key == "bank_transfer" &&
    !inaiaPaymentDetails.value
  ) {
    return t("bankTranferMethod");
  }
  if (!currentPaymentMethod.value) {
    return t("noPaymentMethodSelectedForSavingPlan");
  }
  if (
    currentPaymentMethod.value &&
    currentPaymentMethod.value?.name_translation_key == "bank_account" &&
    !currentPaymentAccount.value
  ) {
    return t("noBankAccountSelectedForSavingPlan");
  }
  return "";
});

const bankInfo = computed(() => {
  if (
    currentPaymentAccount.value &&
    currentPaymentAccount.value.payment_account_specs &&
    currentPaymentAccount.value.payment_account_specs.length > 0
  ) {
    return currentPaymentAccount.value.payment_account_specs
      .filter((element) => {
        if (element.name == "bank_name" || element.name == "iban") {
          return element;
        }
      })
      .reverse();
  }
  return null;
});
const loadInfo = async () => {
  try {
    Loading.value = true;
    if (depot?.payment_account_id) {
      let details = await AddDepotService.detailPaymentAccount(
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
    Loading.value = false;
  }
};
const init = () => {
  if (depot) {
    currentPaymentMethod.value = {
      name_translation_key: depot.payment_method,
    };
    if (depot?.payment_details) {
      inaiaPaymentDetails.value = depot.payment_details;
    }
  }
  if (
    depot &&
    depot.payment_method == "bank_account" &&
    depot.payment_account_id != null
  ) {
    loadInfo();
  } else {
    currentPaymentAccount.value = null;
  }
  console.log(12345, depot);
};

const methodLoading = ref(false);
const getTheListOfPaymentAccounts = () => {};
const paymentMethods = ref([]);
const loadPaymentMethod = async () => {
  try {
    methodLoading.value = true;
    const result = await AddDepotService.getTheListOfPaymentMethods();
    if (result.length) {
      paymentMethods.value = result.map((item) => {
        let obj = item;
        obj.hasBankAccounts = true;
        if (item.name_translation_key == PaymentMethods.bankTranfer) {
          obj.hasBankAccounts = false;
          obj.description = t("bank_transfer_paragraph");
        } else {
          obj.description = t("paymentMethodBankMessage");
        }
        return obj;
      });
    }

    //   unwrapResult(result);
    //   setDisplayError(false);
    methodLoading.value = false;
  } catch (err) {
    methodLoading.value = false;
    // BugSnagService.addBreadCumb("Load bank accounts");
    // BugSnagService.notify(err);
    // setDisplayError(true);
    // setIsLoading(false);
    // setError(err.message);
  }
};
const showBankAccounts = ref(false);
const accountLoading = ref(false);
const bankAccounts = ref([]);
const loadBankAccounts = async (method) => {
  showBankAccounts.value = true;
  if (!method.has_payment_accounts) {
    return;
  }
  accountLoading.value = true;
  try {
    const result = await AddDepotService.getTheListOfPaymentAccounts();
    if (result?.length) {
      bankAccounts.value = result.map((item) => {
        return {
          ...item,
          bank_name: item?.payment_account_specs?.find(
            (spec) => spec.name == "bank_name"
          )?.value,
          iban: item?.payment_account_specs?.find((spec) => spec.name == "iban")
            .value,
        };
      });
    }
  } catch (error) {
    console.log("object");
  } finally {
    accountLoading.value = false;
  }
};
const editPaymentMethod = () => {
  editMode.value = true;
  loadPaymentMethod();
  // showDetailPaymentAccount.value = !showDetailPaymentAccount.value
};
const formatIban = (iban) => {
  const lastDigits = iban.substr(iban.length - 4);
  return "**** " + lastDigits;
};
const selectPOptions = (option) => {
  // if (option.is_verified) {
  //   if (!isEdit) {
  //     dispatch(setPaymentOption(option));
  //     navigation.goBack();
  //   } else {
  //     setSelectedOption(option);
  //     setShowMarkAsFavorite(true);
  //   }
  // } else {
  //   dispatch(setPaymentAccountToActivate(option));
  //   navigation.navigate(screensName.activatePaymentAccountScreen);
  //   //setShowVerify(true);
  // }
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
      payment_account_id: undefined,
    };
    if (currentPaymentMethod.value?.name_translation_key) {
      newData.payment_method = currentPaymentMethod.value?.name_translation_key;
    }
    if (currentPaymentMethod.value?.name_translation_key == "bank_account") {
      newData.payment_account_id = currentPaymentAccount.value.id;
    }
    try {
      updateDepoLoading.value = true;
      await AddDepotService.updateDepotInfo(depot.id, newData);
    } catch (err) {
      console.log(err);
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
  if (account.id != currentPaymentAccount.value.id) {
    newPaymentAccount.value = true;
  }
  currentPaymentAccount.value = account;
  editMode.value = false;
};

onMounted(() => {
  init();
});
</script>
