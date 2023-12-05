import { LoginService } from "~~/lib/services";
import { LoginStorage } from "~~/storage/LoginStorage"

export default defineNuxtRouteMiddleware((to,from)=>{
    
    if (process.server) return;
   
    let token = LoginStorage.getToken();
    if(!token){
        console.log(to);
        return navigateTo('/login')
    }
    else{
        return;
    }
})