import { LoginService } from "~~/lib/services";
import { AccountStorage, LoginStorage } from "~~/storage";
import { urlBuilder } from "./urlBuilder";

export default function(router:any){
    
    LoginService.setIsLoggedIn(false);
        const account = AccountStorage.getAccount();
        let lang = "en";
        if(account && account.account && account.account.settings){
            account.account.settings.forEach(s => {
                if (s.name_translation_key == 'locale') {
                    lang = s.value;
                }
            })
        }
        AccountStorage.clearStorage();
        LoginStorage.clearStorage();
        
        const url = urlBuilder(lang,'/login')
        window.open(url,'_self');
}