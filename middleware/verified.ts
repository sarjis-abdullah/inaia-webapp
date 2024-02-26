import { AccountStorage } from '@/storage/AccountStorage';


export default defineNuxtRouteMiddleware((to,from)=>{
    
    if (process.server) return;
   
    let account = AccountStorage.getAccount();
    if(account){
        if(account.is_verified){
            return;
        }
        else{
            return navigateTo(from);
        }
    }
    else{
        return navigateTo(from);
    }
})