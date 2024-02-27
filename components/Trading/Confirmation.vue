<template>

<div >
   
    <div  v-if="!confirmed && !expired && !declined">
        <img src="~/assets/img/pageicons/pinscreen.jpg" alt="personal info" class="w-32 h-auto mb-5 mx-auto"/>
        <h2 class="text-center mb-8 text-xl" v-if="PlaceOrderInfo?.order_approval_method.name_translation_key == ConfirmationMethods.mobilePin">{{ $t('confirmwithmobiletext') }}</h2>
        <h2 class="text-center mb-8 text-xl" v-if="PlaceOrderInfo?.order_approval_method.name_translation_key == ConfirmationMethods.email">{{ $t('confirmwithemailtext') }}</h2>
        <h2 class="text-center mb-8 text-xl" v-if="PlaceOrderInfo?.order_approval_method.name_translation_key == ConfirmationMethods.sms">{{ $t('confirmwithsmstext') }}</h2>
        <div v-if="PlaceOrderInfo?.order_approval_method.name_translation_key == ConfirmationMethods.sms || PlaceOrderInfo?.order_approval_method.name_translation_key == ConfirmationMethods.email" class="flex flex-col items-center justify-items-center">
            <CodeInputs  @complete="confirmOrder" :length="4"/>
            <Loading class="mt-4" v-if="isSubmitting"/>
            <InLineApiError :err="confirmErr" />
        </div>

    </div>
    <div v-if="confirmed" class="flex flex-col items-center justify-items-center">
        <video width="320" height="240" autoplay>
            <source src="~/assets/videos/gold_purchase.mp4" type="video/mp4" v-if="orderType == TransactionTypes.purchase">
            <source src="~/assets/videos/gold_sell.mp4" type="video/mp4" v-if="orderType == TransactionTypes.sell">
            <source src="~/assets/videos/gold_delivery.mp4" type="video/mp4" v-if="orderType == TransactionTypes.delivery">
           
            </video>
        <h2 class="text-center mb-8 text-xl">{{ $t("orderconfirmed") }}</h2>
        <button type="submit"  @click.prevent="goToDepot"
                    
                    class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{
                        $t('backToDepot') }}</button>
    </div>
    <div v-if="declined" class="flex flex-col items-center justify-items-center">
        <img src="~/assets/img/icons/error_large.png" alt="personal info" class="w-32 h-auto mb-5 mx-auto"/>
        <h2 class="text-center mb-8 text-xl">{{ $t("orderdeclined") }}</h2>
        <button type="submit"  @click.prevent="goToDepot"
                    
                    class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{
                        $t('backToDepot') }}</button>
    </div>
    <div v-if="expired">
        <img src="~/assets/img/icons/error_houston.png" alt="personal info" class="w-32 h-auto mb-5 mx-auto"/>
        <h2 class="text-center mb-8 text-xl">{{ $t("orderexpired") }}</h2>
    </div>
    <div class="mt-12" v-if="!confirmed && !declined">
        <p class="text-center text-gray-600">{{ $t('donthaveaccesstoconfirmationmethod') }} {{ PlaceOrderInfo?.order_approval_method.translated_name }} ? 
            <a class="text-blue-600 font-semibold underline underline-offset-2 cursor-pointer" @click="changeConfirmationMethod">{{ $t('changeconfirmationmethod') }}</a></p>
        
        <div class="mt-4" v-if="showChangeConfirmationMethod">
            <ConfirmationMethodSelect class="my-4" @onConfirmationMethodSet="setNewConfirmationMethod"/>
                <button type="submit" :disabled="isSubmitting || !newConfirmationMethod" @click.prevent="replaceOrder"
                    :class="(isSubmitting || !newConfirmationMethod) ? 'opacity-50' : 'opacity-100'"
                    class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{
                        $t('confirm') }}</button>
                <InLineApiError :err="submitErr" />
            </div>
    </div>
    </div>
    
</template>
<script lang="ts" setup>
import CodeInputs from '@/components/Register/CodeInputs';
import Loading from '@/components/common/Loading';
import { PropType,Ref } from 'vue';
import { ConfirmationMethod, Order, PlaceOrderModel } from '@/lib/models';
import { ConfirmationMethods } from '@/lib/contants';
import { AssetTradingService } from '@/lib/services';
import { ConfirmOrderRequest, PlaceOrderRequest, TransferAssetRequest } from '@/lib/requests';
import  ConfirmationMethodSelect  from '@/components/Trading/ConfirmationMethodSelect'
import InLineApiError from '@/components/common/InLineApiError';
import { TransactionTypes } from '@/lib/contants';
const props = defineProps({
    placedOrder:{
        type: Object as PropType<PlaceOrderModel>
    },
    placedOrderRequest:{
        type: Object as PropType<PlaceOrderRequest | TransferAssetRequest>
    },
    orderType:{
        type: String
    },
    isTransfer:{
        type: Boolean,
        default:false
    }
})
const emit = defineEmits<{
  (e: 'onConfirm',order:Order): void
}>()
const interval = ref({} as any);
const confirmed = ref(false);
const expired = ref(false);
const declined = ref(false);
const timeout = ref(null);
const isSubmitting = ref(false);
const submitErr = ref(null);
const confirmErr = ref(null);
const showChangeConfirmationMethod = ref(false);
const PlaceOrderInfo :Ref<PlaceOrderModel> = ref(null);
const changeConfirmationMethod = ()=>{
    showChangeConfirmationMethod.value = true;
}
const newConfirmationMethod : Ref<ConfirmationMethod>= ref(null)
const setExpirationTimeOut = (placedOrder:PlaceOrderModel)=>{
    if(timeout.value){
        clearTimeout(timeout.value);
    }
    if(interval.value){
        clearInterval(interval.value)
    }
    if(expired.value){
        expired.value = false;
        confirmed.value = false;
    }
    timeout.value = setTimeout(()=>{
        if(!confirmed.value){
            expired.value = true
        }
    },300000)
    if(placedOrder && placedOrder.order_approval_method.name_translation_key == ConfirmationMethods.mobilePin){
        interval.value = setInterval(async ()=>{
            if(!expired.value){
                const data = await AssetTradingService.getPendingTradings();
                let pendingOrder = data.find(p=>p.approval_id == PlaceOrderInfo.value?.approval_id);
                if(pendingOrder){
                    if(pendingOrder.is_approved)
                    {
                        confirmed.value = true;
                        clearTimeout(timeout.value);
                        clearInterval(interval.value);
                    }
                }
                else{
                    declined.value = true;
                    clearTimeout(timeout.value);
                    clearInterval(interval.value);
                }
            }
            else{
                clearInterval(interval.value);
            }
        },5000)
    }
}
const goToDepot=()=>{
    history.back();
}
const setNewConfirmationMethod = (value:ConfirmationMethod)=>{
    newConfirmationMethod.value = value;
}
const confirmOrder= async (pin:number)=>{
    try{
        isSubmitting.value = true;
        const request : ConfirmOrderRequest = {
            ...PlaceOrderInfo.value.payload,
            pin:pin.toString(),
            approval_id:PlaceOrderInfo.value.approval_id
        }
        await AssetTradingService.confirmOrder(request);
        confirmed.value = true;
        if(timeout.value){
            clearTimeout(timeout.value);
        }
        if(interval.value){
            clearInterval(interval.value)
        }
    }
    catch(err:any){
        confirmErr.value = err;
    }
    finally{
        isSubmitting.value = false
    }
}
const replaceOrder = async ()=>{
    const request = {...props.placedOrderRequest};
    
    if(newConfirmationMethod)
        request.order_approval_method = newConfirmationMethod.value.name_translation_key
    try{
        isSubmitting.value = true;
        if(!props.isTransfer)
            PlaceOrderInfo.value = await AssetTradingService.placeOrder(request);
        else{
            PlaceOrderInfo.value = await AssetTradingService.transferOrder(request);
        }

        setExpirationTimeOut(PlaceOrderInfo.value);
        showChangeConfirmationMethod.value = false;
        newConfirmationMethod.value = null;
    }
    catch(err:any){
        submitErr.value = err;
    }
    finally{
        isSubmitting.value = false
    }
}
onMounted(async()=>{
    if(props.placedOrder)
        PlaceOrderInfo.value = props.placedOrder;
    setExpirationTimeOut(props.placedOrder)
})
onUnmounted(()=>{
    clearTimeout(timeout.value);
    clearInterval(interval.value);
})
</script>

