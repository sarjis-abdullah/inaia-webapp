import { LoginStorage } from "~~/storage/LoginStorage"

export default defineNuxtRouteMiddleware((to,from)=>{
    let token = LoginStorage.getToken();
    if(token){
        if(to.path.indexOf('/login')!=-1){
            return navigateTo('dashboard')
        }
    }
})