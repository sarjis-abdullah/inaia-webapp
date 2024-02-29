import Modal from "@/components/common/Modal";

export default defineNuxtPlugin(nuxtApp =>{
    nuxtApp.vueApp.use(Modal);
  })