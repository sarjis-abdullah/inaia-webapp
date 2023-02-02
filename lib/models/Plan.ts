interface FeeDeetail{
    value:Number,
    unit:String
}
interface Fee{
    monthly:FeeDeetail,
    yearly:FeeDeetail
}
interface PlanDetail{
    verbose:String;
    active:Boolean
}
export interface Plan {
    id:Number,
    name:String,
    icon:String,
    sort_order:Number,
    details:Array<PlanDetail>,
    fee:Fee,
    payment_cycle:Array<String>
}