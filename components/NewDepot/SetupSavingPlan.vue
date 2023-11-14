<template>
     <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 class="text-center mb-8 text-2xl font-bold">{{ $t('calculateTrustData') }}</h2>
            <h2 class="text-center mb-8  text-xl font-bold">{{ totalReturns }} {{ currency }}</h2>
            <div class="grid grid-cols-3 gap-2"> 
                <div class="col-span-2 w-96">

                </div>
                <div>
                    <div>
                        
                            <Listbox as="div" v-model="state.performance">
                                <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{ $t('projectedPerformance') }}</ListboxLabel>
                                <div class="relative mt-2">
                                <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <span class="block truncate">{{ state.performance }}</span>
                                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </ListboxButton>

                                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                    <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        <ListboxOption as="template" v-for="perf in performances" :key="perf.key" :value="perf.value" v-slot="{ active, selected }">
                                            <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                            <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ perf.value }}</span>

                                            <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            </li>
                                        </ListboxOption>
                                    </ListboxOptions>
                                </transition>
                                </div>
                            </Listbox>
                    </div>
                    <div class="my-6">
                        <div class="flex flex-row">
                            <span>{{ $t('monthlysavingrate') }}</span>
                            <input type="numeric" v-model="state.monthlySaving"/>{{ currency }}
                        </div> 

                        <vue3-slider v-model="state.monthlySaving" color="#0065D3" track-color="#E8ECEE" :min="25" :max="1000" :step="25"/>
                    </div>
                    <div class="my-6">
                        <div class="flex flex-row">
                            <span>{{ $t('duration') }}</span>
                            <input type="numeric" v-model="state.numberOfYears"/> {{ $t('years') }}
                        </div> 

                        <vue3-slider v-model="state.numberOfYears" color="#0065D3" track-color="#E8ECEE" :min="1" :max="45" />
                    </div>
                </div>
                
            </div>
        </div>
     </div>
</template>
<script lang="ts" setup>

import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { AccountService, AddDepotService, CurrencyService } from "~~/lib/services";
import { ProductsSpec } from "~~/lib/contants";
import { Ref,PropType } from 'vue';
import { SpPerformanceData,DepotTarget } from '~~/lib/models';
import { AgioPaymentsModels } from '~~/lib/contants/AgioPaymentsModels';
const {t} = useI18n();
const performances = ref([
    {key:1,value:3},
    {key:2,value:6},
    {key:3,value:9}
])
const props = defineProps({
    accountId:{
            type: Number
             
         },
    target:{
    type: Object as PropType<DepotTarget>
        
    },
});
const billingMethods = [
    {
        name:AgioPaymentsModels.onetime,
        reduction:10,
        title:t('agioPaymentOption2Title'),
        paragraph:t('oneOptionExplanation'),
    },
    {
        name:AgioPaymentsModels.installment,
        reduction:0,
        title:'75/25',
        paragraph:t('fiftyOptionExplanation'),
    }
]
const totalReturns = ref(0);
const agioPercentage  = ref(0);
const totalAgio = ref(0);
const agioPaymentMethod = ref('');
const contractData : Ref<SpPerformanceData> = ref();
const currency = CurrencyService.getCurrencySymbol();
const state = reactive({
    performance:9,
    monthlySaving:25,
    numberOfYears:1,
    selectedPaymentOption:billingMethods[0]
})
watch([agioPercentage,state],([newAgioPercentage,newState])=>{
    if(newAgioPercentage){
        totalAgio.value = AddDepotService.calculateTotalAgio(newAgioPercentage,newState.selectedPaymentOption.reduction,newState.numberOfYears,newState.monthlySaving);
        contractData.value = AddDepotService.calculateChartData(newState.numberOfYears,newState.monthlySaving,newState.performance,totalAgio.value,newState.selectedPaymentOption.name);
        totalReturns.value =contractData.value.returnsData[contractData.value.returnsData.length-1].value;
    }
    
})
onMounted(async ()=>{
    try{
        if(props.target){
            state.monthlySaving = props.target.interval_amount;
            state.numberOfYears = props.target.duration;
        }
        const productSpecs = await AccountService.getAccountProductDetails(props.accountId);
        productSpecs.forEach(spec=>{
            if(spec.product_spec_name == ProductsSpec.gold_transaction_fee){
                agioPercentage.value = parseInt(spec.value)/100;
            }
        })
    }catch(err){

    }
})
</script>