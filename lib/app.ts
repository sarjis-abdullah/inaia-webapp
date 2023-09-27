import { EventRegistry } from "./events";
import { IListener } from "./listeners/IListener";

export class App {
    public static registerListner(listener:IListener):number{
        return EventRegistry.registerListner(listener);
    }
    public static removeListener(id:number){
        EventRegistry.removeListner(id);
    }
    public static clearListeners(){
        EventRegistry.clearListeners()
    }

}