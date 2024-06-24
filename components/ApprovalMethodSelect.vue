<template>
  <Listbox as="div" v-model="selectedApprovalMethod">
    
    <div class="relative mt-2">
      <ListboxButton
        class="flex items-center gap-2 relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
      >
      <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
      >{{ $t("Approval Method:") }}
    </ListboxLabel>
        <span class="block truncate">{{
          selectedApprovalMethod
            ? selectedApprovalMethod.translated_name
            : $t("select")
        }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="method in approvalMethods"
            :key="method.id"
            :value="method"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-blue-600 text-white' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  'block truncate',
                ]"
                >{{ method.translated_name }}</span
              >

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-blue-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
} from "@heroicons/vue/20/solid";
import { type ConfirmationMethod } from "@/lib/models";

const emit = defineEmits<{
  (e: "update:approvalMethod", value: string): void;
}>();

const selectedApprovalMethod: Ref<ConfirmationMethod | null> = ref(null);
const approvalMethods: Ref<Array<ConfirmationMethod>> = ref([]);

watch(
  selectedApprovalMethod,
  (currentValue, oldValue) => {
    if (currentValue?.name_translation_key) {
      emit("update:approvalMethod", currentValue?.name_translation_key);
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
onMounted(() => {
  approvalMethods.value = [
    {
      id: 6,
      name_translation_key: "email",
      translated_name: "Email",
    },
    {
      id: 2,
      name_translation_key: "sms",
      translated_name: "SMS",
    },
    {
      id: 1,
      name_translation_key: "mobile-pin",
      translated_name: "Mobile PIN",
    },
    {
      id: 7,
      name_translation_key: "2fa",
      translated_name: "Two Factor Authentication",
    },
  ];
  selectedApprovalMethod.value = {
    id: 6,
    name_translation_key: "email",
    translated_name: "Email",
  };
});
</script>
