import { AccountStorage } from '@/storage/AccountStorage';
import { urlBuilder } from '@/helpers/urlBuilder';
import { SupportedLanguages } from '@/lib/contants';

export default defineNuxtRouteMiddleware((to,from)=>{
    
    if (process.server) return;
    var match = from.path.match(/^\/(de|en|fr)([\/\?].*)?$/i);
    let lang = 'en';
    if(match && match.length > 0){
        match.forEach(m=>{
            if(SupportedLanguages.indexOf(m)!=-1){
                lang = m;
            }
        })
    }
    const url = urlBuilder(lang,'/profile/verify');
    let account = AccountStorage.getAccount();
    if(account){
        if(account.is_verified){
            return;
        }
        else{
            window.open(url,'_self')
        }
    }
    else{
        navigateTo('/'+lang+'/profile/verify')
    }
})