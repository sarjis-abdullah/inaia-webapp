<template>
  <div>

    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>

    <Steps></Steps>

    <button class="bg-cyan-500 shadow-lg shadow-cyan-500/50">Subscribe</button>
    <button class="bg-blue-500 shadow-lg shadow-blue-500/50">Subscribe</button>
    <button class="bg-indigo-500 shadow-lg shadow-indigo-500/50">Subscribe</button>

  </div>
</template>
<script>
import Steps from "../components/Steps";
export default {
  components: {Steps},
  layout: 'defaultTransparentNav',
  head: {
    title: 'INAIA',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Deine Werte im Mittelpunkt'
      }
    ]
  },
  loading: {
    color: 'DodgerBlue',
    height: '10px',
    continuous: true,
    duration: 3000
  }
}
</script>
