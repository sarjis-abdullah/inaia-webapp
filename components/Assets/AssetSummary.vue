<template>
    <a class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
        <div class="flex flex-1 flex-col p-8">
            <img class="mx-auto h-32 w-32 flex-shrink-0 rounded-full" :src="imgUrl"/>
            <div class="flex flex-row items-end mx-auto mt-3">
                <span class="font-semibold text-xl align-end">{{ symbole }}</span>
                <span class="ml-1 text-gray-500">{{ name }}</span>
            </div>
            <span class="font-semibold text-xl">{{ balance }} €</span>
        </div>
    </a>
</template>
<script lang="ts" setup>
import {AssetTypes} from '@/lib/contants/AssetTypes';
import { PropType,computed } from 'vue';
import { Asset } from '@/lib/models/Asset';
const props = defineProps({
    item:{
        type: Object as PropType<Asset>
    }
});
const imgUrl = computed(()=>{
    if(props.item)
    {
        if(props.item.name == AssetTypes.gold){
            return new URL('~/assets/img/icons/goldBars.png',import.meta.url).href;
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
            return 'Gold'
        }
        if(props.item.name == AssetTypes.silver){
            return 'Silver'
        }
        if(props.item.name == AssetTypes.euro){
            return 'Euro'
        }
    }
    
}) 
const balance = computed(()=>{
    let balance = 0;
    if(props.item)
    {
        if(props.item.name == AssetTypes.gold){
            balance= props.item.gold_in_euro;
        }
        if(props.item.name == AssetTypes.silver){
            balance= props.item.silver_in_euro;
        }
        if(props.item.name == AssetTypes.euro){
            balance= props.item.amount;
        }
        return balance;
    }
    
}) 
</script>
