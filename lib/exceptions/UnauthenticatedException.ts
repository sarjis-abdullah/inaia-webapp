import { ExceptionInterface } from "./ExceptionInterface";

export class UnauthenticatedException extends Error implements ExceptionInterface {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, UnauthenticatedException.prototype);
    }
    getMessage():string{
        return "The user is unauthentificated, please verify user credentials or user token";
    }
    getTranslationKey():string{
        return 'unauthenticated_error';
    }
    getRealMessage():string{
        return this.message;
    }
}