<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="flex flex-row w-full">
  <a @click="goBack"><ArrowSmallLeftIcon class="h-8 text-blue-500 font-bold" v-show="currentStep >1"/></a>
      </div>
          <BuyAsset v-show="currentStep==1" @save="onInformationSet"/>
          <BuySummary 
          v-if="currentStep==2"
          :title="title"
          :orderPreview="prev"
          :depot="depot"
          :amount="amount"
          :PaymentMethod="paymentMethod"
          :PaymentAccount="paymentAccount"
          :type="TransactionTypes.purchase"
          :confirmationMethod="confirmationMethod"
          @onPlace="onBuyingPlaced"
          />
          <Confirmation
            v-if="currentStep==3"
            :placedOrder="placedOrder"
            :placedOrderRequest="placedOrderRequest"
            :orderType="TransactionTypes.purchase"
          />
        </div>
        </div>
      
  </template>
  <script lang="ts" setup>
  import Layout from '@/components/Trading/Layout';
  import BuyAsset from '@/components/Trading/BuyAsset';
  import BuySummary from '@/components/Trading/BuySummary';
  import Confirmation from '@/components/Trading/Confirmation';
  import { Ref } from 'vue';
  import { Depot, OrderPreview, PlaceOrderModel } from '~~/lib/models';
  import { AssetTypes, TransactionTypes } from '@/lib/contants';
  import { PlaceOrderRequest } from '@/lib/requests';
  import { ArrowSmallLeftIcon,ArrowSmallRightIcon } from '@heroicons/vue/24/solid';
  useHead({
        htmlAttrs: {
          class: 'h-full bg-gray-50'
        },
        bodyAttrs: {
          class: 'h-full align-middle'
        }
      })
  definePageMeta({
    layout: "app-layout",
    middleware:['protected','verified'],
  });
  const reachedStep = ref(1);
  const currentStep = ref(1);
  const depot : Ref<Depot> = ref(null);
  const amount = ref(0);
  const paymentMethod = ref('');
  const paymentAccount = ref(null);
  const placedOrder : Ref<PlaceOrderModel> = ref(null)
  const placedOrderRequest : Ref<PlaceOrderRequest> = ref(null)
  const prev  : Ref<OrderPreview> = ref(null);
  const title = ref('');
  const { t } = useI18n();
  const confirmationMethod = ref(null)

  const onInformationSet = ({selectedDepot,entredAmount,selecedPaymentMethod,selectedPaymentAccount,preview,cMethod})=>{
    depot.value = selectedDepot;
    amount.value = entredAmount;
    paymentMethod.value = selecedPaymentMethod;
    paymentAccount.value = selectedPaymentAccount;
    prev.value = preview;
    confirmationMethod.value = cMethod;
    if(depot.value.depot_type?.name_translation_key.toLocaleUpperCase() == AssetTypes.gold.toUpperCase())
    {
      title.value = t('gold_purchase')
    }
    else{
      title.value = t('silver_purchase')
    }
    currentStep.value = 2
    reachedStep.value = 2
  }
    const onStepCahnged = (step:number)=>{
      currentStep.value = step;
      reachedStep.value = step;
  }
  const goBack = ()=>{
    if(currentStep.value > 1){
      currentStep.value--;
    }
  }
  const onBuyingPlaced = (data:any) =>{
    placedOrder.value = data.placedOrderinfo;
    placedOrderRequest.value = data.placeOrderRequest;
    currentStep.value = 3
    reachedStep.value = 3
  }
  </script>