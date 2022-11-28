import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "/Users/yunusmorkramer/Documents/Dev/inaia/inaia-signup/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}