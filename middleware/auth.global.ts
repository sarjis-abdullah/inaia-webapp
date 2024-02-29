import { SupportedLanguages } from "~~/lib/contants";
import { LoginStorage } from "~~/storage/LoginStorage"

export default defineNuxtRouteMiddleware((to,from)=>{
    let token = LoginStorage.getToken();
    var match = from.path.match(/^\/(de|en|fr)([\/\?].*)?$/i);
    let lang = 'en';
    if(match && match.length > 0){
        match.forEach(m=>{
            if(SupportedLanguages.indexOf(m)!=-1){
                lang = m;
            }
        })
    }
    if(token){
        if(to.path.indexOf('/login')!=-1){
            return navigateTo('/'+lang+'/dashboard')
        }
    }
})