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

      <div class="mt-8">
        <button
          @click="editMode = true"
          type="button"
          class="opacity-100 flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Edit
        </button>
      </div>
    </article>

    <article v-else>
      <header class="flex justify-between">
        <ChevronLeftIcon @click="editMode = false" class="h-6 w-6 cursor-pointer" />
        <h2
          class="leading-7 text-gray-900 text-2xl font-bold max-w-[12rem] mx-auto mb-6 text-center">{{ $t('paymentMethods') }}</h2>
        <span></span>
      </header>
    </article>
  </section>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue";
import { type Depot } from "@/lib/models";
import { CurrencyService, AddDepotService } from "@/lib/services";
import ListItem from "@/components/common/ListItem";
import Modal from "@/components/common/Modal.vue";
import DepotStatus from "@/components/Assets/DepotStatus";
import {
  PlusIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/20/solid";
import Loading from "../common/Loading.vue";
const { t, locale } = useI18n();
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
onMounted(() => {
  init();
});

const toggleDetailPaymentAccount = () => {
  // showDetailPaymentAccount.value = !showDetailPaymentAccount.value
};
</script>
