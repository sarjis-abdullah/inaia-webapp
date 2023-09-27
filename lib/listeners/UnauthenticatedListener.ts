import { EventList } from "../events";
import { IListener } from "./IListener";

export class UnauthenticatedListener implements IListener{
    private id:number=0;
    private handler : ()=>void;
    public constructor(handler:()=>void){
        this.handler = handler;
    }
    setId(id: number): void {
        this.id = id;
    }
    getId(): number {
        return this.id;
    }
    getEventName(): string {
        return EventList.unauthenticated;
    }
    public handle(): void 
    {
        this.handler();
    }

}