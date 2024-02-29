import { DateFilterRequest } from "@/lib/requests/index";

export interface PageRequest extends DateFilterRequest{
    page:number;
    perPage:number;
}