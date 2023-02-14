import { StorageKeys } from './../lib/utils/storage/StorageKeys';
import { StorageOptions } from './../lib/utils/storage/StorageOptions';
import { createStorage } from '~~/lib/utils/storage/StorageFactory';
import { StorageInterface } from './../lib/utils/storage/StorageInterface';
const verified = 'verified';
const storage:StorageInterface = createStorage(StorageOptions.session);
export function saveStep(step:string){
    storage.addItem(StorageKeys.subscriptionStep,step.toString());
}
export function getStep():number{
    let value = storage.getItem(StorageKeys.subscriptionStep);
    if(value && !isNaN(value)){
        return parseInt(value);
    }
    else{
        return 1;
    }
}
export function saveEmailVerified(){
    storage.addItem(StorageKeys.emailValidated,verified);
}
export function savePhoneVerified(){
    storage.addItem(StorageKeys.phoneValidated,verified);
}
export function isEmailVerified():boolean{
    let data = storage.getItem(StorageKeys.emailValidated);
    return data==verified;
}
export function isPhoneVerified():boolean{
    let data = storage.getItem(StorageKeys.phoneValidated);
    return data==verified;
}
