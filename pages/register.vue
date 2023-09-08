<template>
    <RegisterForm />
</template>
<script>
import RegisterForm from "../components/RegisterForm";
export default {
  components: {RegisterForm},
  setup () {
    useHead({
      htmlAttrs: {
        class: 'h-full bg-gray-50'
      },
      bodyAttrs: {
        class: 'h-full align-middle'
      }
    })
  }
}
</script>
