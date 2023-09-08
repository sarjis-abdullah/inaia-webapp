// https://nuxt.com/docs/api/configuration/nuxt-config
const appEnv  = process.env.NODE_ENV || 'development'
import EnvKeys from './config'
import en from './lang/en/en';
import de from './lang/de/de';
import fr from './lang/fr/fr';
export default defineNuxtConfig({
    runtimeConfig : {
      public:{
        URL_ENV:process.env.URL_ENV
      }
      
    },
    css: [
        '@/assets/css/tailwind.css'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@nuxtjs/i18n'
    ],
    i18n: {
      strategy:'prefix',
      lazy:true,
      locales: [
        {
          name: 'Deutsch',
          code: 'de',
          iso: 'de-DE',
          file: 'de/de',
          img: '/assets/img/flags/germany-48.png',
          // domain: 'inaia.de'
        },
        {
          name: 'English',
          code: 'en',
          iso: 'en-GB',
          file: 'en/en',
          img: '/assets/img/flags/great-britain-48.png',
          // domain: 'getinaia.com'
        },
        {
          name: 'Français',
          code: 'fr',
          iso: 'fr-FR',
          file: 'fr/fr',
          img: '/assets/img/flags/france-48.png',
          // domain: 'inaia.fr'
        },
      ],
      langDir: 'lang/',
        defaultLocale:'en',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          redirectOn: 'root',
        },
        vueI18n: {
          fallbackLocale:'en',
          legacy:false,
          locale:'en',
          messages:{
            de:de,
            en:en,
            fr:fr
          }
        }
      },
})
