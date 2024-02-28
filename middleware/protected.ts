import { SupportedLanguages } from "~~/lib/contants";
import { LoginService } from "~~/lib/services";
import { LoginStorage } from "~~/storage/LoginStorage"

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
    let token = LoginStorage.getToken();
    if(!token){
        return navigateTo('/'+lang+'/login')
    }
    else{
        return;
    }
})