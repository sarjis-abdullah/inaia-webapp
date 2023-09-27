import { LoginService } from "~~/lib/services";
import { AccountStorage, LoginStorage } from "~~/storage";

export default function(router:any){
    
    LoginService.setIsLoggedIn(false);
        AccountStorage.clearStorage();
        LoginStorage.clearStorage();
        const link = router.resolve('/login');
        const url = "http://"+window.location.host+link.fullPath;
        window.open(url,'_self');
}