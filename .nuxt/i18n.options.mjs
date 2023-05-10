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
  "accept_email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Wir möchten dich per E-Mail oder auf anderem Wege über Produktupdates und weitere Dienste von INAIA auf dem Laufenden halten. Setze das Häkchen und gib uns deine Zustimmung."])};fn.source="Wir möchten dich per E-Mail oder auf anderem Wege über Produktupdates und weitere Dienste von INAIA auf dem Laufenden halten. Setze das Häkchen und gib uns deine Zustimmung.";return fn;})(),
  "step": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Step"])};fn.source="Step";return fn;})(),
  "confirm_information": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Confirm your information"])};fn.source="Confirm your information";return fn;})(),
  "email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Email"])};fn.source="Email";return fn;})(),
  "password": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Password"])};fn.source="Password";return fn;})(),
  "password_message": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Your password must be at least 6 character long and must contains special characters"])};fn.source="Your password must be at least 6 character long and must contains special characters";return fn;})(),
  "name": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Name"])};fn.source="Name";return fn;})(),
  "surname": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Surname"])};fn.source="Surname";return fn;})(),
  "referal_code": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Referal code"])};fn.source="Referal code";return fn;})(),
  "your_country": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Your country"])};fn.source="Your country";return fn;})(),
  "loading_country_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["We couldn't load countries, cause of server error"])};fn.source="We couldn't load countries, cause of server error";return fn;})(),
  "features": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Features"])};fn.source="Features";return fn;})(),
  "monthly": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["mo"])};fn.source="mo";return fn;})(),
  "year": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["year"])};fn.source="year";return fn;})(),
  "buy": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Buy"])};fn.source="Buy";return fn;})(),
  "choose_your_plan": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Choose your plan and start saving Gold today"])};fn.source="Choose your plan and start saving Gold today";return fn;})(),
  "monthly_billing": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Monthly billing"])};fn.source="Monthly billing";return fn;})(),
  "yearly_billing": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Yearly billing"])};fn.source="Yearly billing";return fn;})(),
  "please_choose_plan": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Please choose your plan"])};fn.source="Please choose your plan";return fn;})(),
  "no_plans_for_selected_country": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["There is no plans for the selected country, please choose another country"])};fn.source="There is no plans for the selected country, please choose another country";return fn;})(),
  "plan_loading_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["We couldn't load plans, cause of server error"])};fn.source="We couldn't load plans, cause of server error";return fn;})(),
  "plan_pricing": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Pricing Plans"])};fn.source="Pricing Plans";return fn;})(),
  "register": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Register"])};fn.source="Register";return fn;})(),
  "download_document": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Download document"])};fn.source="Download document";return fn;})(),
  "server_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Es ist ein Fehler aufgetreten: Server error on request"])};fn.source="Es ist ein Fehler aufgetreten: Server error on request";return fn;})(),
  "error_title": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Error"])};fn.source="Error";return fn;})(),
  "phone_number": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Phone number"])};fn.source="Phone number";return fn;})(),
  "save": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Save"])};fn.source="Save";return fn;})(),
  "account_info_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["We couldn't save the information please try again later"])};fn.source="We couldn't save the information please try again later";return fn;})(),
  "registration_success_message": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Thank you for your registration, to start using INAIA system you can download our apo for ISTORE or Google Play."])};fn.source="Thank you for your registration, to start using INAIA system you can download our apo for ISTORE or Google Play.";return fn;})(),
  "verify_email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Verify your email"])};fn.source="Verify your email";return fn;})(),
  "verify_phone_number": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Verify your phone number"])};fn.source="Verify your phone number";return fn;})(),
  "resend_email_code": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Resend email code"])};fn.source="Resend email code";return fn;})(),
  "resend_phone_code": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Resend phone number code"])};fn.source="Resend phone number code";return fn;})(),
  "email_verified": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Email verified"])};fn.source="Email verified";return fn;})(),
  "phone_number_verified": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Phone number verified"])};fn.source="Phone number verified";return fn;})(),
  "next": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Next"])};fn.source="Next";return fn;})(),
  "signin": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Sign in to your account"])};fn.source="Sign in to your account";return fn;})(),
  "or": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Or"])};fn.source="Or";return fn;})(),
  "emailAddress": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Email Address"])};fn.source="Email Address";return fn;})(),
  "rememberMe": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Remember me"])};fn.source="Remember me";return fn;})(),
  "forGotPassword": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Forgot your password?"])};fn.source="Forgot your password?";return fn;})(),
  "signIn": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Sign in"])};fn.source="Sign in";return fn;})(),
  "check_creds": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Login fehlgeschlagen. \nDie Zugangsdaten sind nicht korrekt."])};fn.source="Login fehlgeschlagen. \nDie Zugangsdaten sind nicht korrekt.";return fn;})(),
  "gold_purchase": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Goldkauf"])};fn.source="Goldkauf";return fn;})(),
  "gold_sale": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Goldverkauf"])};fn.source="Goldverkauf";return fn;})(),
  "gold_sell": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Goldverkauf"])};fn.source="Goldverkauf";return fn;})(),
  "gold_withdrawal": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Entnahme"])};fn.source="Entnahme";return fn;})(),
  "gold_delivery": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Auslieferung"])};fn.source="Auslieferung";return fn;})(),
  "gold_gift": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Gutschrift"])};fn.source="Gutschrift";return fn;})(),
  "gold_purchase_interval": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Goldkauf - Sparplan"])};fn.source="Goldkauf - Sparplan";return fn;})(),
  "gold_transfer_in": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Goldtransfer in"])};fn.source="Goldtransfer in";return fn;})(),
  "gold_transfer_out": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Goldtransfer out"])};fn.source="Goldtransfer out";return fn;})(),
  "PAYMENT_IN": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Zahlungseingang"])};fn.source="Zahlungseingang";return fn;})(),
  "PAYMENT_OUT": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["SEPA-Überweisung"])};fn.source="SEPA-Überweisung";return fn;})(),
  "FUND_TRANSFER": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Geldtransfer"])};fn.source="Geldtransfer";return fn;})(),
  "WITHDRAWAL": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Bargeldbezug"])};fn.source="Bargeldbezug";return fn;})(),
  "REDEMPTION": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Karteneinsatz"])};fn.source="Karteneinsatz";return fn;})(),
  "gold_refund": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Erstattung Goldkauf"])};fn.source="Erstattung Goldkauf";return fn;})(),
  "silver_delivery": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silber-Auslieferung"])};fn.source="Silber-Auslieferung";return fn;})(),
  "silver_sell": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silberverkauf"])};fn.source="Silberverkauf";return fn;})(),
  "silver_purchase": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silberkauf"])};fn.source="Silberkauf";return fn;})(),
  "silver_withdrawal": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Entnahme"])};fn.source="Entnahme";return fn;})(),
  "silver_gift": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Gutschrift"])};fn.source="Gutschrift";return fn;})(),
  "silver_purchase_interval": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silberkauf - Sparplan"])};fn.source="Silberkauf - Sparplan";return fn;})(),
  "silver_transfer_in": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silbertransfer in"])};fn.source="Silbertransfer in";return fn;})(),
  "silver_transfer_out": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silbertransfer out"])};fn.source="Silbertransfer out";return fn;})(),
  "silver_refund": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Erstattung Silberkauf"])};fn.source="Erstattung Silberkauf";return fn;})()
},"en":{
  "createAccount": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Create your account"])};fn.source="Create your account";return fn;})(),
  "plan": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Choose your plan"])};fn.source="Choose your plan";return fn;})(),
  "subscription_info": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Enter your information"])};fn.source="Enter your information";return fn;})(),
  "conditions": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Approve our conditions"])};fn.source="Approve our conditions";return fn;})(),
  "accept_email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["We would like to keep you informed about product updates and other services from INAIA via email or other means. Check the box and give us your consent."])};fn.source="We would like to keep you informed about product updates and other services from INAIA via email or other means. Check the box and give us your consent.";return fn;})(),
  "step": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Step"])};fn.source="Step";return fn;})(),
  "confirm_information": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Confirm your information"])};fn.source="Confirm your information";return fn;})(),
  "email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Email"])};fn.source="Email";return fn;})(),
  "password": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Password"])};fn.source="Password";return fn;})(),
  "password_message": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Your password must be at least 6 character long and must contains special characters"])};fn.source="Your password must be at least 6 character long and must contains special characters";return fn;})(),
  "name": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Name"])};fn.source="Name";return fn;})(),
  "surname": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Surname"])};fn.source="Surname";return fn;})(),
  "referal_code": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Referal code"])};fn.source="Referal code";return fn;})(),
  "your_country": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Your country"])};fn.source="Your country";return fn;})(),
  "loading_country_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["We couldn't load countries, cause of server error"])};fn.source="We couldn't load countries, cause of server error";return fn;})(),
  "features": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Features"])};fn.source="Features";return fn;})(),
  "monthly": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["mo"])};fn.source="mo";return fn;})(),
  "year": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["year"])};fn.source="year";return fn;})(),
  "buy": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Buy"])};fn.source="Buy";return fn;})(),
  "choose_your_plan": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Choose your plan and start saving Gold today"])};fn.source="Choose your plan and start saving Gold today";return fn;})(),
  "monthly_billing": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Monthly billing"])};fn.source="Monthly billing";return fn;})(),
  "yearly_billing": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Yearly billing"])};fn.source="Yearly billing";return fn;})(),
  "please_choose_plan": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Please choose your plan"])};fn.source="Please choose your plan";return fn;})(),
  "no_plans_for_selected_country": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["There is no plans for the selected country, please choose another country"])};fn.source="There is no plans for the selected country, please choose another country";return fn;})(),
  "plan_loading_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["We couldn't load plans, cause of server error"])};fn.source="We couldn't load plans, cause of server error";return fn;})(),
  "plan_pricing": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Pricing Plans"])};fn.source="Pricing Plans";return fn;})(),
  "register": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Register"])};fn.source="Register";return fn;})(),
  "download_document": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Download document"])};fn.source="Download document";return fn;})(),
  "server_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["An error has occurred: server error on request."])};fn.source="An error has occurred: server error on request.";return fn;})(),
  "error_title": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Error"])};fn.source="Error";return fn;})(),
  "phone_number": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Phone number"])};fn.source="Phone number";return fn;})(),
  "save": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Save"])};fn.source="Save";return fn;})(),
  "account_info_error": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["We couldn't save the information please try again later"])};fn.source="We couldn't save the information please try again later";return fn;})(),
  "registration_success_message": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Thank you for your registration, to start using INAIA system you can download our apo for ISTORE or Google Play."])};fn.source="Thank you for your registration, to start using INAIA system you can download our apo for ISTORE or Google Play.";return fn;})(),
  "verify_email": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Verify your email"])};fn.source="Verify your email";return fn;})(),
  "verify_phone_number": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Verify your phone number"])};fn.source="Verify your phone number";return fn;})(),
  "resend_email_code": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Resend email code"])};fn.source="Resend email code";return fn;})(),
  "resend_phone_code": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Resend phone number code"])};fn.source="Resend phone number code";return fn;})(),
  "email_verified": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Email verified"])};fn.source="Email verified";return fn;})(),
  "phone_number_verified": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Phone number verified"])};fn.source="Phone number verified";return fn;})(),
  "next": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Next"])};fn.source="Next";return fn;})(),
  "signin": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Sign in to your account"])};fn.source="Sign in to your account";return fn;})(),
  "or": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Or"])};fn.source="Or";return fn;})(),
  "emailAddress": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Email Address"])};fn.source="Email Address";return fn;})(),
  "rememberMe": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Remember me"])};fn.source="Remember me";return fn;})(),
  "forGotPassword": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Forgot your password?"])};fn.source="Forgot your password?";return fn;})(),
  "signIn": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Sign in"])};fn.source="Sign in";return fn;})(),
  "check_creds": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Access denied. \nInvalid credentials."])};fn.source="Access denied. \nInvalid credentials.";return fn;})(),
  "gold_purchase": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Gold purchase"])};fn.source="Gold purchase";return fn;})(),
  "gold_sale": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Gold sell"])};fn.source="Gold sell";return fn;})(),
  "gold_sell": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Gold sell"])};fn.source="Gold sell";return fn;})(),
  "gold_withdrawal": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Gold withdrawal"])};fn.source="Gold withdrawal";return fn;})(),
  "gold_delivery": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Gold delivery"])};fn.source="Gold delivery";return fn;})(),
  "gold_gift": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Gold gift"])};fn.source="Gold gift";return fn;})(),
  "gold_purchase_interval": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Gold Purchase - Recurring"])};fn.source="Gold Purchase - Recurring";return fn;})(),
  "gold_transfer_in": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Gold transfer in"])};fn.source="Gold transfer in";return fn;})(),
  "gold_transfer_out": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Gold transfer out"])};fn.source="Gold transfer out";return fn;})(),
  "PAYMENT_IN": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Payment in"])};fn.source="Payment in";return fn;})(),
  "PAYMENT_OUT": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Payment out"])};fn.source="Payment out";return fn;})(),
  "FUND_TRANSFER": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Fund transfer"])};fn.source="Fund transfer";return fn;})(),
  "WITHDRAWAL": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Withdrawal"])};fn.source="Withdrawal";return fn;})(),
  "REDEMPTION": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Card redemption"])};fn.source="Card redemption";return fn;})(),
  "gold_refund": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Gold refund"])};fn.source="Gold refund";return fn;})(),
  "silver_delivery": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silver delivery"])};fn.source="Silver delivery";return fn;})(),
  "silver_sell": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silver sell"])};fn.source="Silver sell";return fn;})(),
  "silver_purchase": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silver purchase"])};fn.source="Silver purchase";return fn;})(),
  "silver_withdrawal": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silver withdrawal"])};fn.source="Silver withdrawal";return fn;})(),
  "silver_gift": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silver gift"])};fn.source="Silver gift";return fn;})(),
  "silver_purchase_interval": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silver Purchase - Recurring"])};fn.source="Silver Purchase - Recurring";return fn;})(),
  "silver_transfer_in": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silver transfer in"])};fn.source="Silver transfer in";return fn;})(),
  "silver_transfer_out": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silver transfer out"])};fn.source="Silver transfer out";return fn;})(),
  "silver_refund": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["Silver refund"])};fn.source="Silver refund";return fn;})()
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
