import { ExceptionInterface } from "./ExceptionInterface";

export class TokenExpiredException extends Error implements ExceptionInterface {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, TokenExpiredException.prototype);
    }
    getMessage():string{
        return "User token has been expired, please refresh it or login again";
    }
    getTranslationKey():string{
        return 'token_expired';
    }
    getRealMessage():string{
        return this.message;
    }
}