import { IListener } from "../listeners/IListener";

export class EventRegistry{
    static listners:IListener[] = [];
    public static registerListner(listner: IListener) : number{
        const id = this.listners.length + 1;
        listner.setId(id);
        this.listners.push(listner);
        return id;
    }
    public static removeListner(id:number){
        const listnerIndex = this.listners.findIndex(l=>l.getId() == id);
        if(listnerIndex > -1){
            this.listners.splice(listnerIndex,1);
        }
    }
    public static fire(name:string){
        this.listners.forEach(l=>{
            if(l.getEventName() == name){
                l.handle();
            }
        })
    }
    public static clearListeners(){
        this.listners = [];
    }
}