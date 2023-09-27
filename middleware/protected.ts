import { LoginService } from "~~/lib/services";
import { LoginStorage } from "~~/storage/LoginStorage"

export default defineNuxtRouteMiddleware((to,from)=>{
    
    if (process.server) return;
   
    let token = LoginStorage.getToken();
    if(!token){
        return navigateTo('/login')
    }
    else{
        return;
    }
})