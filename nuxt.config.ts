// https://nuxt.com/docs/api/configuration/nuxt-config
const appEnv = process.env.URL_ENV || 'development'
import EnvKeys from './config'
import en from './lang/en/en';
import de from './lang/de/de';
import fr from './lang/fr/fr';
import gggen from './lang/en/gggen';
import gggde from './lang/de/gggde';
import gggfr from './lang/fr/gggfr';
import ukde from './lang/de/ukde';
import uken from './lang/en/uken';
import ukfr from './lang/fr/ukfr';
const appNames = require('./appNames');
let favIcon = '/favicon.ico';
let pageTitle = "INAIA App";
let selectedEnglish = en;
let selectedFrench = fr;
let selectedGerman = de;
let assetDirectory = "assets";

if (process.env.CURRENT_APP) {
  if (process.env.CURRENT_APP == appNames.getGreenGold) {
    selectedEnglish = gggen;
    selectedFrench = gggfr;
    selectedGerman = gggde;
    assetDirectory = "gggassets";
    pageTitle='GGG App';
    favIcon = '/ggg-favicon.ico';
  }
  if (process.env.CURRENT_APP == appNames.inaiaUk) {
    selectedEnglish = uken;
    selectedFrench = ukfr;
    selectedGerman = ukde;
    assetDirectory = "assets";
    pageTitle='INAIA UK';
    favIcon = '/favicon.ico';
  }
}


export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      URL_ENV: appEnv,
      CURRENT_APP: process.env.CURRENT_APP
    }

  },
  app:{
    head:{
      title:pageTitle,
      charset:'utf-8',
      link:[
        { rel: 'icon', type: 'image/x-icon', href: favIcon },
      ]
    }
  },
  routeRules:{
    '/':{prerender:false}
  },
  dir: {
    assets: assetDirectory
  },
  css: [
    `@/${assetDirectory}/css/tailwind.css`
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript:{
    tsConfig:{
      compilerOptions:{
        verbatimModuleSyntax: false,
      }
    }
  },
  
  modules: [
    '@nuxtjs/i18n',
    'floating-vue/nuxt',
    'nuxt-bugsnag'
  ],
  i18n: {
    strategy: 'prefix',
    lazy: true,
    locales: [
      {
        name: 'Deutsch',
        code: 'de',
        iso: 'de-DE',
        file: 'de/de',
        img: `/${assetDirectory}/img/flags/germany-48.png`,
        // domain: 'inaia.de'
      },
      {
        name: 'English',
        code: 'en',
        iso: 'en-GB',
        file: 'en/en',
        img: `/${assetDirectory}/img/flags/great-britain-48.png`,
        // domain: 'getinaia.com'
      },
      {
        name: 'Français',
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr/fr',
        img: `${assetDirectory}/img/flags/france-48.png`,
        // domain: 'inaia.fr'
      },
    ],
    langDir: 'lang/',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    
    vueI18n: './i18n.config.ts'
  },
  bugsnag: {
    publishRelease: true,
    config: {
      apiKey: '9704e9461f6b8e55c7d71e908e1f709d',
      enabledReleaseStages: ['development','staging', 'production'],
      releaseStage: appEnv,
      appVersion: '1.0',
    }
  }
})
