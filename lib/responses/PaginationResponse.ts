export interface PaginationResponse<T>{
    currentPage:number,
    lastPage:number,
    data:Array<T>
}