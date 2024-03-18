<template>
    <SetupSavingPlan :isSimulation="true"/>
</template>
<script lang="ts" setup>
import SetupSavingPlan from '@/components/NewDepot/SetupSavingPlan';
useHead({
      htmlAttrs: {
        class: 'h-full bg-gray-50'
      },
      bodyAttrs: {
        class: 'h-full align-middle'
      }
    })
definePageMeta({
  layout:"outside-layout",

});
</script>