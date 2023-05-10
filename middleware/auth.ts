import { LoginStorage } from "~~/storage/LoginStorage"

export default defineNuxtComponent((to,from)=>{
    let token = LoginStorage.getToken();
    if(!token){
        return navigateTo('/login');
    }
})