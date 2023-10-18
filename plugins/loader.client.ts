import Loading from "@/components/common/Loading";

export default defineNuxtPlugin(nuxtApp =>{
    nuxtApp.vueApp.use(Loading);
  })