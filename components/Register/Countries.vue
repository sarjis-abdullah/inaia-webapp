<template>
  <Listbox as="div" v-model="selected" :disabled="disabled">
    <ListboxLabel class="block text-sm font-medium text-gray-700">{{ $t(label) }}</ListboxLabel>
    <div class="relative mt-1" v-if="!isLoading && !error">
      <ListboxButton
        class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm">
        <span class="block truncate">{{ selected?selected.name_translation_key:$t('choose') }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption as="template" v-for="country in countries" :key="country.id" :value="country"
            v-slot="{ active, selected }">
            <li
              :class="[active ? 'text-white bg-blue-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                country?country.name_translation_key:''
              }}</span>

              <span v-if="selected"
                :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
    <div class="flex flex-row justify-center relative mt-1" v-if="isLoading">
      <Loading />
    </div>
    <div class="relative mt-1" v-if="error">
      <p class="text-center my-3 font-medium text-lg text-red-800">{{ $t('loading_country_error') }}</p>
    </div>
  </Listbox>
</template>
<script lang="ts" setup>

import { CountryService } from '@/lib/services';
import { type Country } from '@/lib/models';
import { ref, watch, onMounted } from 'vue';
import type { Ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import Loading from '../common/Loading.vue';
const {t} = useI18n();
const props = defineProps({
  all: {
    type: Boolean,
    default: false
  },
  selectedCountry: {
    default: null
  },
  selectedCountryId: {
    default: -1
  },
  label:{
    default:'your_country'
  },
  disabled:{
    default:false
  }
})

const emit = defineEmits<{
  (e: 'change', id: Number): void
}>()
const countries: Ref<Array<Country>> = ref([]);
const selected: Ref<Country> = ref(countries.value[0]);
const isLoading = ref(true);
const error = ref(null);
onMounted(async () => {
  try {
    error.value = null;
    isLoading.value = true;
    countries.value = await CountryService.getCountryList(props.all);
    if (props.selectedCountry) {
      selected.value = countries.value.find(x => x.alpha2_code.toLocaleLowerCase() == props.selectedCountry.toLocaleLowerCase())
    }
    if (props.selectedCountryId > 0) {
      selected.value = countries.value.find(x => x.id == props.selectedCountryId)
    }
    if (!selected.value) {
      selected.value = countries.value[0];
    }
    emit("change", selected.value.id);
  }
  catch (err) {
    console.log(err);
    error.value = err;
    useBugsnag().notify(err);
  }
  finally {
    isLoading.value = false;
  }
})

watch(selected, (currentvalue, oldvalue) => {
  emit("change", currentvalue.id)
})
watch(props, (currentValue) => {
  selected.value = countries.value.find(x => x.id == currentValue.selectedCountryId);
})
</script>