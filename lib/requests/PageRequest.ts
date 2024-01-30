import { DateFilterRequest } from "./DateFilterRequest";

export interface PageRequest extends DateFilterRequest{
    page:number;
    perPage:number;
}