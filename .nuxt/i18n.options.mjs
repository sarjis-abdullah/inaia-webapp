export const localeCodes = ["de","en","fr"]

export const localeMessages = {
  "de": [],
  "en": [],
  "fr": [],
}

export const additionalMessages = Object({"de":[],"en":[],"fr":[],})

export const resolveNuxtI18nOptions = async (context) => {
  const nuxtI18nOptions = Object({})
  const vueI18nOptionsLoader = async (context) => Object({"fallbackLocale":"en","legacy":false,"locale":"en","messages": Object({"de":{
  "createAccount": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Create your account"])};fn.source="Create your account";return fn;})(),
  "plan": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Choose your plan"])};fn.source="Choose your plan";return fn;})(),
  "subscription_info": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Enter your information"])};fn.source="Enter your information";return fn;})(),
  "consditions": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Approve our conditions"])};fn.source="Approve our conditions";return fn;})(),
  "accept_email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Wir möchten dich per E-Mail oder auf anderem Wege über Produktupdates und weitere Dienste von INAIA auf dem Laufenden halten. Setze das Häkchen und gib uns deine Zustimmung."])};fn.source="Wir möchten dich per E-Mail oder auf anderem Wege über Produktupdates und weitere Dienste von INAIA auf dem Laufenden halten. Setze das Häkchen und gib uns deine Zustimmung.";return fn;})()
},"en":{
  "createAccount": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Create your account"])};fn.source="Create your account";return fn;})(),
  "plan": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Choose your plan"])};fn.source="Choose your plan";return fn;})(),
  "subscription_info": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Enter your information"])};fn.source="Enter your information";return fn;})(),
  "conditions": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Approve our conditions"])};fn.source="Approve our conditions";return fn;})(),
  "accept_email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["We would like to keep you informed about product updates and other services from INAIA via email or other means. Check the box and give us your consent."])};fn.source="We would like to keep you informed about product updates and other services from INAIA via email or other means. Check the box and give us your consent.";return fn;})()
},}),})
  nuxtI18nOptions.vueI18n = await vueI18nOptionsLoader(context)
  nuxtI18nOptions.locales = [Object({"name":"Deutsch","code":"de","iso":"de-DE","file":"de/de","img":"/assets/img/flags/germany-48.png","path":undefined}),Object({"name":"English","code":"en","iso":"en-GB","file":"en/en","img":"/assets/img/flags/great-britain-48.png","path":undefined}),Object({"name":"Français","code":"fr","iso":"fr-FR","file":"fr/fr","img":"/assets/img/flags/france-48.png","path":undefined})]
  nuxtI18nOptions.defaultLocale = "en"
  nuxtI18nOptions.defaultDirection = "ltr"
  nuxtI18nOptions.routesNameSeparator = "___"
  nuxtI18nOptions.trailingSlash = false
  nuxtI18nOptions.defaultLocaleRouteNameSuffix = "default"
  nuxtI18nOptions.strategy = "prefix"
  nuxtI18nOptions.lazy = true
  nuxtI18nOptions.langDir = "lang/"
  nuxtI18nOptions.rootRedirect = null
  nuxtI18nOptions.detectBrowserLanguage = Object({"alwaysRedirect":false,"cookieCrossOrigin":false,"cookieDomain":null,"cookieKey":"i18n_redirected","cookieSecure":false,"fallbackLocale":"","redirectOn":"root","useCookie":true})
  nuxtI18nOptions.differentDomains = false
  nuxtI18nOptions.baseUrl = ""
  nuxtI18nOptions.dynamicRouteParams = false
  nuxtI18nOptions.customRoutes = "page"
  nuxtI18nOptions.pages = Object({})
  nuxtI18nOptions.skipSettingLocaleOnNavigate = false
  nuxtI18nOptions.onBeforeLanguageSwitch = (() => "")
  nuxtI18nOptions.onLanguageSwitched = (() => null)
  nuxtI18nOptions.types = undefined
  nuxtI18nOptions.debug = false
  return nuxtI18nOptions
}

export const nuxtI18nOptionsDefault = Object({vueI18n: undefined,locales: [],defaultLocale: "",defaultDirection: "ltr",routesNameSeparator: "___",trailingSlash: false,defaultLocaleRouteNameSuffix: "default",strategy: "prefix_except_default",lazy: false,langDir: null,rootRedirect: null,detectBrowserLanguage: Object({"alwaysRedirect":false,"cookieCrossOrigin":false,"cookieDomain":null,"cookieKey":"i18n_redirected","cookieSecure":false,"fallbackLocale":"","redirectOn":"root","useCookie":true}),differentDomains: false,baseUrl: "",dynamicRouteParams: false,customRoutes: "page",pages: Object({}),skipSettingLocaleOnNavigate: false,onBeforeLanguageSwitch: (() => ""),onLanguageSwitched: (() => null),types: undefined,debug: false})

export const nuxtI18nInternalOptions = Object({__normalizedLocales: [Object({"name":"Deutsch","code":"de","iso":"de-DE","file":"de/de","img":"/assets/img/flags/germany-48.png","path":undefined}),Object({"name":"English","code":"en","iso":"en-GB","file":"en/en","img":"/assets/img/flags/great-britain-48.png","path":undefined}),Object({"name":"Français","code":"fr","iso":"fr-FR","file":"fr/fr","img":"/assets/img/flags/france-48.png","path":undefined})]})
export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const isSSG = false
export const isSSR = true
