import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/yunusmorkramer/Documents/Dev/inaia/inaia-webapp/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}