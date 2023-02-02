<template>
    <div class="flex min-h-full flex-col mt-5 mx-6 bg-white">
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-center my-10">Pricing Plans</h1>
        <Countries class="w-3/12 self-center" :all="false" @change="handleCountryChange" />
        <Plans v-if="selectedCountry.id > -1" :countyId="selectedCountry.id"></Plans>
    </div>
</template>
<script lang="ts" setup>
import Countries from '@/components/Register/Countries';
import { SubscriptionSteps } from '@/constants';
import { ref,reactive,computed } from 'vue';
import Plans from './Plans.vue';
const selectedCountry = reactive({id:-1});

function handleCountryChange(country_id:Number) {
  selectedCountry.id = country_id;
};
</script>