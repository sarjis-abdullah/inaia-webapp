import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "app-layout"
declare module "/home/sarjis/Inaia/inaia-webapp/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}