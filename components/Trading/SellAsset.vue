<template>
    <div>
        <h2 class="text-center mb-8 text-2xl font-bold">{{ $t('asset_sell') }}</h2>
        <DepotSelect @onDepotSet="onDepotSelected" :depotID="depotId"></DepotSelect>
        <h3 class="text-center mt-8 text-2xl font-bold">{{ $n(amount / 1000) }} g</h3>
        <div class="flex flex-col items-center justify-items-center mt-3">
            <div class="flex flex-row items-center justify-items-center">
            <p class="text-center text-l text-gray-700" v-if="!loadTradeableAmount && tradeableAmount!=null">{{ $t('from') }} : {{ $n(tradeableAmount.tradeable_gram_amount/1000) }} g
            </p>
            <a class="ml-1 cursor-pointer" v-if="!loadTradeableAmount && tradeableAmount!=null && tradeableAmount.total_blocked_gram_amount > 0" @click="openTradeableDetails">
                                <InformationCircleIcon class="w-6 text-gray-400" />
                            </a>
        </div>
            <Loading class="mt-3" v-if="loadTradeableAmount"/>
        </div>
        <p class="text-center mt-4 text-l text-red-400" v-show="emptyDepot">{{ $t('availableAmountNonZero') }}
        </p>
        <p class="text-center mt-4 text-l text-red-400" v-show="smallAmount">{{ $t('minimumGoldSellRequired') }}
        </p>
        <p class="text-center mt-4 text-l text-red-400" v-show="exceededAmount">{{ $t('sellGoldWarningText') }}
        </p>
        <p class="text-center mt-4 text-l text-red-400" v-show="lessThan1Amount">{{ $t('youHaveLessThanOneGramSellAll') }}
        </p>
        <keyboard class="mt-8" @onPress="onKeyboardPressed" />
        <div class="mt-8">
            <button type="submit" :disabled="!activated || isSubmitting" @click.prevent="save"
                :class="(!activated || isSubmitting) ? 'opacity-50' : 'opacity-100'"
                class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{
                    $t('showPreview') }}</button>
            <InLineApiError :err="submitErr" />
        </div>
        <Modal :open="showTradeableDetails" @onClose="closeTradeableDetails">
            <TradeableAmountDetail :tradeableInfo="tradeableAmount"/>
        </Modal>
    </div>
</template>
<script lang="ts" setup>
import { AssetTradingService } from '~~/lib/services';
import DepotSelect from '@/components/Trading/DepotSelect.vue'
import TradeableAmountDetail from '@/components/Trading/TradeableAmountDetail.vue'
import Modal from '@/components/common/Modal';
import Loading from '@/components/common/Loading';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';
import Keyboard from '@/components/Trading/Keyboard';
import InLineApiError from '@/components/common/InLineApiError'
import { Depot, OrderPreview, TradeableAmount } from '@/lib/models';
import { Ref } from 'vue'
import { OrderPreviewRequest } from '~~/lib/requests';
import { AssetTypes, OrderTypes, ChannelTypes, ConfirmationMethods, TradingMinimumAmounts } from '@/lib/contants';
import { AccountStorage } from '@/storage';
import { validatePhoneNumber, validateEmail } from '@/lib/utils/Validators'
const amount = ref(0);
const emptyDepot= ref(false);
const lessThan1Amount= ref(false);
const smallAmount= ref(false);
const exceededAmount= ref(false);
const submitErr = ref(null);
const isSubmitting = ref(false)
const showTradeableDetails = ref(false);
const selectedDepot: Ref<Depot> = ref(null);
const confirmationMethod = ref('');
const loadTradeableAmount = ref(false);
const tradeableAmount : Ref<TradeableAmount> = ref(null);
const route = useRoute();
const depotId = route.params.depotid;
const closeTradeableDetails = ()=>{
    showTradeableDetails.value = false;
}
const openTradeableDetails = ()=>{
    showTradeableDetails.value = true;
}
const onDepotSelected = (depot: Depot) => {
    selectedDepot.value = depot;
}
const activated = computed(()=>{
    return (selectedDepot.value!=null && !emptyDepot.value && !smallAmount.value && !exceededAmount.value && amount.value > 0 && tradeableAmount.value && tradeableAmount.value.tradeable_gram_amount>0)
})
watch([selectedDepot], async () => {
    try{
        loadTradeableAmount.value = true
        if(selectedDepot){
            tradeableAmount.value = await AssetTradingService.getTradeableAmount(selectedDepot.value.id);
            if(tradeableAmount.value.tradeable_gram_amount == 0){
                emptyDepot.value = true;
                
            }else{
                emptyDepot.value = false;
            }
            if(tradeableAmount.value.tradeable_gram_amount < TradingMinimumAmounts.minGramAmount){
                    lessThan1Amount.value = true
                    amount.value = tradeableAmount.value.tradeable_gram_amount;
                }
                else{
                    lessThan1Amount.value = false;
                    amount.value = 0
                }
        }
        
    }
    catch(err){

    }
    finally{
        loadTradeableAmount.value = false
    }
})
watch(amount,()=>{
    if(amount.value< TradingMinimumAmounts.minGramAmount && tradeableAmount.value && tradeableAmount.value.tradeable_gram_amount >=TradingMinimumAmounts.minGramAmount ){
        smallAmount.value = true
    }
    else{
        smallAmount.value = false
    }
    if(tradeableAmount && tradeableAmount.value.tradeable_gram_amount < amount.value){
        exceededAmount.value = true;
    }
    else{
        exceededAmount.value = false;
    }
})
const onKeyboardPressed = (value: string) => {
    let newAmount = amount.value.toString();
    if (value == 'back') {
        newAmount = newAmount.substring(0, newAmount.length - 1);
        if (newAmount.length == 0) {
            newAmount = "0";
        }
    } else {
        if (newAmount != '0')
            newAmount += value;
        else
            newAmount = value;
    }
    amount.value = parseInt(newAmount);
}
const emit = defineEmits<{
    (e: 'save', information: any): void
}>()
onMounted(() => {
    const account = AccountStorage.getAccount();
    let hasPin = false;
    let hasEmail = false;
    let hasPhoneNumber = false;
    if (account) {
        hasPin = account.account.has_pin;
        account.channels.forEach(channel => {
            if (channel.type.name_translation_key == ChannelTypes.email) {
                hasEmail = validateEmail(channel.value)
            }
            if (channel.type.name_translation_key == ChannelTypes.mobile) {
                hasPhoneNumber = validatePhoneNumber(channel.value)
            }
        })
    }
    if (hasPin) {
        confirmationMethod.value = ConfirmationMethods.mobilePin;
    }
    else if (hasEmail) {
        confirmationMethod.value = ConfirmationMethods.email;
    }
    else if (hasPhoneNumber) {
        confirmationMethod.value = ConfirmationMethods.sms;
    }
})
const save = async () => {
    let type = OrderTypes.gold_sell;
    if (selectedDepot.value.depot_type?.name_translation_key == AssetTypes.silver) {
        type = OrderTypes.silver_sell;
    }
    const request: OrderPreviewRequest = {
        order_type: type,
        amount: amount.value,
        unit: "EUR",
        depot_id: selectedDepot.value.id
    };
    try {
        isSubmitting.value = true;
        const preview: OrderPreview = await AssetTradingService.getOrderPreview(request);
        emit("save", {
            selectedDepot: selectedDepot.value,
            entredAmount: amount.value,
            preview: preview,
            cMethod: confirmationMethod.value
        })

    }
    catch (err: any) {
        submitErr.value = err;
    }
    finally {
        isSubmitting.value = false
    }

}
</script>
