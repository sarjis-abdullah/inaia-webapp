<template>
  <div>

  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n();

onMounted(()=>{
  return navigateTo( locale.value+'/register' )
})

</script>
