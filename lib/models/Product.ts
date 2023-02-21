
interface ProductSpecValue{
    id:number;
    product_spec_id:number;
    country_id:number;
    value:any;
    unit:any
}
interface ProductSpec{
    id:number;
    product_id:number;
    plan_id:number;
    name:string;
    translated_name:string;
    sort_order:number;
    hidden:number;
    product_spec_values:Array<ProductSpecValue>;

}
export interface Product{
    id:number;
    name_translation_key:string;
    product_specs:Array<ProductSpec>
}