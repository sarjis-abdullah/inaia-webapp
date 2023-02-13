import { StorageInterface } from "./StorageInterface";
import { StorageItem } from "./StorageInterface";
export class SessionStorage implements StorageInterface{
    private static instance:SessionStorage;
    public static createSessionStorage():SessionStorage{
        if(!this.instance)
        {
            this.instance = new SessionStorage();
        }
        return this.instance;
    }
    public addItem(key : string,value: string) : void{
        sessionStorage.setItem(key,value);
    }
    public addMultipleItems(items:Array<StorageItem>) : void{
        items.forEach((item)=>{
            sessionStorage.setItem(item.key,item.value?item.value:"");
        }
        )
    }
    public removeItem(key:string):void{
        sessionStorage.removeItem(key);
    }
    public removeMultipleItems(keys :Array<string>) : void{
        keys.forEach(key=>{
            sessionStorage.removeItem(key);
        })
    }
    public getItem(key:string):string | null{
        return sessionStorage.getItem(key);
    }
    public getItems(keys:Array<string>):Array<StorageItem>{
        let data = new Array<StorageItem>();
        keys.forEach(key=>{
            let itemData = sessionStorage.getItem(key);
            data.push({
                key:key,
                value:itemData
            });
        })
        return data;
    }
    public clearAll() : void{
        sessionStorage.clear();
    }
}