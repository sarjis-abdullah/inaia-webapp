export interface NewPasswordRequest{
    email : string;
    token : string;
    password : string;
    password_confirmation : string;
}