export interface IListener{
    setId(id:number) : void;
    getId() : number;
    getEventName() : string;
    handle():void;
}