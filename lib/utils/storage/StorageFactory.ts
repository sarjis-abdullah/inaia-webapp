import { StorageOptions } from './StorageOptions';
import { StorageInterface } from "./StorageInterface";
import libConfig from "~~/lib/lib.config";
import { SessionStorage } from "./SessionStorage";
export function createStorage(type:string): StorageInterface {
    let storageType = libConfig.storage;
    if(type == StorageOptions.session && storageType=='web')
        return new SessionStorage();
    return new SessionStorage();
}