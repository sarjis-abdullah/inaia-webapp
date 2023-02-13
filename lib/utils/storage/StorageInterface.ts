export interface StorageItem{
    key:string,
    value:string | null
}
export interface StorageInterface {
    addItem(key : string,value: string) : void;
    addMultipleItems(items:Array<StorageItem>) : void;
    removeItem(key:string):void;
    removeMultipleItems(keys :Array<string>) : void;
    getItem(key:string):string | null;
    getItems(keys:Array<string>):Array<StorageItem>
    clearAll() : void;
}