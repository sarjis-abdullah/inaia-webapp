<template>
   
        <div>
            <h2 class="text-center mb-8 text-2xl font-bold">{{ $t('buy_assets') }}</h2>
            <DepotSelect @onDepotSet="onDepotSelected" :depotID="depotId"></DepotSelect>
            <h3 class="text-center mt-8 text-2xl font-bold">{{ $n(amount/100) }} {{ currency }}</h3>
            <p class="text-center mt-4 text-l text-red-400" v-show="error">{{ $t('minimumAmountRequired',{currency:currency}) }}</p>
            
            <PaymentMethodSelect @onPaymentMethodSet="onPaymentMethodSet" class="mt-8"/>
            
            <PaymentAccountSelect v-if="paymentMethod == PaymentMethods.bankAccount" class="mt-8"  @onPaymentAccountSet="onPaymentAccountSet"/>
            <keyboard class="mt-8" @onPress="onKeyboardPressed"/>
            <div class="mt-8">
                  <button type="submit" :disabled="!activated || isSubmitting" @click.prevent="save"
                      :class="(!activated || isSubmitting)?'opacity-50':'opacity-100'"
                      class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{ $t('showPreview') }}</button>
                    <InLineApiError :err="submitErr"/>
                </div>
        
    </div>
</template>
<script lang="ts" setup>
import { AssetTradingService, CurrencyService } from '~~/lib/services';
import DepotSelect from '@/components/Trading/DepotSelect.vue'
import PaymentMethodSelect from '@/components/PaymentMethod/PaymentMethodSelect.vue';
import { PaymentMethods } from '@/lib/contants/PaymentMethods';
import PaymentAccountSelect from '@/components/PaymentAccount/PaymentAccountSelect';
import Keyboard from '@/components/Trading/Keyboard';
import InLineApiError from '@/components/common/InLineApiError'
import { ConfirmationMethod, Depot,OrderPreview,PaymentAccount } from '@/lib/models';
import {Ref} from 'vue'
import { OrderPreviewRequest } from '~~/lib/requests';
import { AssetTypes, OrderTypes, ChannelTypes,ConfirmationMethods,TradingMinimumAmounts} from '@/lib/contants';
import { OrderListTypes } from '~~/constants/OrderListTypes';
import { AccountStorage } from '@/storage';
import { validatePhoneNumber,validateEmail} from '@/lib/utils/Validators';
const amount = ref(0);
const currency = CurrencyService.getCurrencySymbol();
const error = ref(false);
const paymentMethod = ref('');
const submitErr = ref(null);
const isSubmitting = ref(false)
const activated = ref(false);
const selectedDepot : Ref<Depot> = ref(null);
const selectedPaymentAccount :Ref<PaymentAccount> = ref(null);
const confirmationMethod = ref('')
const route = useRoute();
const depotId = route.params.depotid;
const onDepotSelected = (depot:Depot)=>{
    selectedDepot.value = depot;
}
const confirmationMethodSet = (value:ConfirmationMethod)=>{
    confirmationMethod.value = value
}
const onPaymentMethodSet = (value:string)=>{
    paymentMethod.value = value
}
const onPaymentAccountSet = (value:PaymentAccount)=>{
    selectedPaymentAccount.value = value
}
watch([selectedDepot,amount,paymentMethod,selectedPaymentAccount],()=>{
    if(amount.value > 0 && amount.value<TradingMinimumAmounts.minMoneyAmount){
        error.value = true
    }
    else{
        error.value = false;
    }
    if(amount.value>=TradingMinimumAmounts.minMoneyAmount && paymentMethod!=null && selectedDepot.value){
        if(paymentMethod.value == PaymentMethods.bankAccount){
            if(selectedPaymentAccount){
                activated.value = true;
            }
        }
        else{
            activated.value = true;
        }
    }
    else{
        activated.value = false;
    }
})

const onKeyboardPressed = (value:string)=>{
    let newAmount = amount.value.toString();
    if(value == 'back'){
        newAmount = newAmount.substring(0, newAmount.length - 1);
            if(newAmount.length==0)
            {
                newAmount="0";
            }
    }else{
        if(newAmount!='0')
            newAmount+=value;
        else
            newAmount = value;
    }
    amount.value = parseInt(newAmount);
}
const emit = defineEmits<{
  (e: 'save',information:any): void
}>()
onMounted(()=>{
    const account = AccountStorage.getAccount();
    let hasPin = false;
    let hasEmail = false;
    let hasPhoneNumber = false;
    if(account){
            hasPin = account.account.has_pin;
            account.channels.forEach(channel=>{
                if(channel.type.name_translation_key == ChannelTypes.email){
                    hasEmail = validateEmail(channel.value)
                }
                if(channel.type.name_translation_key == ChannelTypes.mobile){
                    hasPhoneNumber = validatePhoneNumber(channel.value)
                }
            })
        }
    if(hasPin){
        confirmationMethod.value = ConfirmationMethods.mobilePin;
    }
    else if(hasEmail){
        confirmationMethod.value = ConfirmationMethods.email;
    }
    else if(hasPhoneNumber){
        confirmationMethod.value = ConfirmationMethods.sms;
    }
})
const save = async ()=>{
    let type = OrderTypes.gold_purchase;
    if(selectedDepot.value.depot_type?.name_translation_key.toUpperCase() == AssetTypes.silver.toUpperCase()){
        type = OrderTypes.silver_purchase;
    }
    const request : OrderPreviewRequest = {
        order_type:type,
        amount:amount.value,
        unit:"EUR",
        depot_id:selectedDepot.value.id
    };
    try{
        isSubmitting.value = true;
        const preview : OrderPreview = await AssetTradingService.getOrderPreview(request);
        emit("save",{
            selectedDepot:selectedDepot.value,
            entredAmount:amount.value,
            selecedPaymentMethod:paymentMethod.value,
            selectedPaymentAccount:selectedPaymentAccount.value,
            preview:preview,
            cMethod:confirmationMethod.value
        })

    }
    catch(err:any){
        submitErr.value = err;
    }
    finally{
        isSubmitting.value = false
    }
    
}
</script>
