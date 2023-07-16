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
  "createAccount": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Account erstellen"])};fn.source="Account erstellen";return fn;})(),
  "plan": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Wähle einen Plan aus"])};fn.source="Wähle einen Plan aus";return fn;})(),
  "subscription_info": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Persönliche Daten"])};fn.source="Persönliche Daten";return fn;})(),
  "conditions": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Geschäftsbedingungen"])};fn.source="Geschäftsbedingungen";return fn;})(),
  "accept_email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Wir möchten dich per E-Mail oder auf anderem Wege über Produktupdates und weitere Dienste von INAIA auf dem Laufenden halten. Setze das Häkchen und gib uns deine Zustimmung."])};fn.source="Wir möchten dich per E-Mail oder auf anderem Wege über Produktupdates und weitere Dienste von INAIA auf dem Laufenden halten. Setze das Häkchen und gib uns deine Zustimmung.";return fn;})(),
  "step": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Schritt"])};fn.source="Schritt";return fn;})(),
  "email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["E-Mail"])};fn.source="E-Mail";return fn;})(),
  "password": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Passwort"])};fn.source="Passwort";return fn;})(),
  "password_message": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Das Passwort muss min. aus 8 Zeichen bestehen und Sonderzeichen enthalten."])};fn.source="Das Passwort muss min. aus 8 Zeichen bestehen und Sonderzeichen enthalten.";return fn;})(),
  "name": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Vorname"])};fn.source="Vorname";return fn;})(),
  "surname": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Name"])};fn.source="Name";return fn;})(),
  "referal_code": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Empfehlungscode (optional)"])};fn.source="Empfehlungscode (optional)";return fn;})(),
  "your_country": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Wähle das Land, in dem du behördlich gemeldet bist"])};fn.source="Wähle das Land, in dem du behördlich gemeldet bist";return fn;})(),
  "loading_country_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Fehler: Länder konnten nicht geladen werden."])};fn.source="Fehler: Länder konnten nicht geladen werden.";return fn;})(),
  "features": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Features"])};fn.source="Features";return fn;})(),
  "monthly": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["monatlich"])};fn.source="monatlich";return fn;})(),
  "yearly": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["jährlich"])};fn.source="jährlich";return fn;})(),
  "buy": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Jetzt kaufen"])};fn.source="Jetzt kaufen";return fn;})(),
  "choose_your_plan": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Wähle einen Plan aus"])};fn.source="Wähle einen Plan aus";return fn;})(),
  "no_plans_for_selected_country": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Leider können wir aktuell noch keine Produkte in dem von dir gewählten Land anbieten."])};fn.source="Leider können wir aktuell noch keine Produkte in dem von dir gewählten Land anbieten.";return fn;})(),
  "plan_loading_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Fehler: Pläne konnten nicht geladen werden."])};fn.source="Fehler: Pläne konnten nicht geladen werden.";return fn;})(),
  "plan_pricing": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Preise"])};fn.source="Preise";return fn;})(),
  "register": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Registrieren"])};fn.source="Registrieren";return fn;})(),
  "download_document": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Dokument herunterladen"])};fn.source="Dokument herunterladen";return fn;})(),
  "server_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Unbekannter Fehler: Verusche es später noch einmal."])};fn.source="Unbekannter Fehler: Verusche es später noch einmal.";return fn;})(),
  "error_title": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Fehler"])};fn.source="Fehler";return fn;})(),
  "phone_number": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Mobilnummer"])};fn.source="Mobilnummer";return fn;})(),
  "phone_number_infotext": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Gebe den 4-stelligen Verifizierungscode ein, den wir dir gesendet haben an"])};fn.source="Gebe den 4-stelligen Verifizierungscode ein, den wir dir gesendet haben an";return fn;})(),
  "save": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Speichern"])};fn.source="Speichern";return fn;})(),
  "account_info_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Fehler: Daten konnten nicht gespeichert werden."])};fn.source="Fehler: Daten konnten nicht gespeichert werden.";return fn;})(),
  "registration_success_message": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Dein Account wurde erfolgreich erstellt."])};fn.source="Dein Account wurde erfolgreich erstellt.";return fn;})(),
  "resend_email_code": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Keine E-Mail erhalten? Erneut senden"])};fn.source="Keine E-Mail erhalten? Erneut senden";return fn;})(),
  "resend_phone_code": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Keine SMS erhalten? Erneut senden"])};fn.source="Keine SMS erhalten? Erneut senden";return fn;})(),
  "email_verified": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["E-Mail erfolgreich bestätigt"])};fn.source="E-Mail erfolgreich bestätigt";return fn;})(),
  "phone_number_verified": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Mobilnummer erfolgreich bestätigt."])};fn.source="Mobilnummer erfolgreich bestätigt.";return fn;})(),
  "next": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Weiter"])};fn.source="Weiter";return fn;})(),
  "signin": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Anmelden"])};fn.source="Anmelden";return fn;})(),
  "or": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["oder"])};fn.source="oder";return fn;})(),
  "emailAddress": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["E-Mail Addresse"])};fn.source="E-Mail Addresse";return fn;})(),
  "choose_country": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Wähle das Land, in dem du behördlich gemeldet bist"])};fn.source="Wähle das Land, in dem du behördlich gemeldet bist";return fn;})(),
  "general_conditions": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Allgemeine Geschäftsbedingungen (AGB)"])};fn.source="Allgemeine Geschäftsbedingungen (AGB)";return fn;})(),
  "privacy": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Datenschutzerklärung"])};fn.source="Datenschutzerklärung";return fn;})(),
  "term_of_use": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Nutzungsbedingungen"])};fn.source="Nutzungsbedingungen";return fn;})(),
  "imprint": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Impressum"])};fn.source="Impressum";return fn;})(),
  "enter_address": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Wohnungsanschrift"])};fn.source="Wohnungsanschrift";return fn;})(),
  "line1": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Straße Hausnummer"])};fn.source="Straße Hausnummer";return fn;})(),
  "line2": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Adresszusatz (optional)"])};fn.source="Adresszusatz (optional)";return fn;})(),
  "postalCode": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Postleitzahl"])};fn.source="Postleitzahl";return fn;})(),
  "town": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Stadt"])};fn.source="Stadt";return fn;})(),
  "region": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Bundesland/Region"])};fn.source="Bundesland/Region";return fn;})(),
  "registration_done": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Fertig"])};fn.source="Fertig";return fn;})(),
  "verify_phone": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Mobilnummer bestätigen"])};fn.source="Mobilnummer bestätigen";return fn;})(),
  "verify_email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["E-Mail Adresse bestätigen"])};fn.source="E-Mail Adresse bestätigen";return fn;})(),
  "verify_email_infotext": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Überprüfe deine Inbox und trage hier den Code ein, den wir die per E-Mail zugeschickt haben:"])};fn.source="Überprüfe deine Inbox und trage hier den Code ein, den wir die per E-Mail zugeschickt haben:";return fn;})(),
  "rest_password_title": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Reset your password"])};fn.source="Reset your password";return fn;})(),
  "email_is_required": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Please provide an email"])};fn.source="Please provide an email";return fn;})(),
  "new_password": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["New password"])};fn.source="New password";return fn;})(),
  "password_is_required": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Please provide a new password"])};fn.source="Please provide a new password";return fn;})(),
  "confirm_password": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Confirm your new password"])};fn.source="Confirm your new password";return fn;})(),
  "confirm_password_is_required": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Please confirm your new password"])};fn.source="Please confirm your new password";return fn;})(),
  "password_reset_with_success": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Password was reset successfully"])};fn.source="Password was reset successfully";return fn;})(),
  "confirm": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Confirm"])};fn.source="Confirm";return fn;})(),
  "pin_reset_successfully": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Pin rest successfully, please login to the app again to set a new pin"])};fn.source="Pin rest successfully, please login to the app again to set a new pin";return fn;})(),
  "resetting_pin": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["We are resetting your pin, please wait and don't leave the page.."])};fn.source="We are resetting your pin, please wait and don't leave the page..";return fn;})(),
  "error_resetting_pin": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Error restting your pin"])};fn.source="Error restting your pin";return fn;})(),
  "reset_pin": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Reset your pin"])};fn.source="Reset your pin";return fn;})(),
  "error_resetting_pin_no_token": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["No token or email was availabe to rest your pin"])};fn.source="No token or email was availabe to rest your pin";return fn;})()
},"en":{
  "createAccount": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Create your account"])};fn.source="Create your account";return fn;})(),
  "plan": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Choose your plan"])};fn.source="Choose your plan";return fn;})(),
  "subscription_info": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Personal data"])};fn.source="Personal data";return fn;})(),
  "conditions": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Approve our conditions"])};fn.source="Approve our conditions";return fn;})(),
  "accept_email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["We would like to keep you informed about product updates and other services from INAIA via email or other means. Check the box and give us your consent."])};fn.source="We would like to keep you informed about product updates and other services from INAIA via email or other means. Check the box and give us your consent.";return fn;})(),
  "step": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Step"])};fn.source="Step";return fn;})(),
  "email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Email"])};fn.source="Email";return fn;})(),
  "password": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Password"])};fn.source="Password";return fn;})(),
  "password_message": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Your password must be at least 8 character long and must contains special characters"])};fn.source="Your password must be at least 8 character long and must contains special characters";return fn;})(),
  "name": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Name"])};fn.source="Name";return fn;})(),
  "surname": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Surname"])};fn.source="Surname";return fn;})(),
  "referal_code": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Referal code"])};fn.source="Referal code";return fn;})(),
  "your_country": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Country of your residence"])};fn.source="Country of your residence";return fn;})(),
  "loading_country_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Server error: We couldn't load country list."])};fn.source="Server error: We couldn't load country list.";return fn;})(),
  "features": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Features"])};fn.source="Features";return fn;})(),
  "monthly": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["monthly"])};fn.source="monthly";return fn;})(),
  "yearly": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["yearly"])};fn.source="yearly";return fn;})(),
  "buy": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Buy"])};fn.source="Buy";return fn;})(),
  "choose_your_plan": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Choose your plan and start saving Gold today"])};fn.source="Choose your plan and start saving Gold today";return fn;})(),
  "no_plans_for_selected_country": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["There is no plans for the selected country, please choose another country"])};fn.source="There is no plans for the selected country, please choose another country";return fn;})(),
  "plan_loading_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["We couldn't load plans, cause of server error"])};fn.source="We couldn't load plans, cause of server error";return fn;})(),
  "plan_pricing": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Pricing Plans"])};fn.source="Pricing Plans";return fn;})(),
  "register": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Register"])};fn.source="Register";return fn;})(),
  "download_document": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Download document"])};fn.source="Download document";return fn;})(),
  "server_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Something bad happened please try again later"])};fn.source="Something bad happened please try again later";return fn;})(),
  "error_title": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Error"])};fn.source="Error";return fn;})(),
  "phone_number": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Phone number"])};fn.source="Phone number";return fn;})(),
  "save": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Save"])};fn.source="Save";return fn;})(),
  "account_info_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["We couldn't save the information please try again later"])};fn.source="We couldn't save the information please try again later";return fn;})(),
  "registration_success_message": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Thank you for your registration, to start using INAIA system you can download our apo for ISTORE or Google Play."])};fn.source="Thank you for your registration, to start using INAIA system you can download our apo for ISTORE or Google Play.";return fn;})(),
  "resend_email_code": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Resend email code"])};fn.source="Resend email code";return fn;})(),
  "resend_phone_code": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Resend phone number code"])};fn.source="Resend phone number code";return fn;})(),
  "email_verified": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Email verified"])};fn.source="Email verified";return fn;})(),
  "phone_number_verified": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Phone number verified"])};fn.source="Phone number verified";return fn;})(),
  "next": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Next"])};fn.source="Next";return fn;})(),
  "choose_country": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Choose your country"])};fn.source="Choose your country";return fn;})(),
  "line1": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Street / House no."])};fn.source="Street / House no.";return fn;})(),
  "line2": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Addition to address (optional)"])};fn.source="Addition to address (optional)";return fn;})(),
  "postalCode": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Postcode"])};fn.source="Postcode";return fn;})(),
  "town": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["City"])};fn.source="City";return fn;})(),
  "region": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["State"])};fn.source="State";return fn;})(),
  "general_conditions": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["General conditions"])};fn.source="General conditions";return fn;})(),
  "privacy": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Privacy policy"])};fn.source="Privacy policy";return fn;})(),
  "term_of_use": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Terms of use"])};fn.source="Terms of use";return fn;})(),
  "imprint": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Imprint"])};fn.source="Imprint";return fn;})(),
  "enter_address": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Your address"])};fn.source="Your address";return fn;})(),
  "registration_done": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Congratulations"])};fn.source="Congratulations";return fn;})(),
  "verify_phone": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Confirm your phone number"])};fn.source="Confirm your phone number";return fn;})(),
  "verify_email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Confirm your email"])};fn.source="Confirm your email";return fn;})(),
  "rest_password_title": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Reset your password"])};fn.source="Reset your password";return fn;})(),
  "email_is_required": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Please provide an email"])};fn.source="Please provide an email";return fn;})(),
  "new_password": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["New password"])};fn.source="New password";return fn;})(),
  "password_is_required": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Please provide a new password"])};fn.source="Please provide a new password";return fn;})(),
  "confirm_password": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Confirm your new password"])};fn.source="Confirm your new password";return fn;})(),
  "confirm_password_is_required": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Please confirm your new password"])};fn.source="Please confirm your new password";return fn;})(),
  "password_reset_with_success": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Password was reset successfully"])};fn.source="Password was reset successfully";return fn;})(),
  "confirm": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Confirm"])};fn.source="Confirm";return fn;})(),
  "pin_reset_successfully": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Pin rest successfully, please login to the app again to set a new pin"])};fn.source="Pin rest successfully, please login to the app again to set a new pin";return fn;})(),
  "resetting_pin": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["We are resetting your pin, please wait and don't leave the page.."])};fn.source="We are resetting your pin, please wait and don't leave the page..";return fn;})(),
  "error_resetting_pin": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Error restting your pin"])};fn.source="Error restting your pin";return fn;})(),
  "reset_pin": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Reset your pin"])};fn.source="Reset your pin";return fn;})(),
  "error_resetting_pin_no_token": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["No token or email was availabe to rest your pin"])};fn.source="No token or email was availabe to rest your pin";return fn;})()
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
