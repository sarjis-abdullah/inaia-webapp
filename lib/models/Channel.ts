interface ChannelType{
    id:number;
    name_translation_key:string;
    value:any;
    targets:string;
}
export interface Channel{
    id:number;
    type_id:number;
    type:ChannelType;
    contact_id:number;
    value:any;
    is_primary:boolean;
    is_active:boolean
}