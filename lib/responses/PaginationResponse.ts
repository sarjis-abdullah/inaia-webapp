export interface PaginationResponse<T>{
    currentPage?:number,
    lastPage?:number,
    total?:number,
    data:Array<T>
}