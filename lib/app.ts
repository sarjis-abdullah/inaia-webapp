import { appNames } from "./appNames";
import { EventRegistry } from "./events";
import { IListener } from "./listeners/IListener";
import { BaseUrls } from "./utils/BaseUrls";

export class App {
    private static appName = appNames.inaiaEu;
    public static registerListner(listener:IListener):number{
        return EventRegistry.registerListner(listener);
    }
    public static removeListener(id:number){
        EventRegistry.removeListner(id);
    }
    public static clearListeners(){
        EventRegistry.clearListeners()
    }
    public static setAppName(name:appNames){
        BaseUrls.setAppName(name);
        this.appName = name;
    }
    public static getAppName(name:appNames){
        return this.appName;
    }

}