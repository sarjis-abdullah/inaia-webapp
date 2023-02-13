export interface Document {
    id:number,
    link:string
}
export interface Condition {
    id:number,
    title:string,
    document?:Document
}