import { ExceptionInterface } from "./ExceptionInterface";

export class UnauthorizedException extends Error implements ExceptionInterface {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }
    getMessage():string{
        return "The user is unauthorized, please verify user access to the resource";
    }
    getTranslationKey():string{
        return 'unauthorized_error';
    }
    getRealMessage():string{
        return this.message;
    }
}