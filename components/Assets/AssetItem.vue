<template>
    <a class="flex flex-1 flex-col divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div class="flex flex-1 p-3 items-center">
            <img class="h-16 w-16 flex-shrink-0 rounded-full mr-3" :src="imgUrl"/>
            <div class="flex flex-col flex-1">
               
                    
                    <span class="text-xl text-gray-500">{{ name }}</span>
                    
               
            </div>
            <div class="flex flex-col items-end">
                <span class="font-semibold text-xl">{{ $n(balance) }} {{ currency }}</span>
                <span class="text-l text-gray-500">{{ $n(balanceGramm) }} g</span>
            </div>
        </div>
    </a>
</template>
<script lang="ts" setup>
import {AssetTypes} from '@/lib/contants';
import { PropType,computed } from 'vue';
import { Asset } from '@/lib/models';
import { CurrencyService } from '@/lib/services';
const { t } = useI18n();
const props = defineProps({
    item:{
        type: Object as PropType<Asset>
    }
});
const currency = CurrencyService.getCurrencySymbol();
const imgUrl = computed(()=>{
    if(props.item)
    {
        if(props.item.name == AssetTypes.gold){
            return new URL('~/assets/img/icons/goldbars.png',import.meta.url).href;
        }
        if(props.item.name == AssetTypes.silver){
            return new URL('~/assets/img/icons/silverBars.png',import.meta.url).href;
        }
        if(props.item.name == AssetTypes.euro){
            return new URL('~/assets/img/icons/money.png',import.meta.url).href;
        }
    }
    
})
const symbole = computed(()=>{
    if(props.item)
    {
        if(props.item.name == AssetTypes.euro){
            return 'EUR'
        }
    }
    return "XAU"
    
})
const name = computed(()=>{
    if(props.item)
    {
        if(props.item.name == AssetTypes.gold){
            return t('Gold') +' Dinar'
        }
        if(props.item.name == AssetTypes.silver){
            return t('Silver') +' Dirham'
        }
        if(props.item.name == AssetTypes.euro){
            return 'Euro'
        }
    }
    
}) 
const balance = computed(()=>{
    let balance:number = 0;
    if(props.item)
    {
        if(props.item.name == AssetTypes.gold){
            balance= parseFloat(props.item.gold_in_euro);
        }
        if(props.item.name == AssetTypes.silver){
            balance= parseFloat(props.item.silver_in_euro);
        }
        if(props.item.name == AssetTypes.euro){
            balance=  parseFloat(props.item.amount);
        }
        return balance;
    }
})
const balanceGramm = computed(()=>{
    let balance:number = 0;
    if(props.item)
    {
        if(props.item.name == AssetTypes.gold){
            balance= parseFloat(props.item.amount);
        }
        if(props.item.name == AssetTypes.silver){
            balance= parseFloat(props.item.amount);
        }
        return balance;
    }
}) 
</script>
