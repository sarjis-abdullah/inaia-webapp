import { EventList } from "./EventList";
import { EventRegistry } from "./EventRegistry";

export class UnauthenticatedEvent {
    private  eventName = EventList.unauthenticated;
    constructor(){
        EventRegistry.fire(this.eventName);
    }
}