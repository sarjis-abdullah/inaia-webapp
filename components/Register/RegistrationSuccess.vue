<template>
  <div class="flex min-h-full flex-1 justify-center items-center flex-col p-10">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">

      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ $t('registration_done') }}</h2>
        <CheckCircleIcon class="w-20 h-auto my-3 text-green-500 mx-auto"></CheckCircleIcon>
        <p class="text-green-500 text-center">{{ $t('registration_success_message') }}</p>
        <p class="text-center text-xl text-green-500 my-6">{{ $t('or') }}</p>
        <div class="text-center">
          <NuxtLink :to="'/'+locale+'/login'" class="mx-auto cursor-pointer py-3 px-6 bg-blue-600 text-white rounded hover:bg-blue-400"><span class="text-center">{{ $t("go_to_login") }}</span></NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts"  setup>
  import {  CheckCircleIcon } from '@heroicons/vue/20/solid';
  const {locale} = useI18n();
</script>
