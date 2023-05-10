import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "login"
declare module "/Users/mahdinjim/Documents/workspace/inaia/client/inaia-webapp/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}