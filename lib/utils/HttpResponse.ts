
interface Links {
    first?:string,
    last?:string,
    next?:string,
    prev?:string
}
interface Meta {
    current_page?: number,
    form?: number,
    last_page?:number,
    per_page?:number,
    to?:number,
    total?:number
}
export interface HttpResponse{
    data?:any,
    links?:Links,
    meta:Meta
}