import { StorageKeys } from './../lib/utils/storage/StorageKeys';
import { StorageOptions } from './../lib/utils/storage/StorageOptions';
import { createStorage } from '~~/lib/utils/storage/StorageFactory';
import { StorageInterface } from './../lib/utils/storage/StorageInterface';

export function saveStep(step:string){
    const storage:StorageInterface = createStorage(StorageOptions.session);
    storage.addItem(StorageKeys.subscriptionStep,step.toString());
}
export function getStep():number{
    const storage:StorageInterface = createStorage(StorageOptions.session);
    let value = storage.getItem(StorageKeys.subscriptionStep);
    if(value && !isNaN(value)){
        return parseInt(value);
    }
    else{
        return 1;
    }
}
