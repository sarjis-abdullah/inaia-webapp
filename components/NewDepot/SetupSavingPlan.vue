<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-2xl min-w-fit">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 class="text-center mb-8 text-2xl font-bold">{{ $t('calculateTrustData') }}</h2>
            <h2 class="text-center mb-8  text-xl font-bold">{{ $n(totalReturns) }} {{ currency }}</h2>
            <div class="md:grid md:grid-cols-3 md:gap-4">
                
                <div class="pr-3">
                    <div>

                        <Listbox as="div" v-model="state.performance">
                            <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{
                                $t('projectedPerformance') }}</ListboxLabel>
                            <div class="relative mt-2">
                                <ListboxButton
                                    class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
                                    <span class="block truncate">{{ state.performance }}</span>
                                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </ListboxButton>

                                <transition leave-active-class="transition ease-in duration-100"
                                    leave-from-class="opacity-100" leave-to-class="opacity-0">
                                    <ListboxOptions
                                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        <ListboxOption as="template" v-for="perf in performances" :key="perf.key"
                                            :value="perf.value" v-slot="{ active, selected }">
                                            <li
                                                :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                                <span
                                                    :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                                        perf.value }}</span>

                                                <span v-if="selected"
                                                    :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
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
                        <div class="flex flex-row mb-3">
                            <span>{{ $t('monthlysavingrate') }}</span>
                            <input type="numeric" v-model="state.monthlySaving"
                                class="w-12 mx-4 rounded-md bg-white px-1 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6" />{{
                                    currency }}
                        </div>

                        <vue3-slider v-model="state.monthlySaving" color="#0065D3" track-color="#E8ECEE" :min="25"
                            :max="1000" :step="25" />
                    </div>
                    <div class="my-6">
                        <div class="flex flex-row mb-3">
                            <span>{{ $t('duration') }}</span>
                            <input type="numeric" v-model="state.numberOfYears"
                                class="w-12 mx-4 rounded-md bg-white px-1 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6" />
                            {{ $t('years') }}
                        </div>

                        <vue3-slider v-model="state.numberOfYears" color="#0065D3" track-color="#E8ECEE" :min="2"
                            :max="45" />

                        <div class="my-6" v-if="!isSimulation">
                            <span class="mb-3">{{ $t('startdate') }}</span>
                            <div class="flex flex-col">
                                <Listbox as="div" v-model="date.day" class="mb-3">
                                    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{
                                        $t('day') }}</ListboxLabel>
                                    <div class="relative mt-2">
                                        <ListboxButton
                                            class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
                                            <span class="block truncate">{{ date.day }}</span>
                                            <span
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>

                                        <transition leave-active-class="transition ease-in duration-100"
                                            leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <ListboxOptions
                                                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                <ListboxOption as="template" v-for="d in days" :key="d.option"
                                                    :value="d.option" v-slot="{ active, selected }">
                                                    <li
                                                        :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                                        <span
                                                            :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                                                d.name }}</span>

                                                        <span v-if="selected"
                                                            :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                                <Listbox as="div" v-model="date.month" class="mb-3">
                                    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{
                                        $t('month') }}</ListboxLabel>
                                    <div class="relative mt-2">
                                        <ListboxButton
                                            class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
                                            <span class="block truncate">{{ t(date.month+1) }}</span>
                                            <span
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>

                                        <transition leave-active-class="transition ease-in duration-100"
                                            leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <ListboxOptions
                                                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                <ListboxOption as="template" v-for="m in months" :key="m.option"
                                                    :value="m.option" v-slot="{ active, selected }">
                                                    <li
                                                        :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                                        <span
                                                            :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                                                m.name }}</span>

                                                        <span v-if="selected"
                                                            :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                                <Listbox as="div" v-model="date.year">
                                    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{
                                        $t('year') }}</ListboxLabel>
                                    <div class="relative mt-2">
                                        <ListboxButton
                                            class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
                                            <span class="block truncate">{{ date.year }}</span>
                                            <span
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>

                                        <transition leave-active-class="transition ease-in duration-100"
                                            leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <ListboxOptions
                                                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                <ListboxOption as="template" v-for="y in years" :key="y.name"
                                                    :value="y.option" v-slot="{ active, selected }">
                                                    <li
                                                        :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                                        <span
                                                            :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                                                y.name }}</span>

                                                        <span v-if="selected"
                                                            :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                            </div>
                        </div>
                        <div class="my-6">
                            <Listbox as="div" v-model="state.selectedPaymentOption">
                                <ListboxLabel class="sr-only">{{ $t('billing') }}</ListboxLabel>
                                <div class="relative">
                                    <div class="inline-flex divide-x divide-blue-700 rounded-md shadow-sm">
                                        <div
                                            class="inline-flex items-center gap-x-1.5 rounded-l-md bg-blue-600 px-3 py-2 text-white shadow-sm">
                                            <CheckIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                            <p class="text-sm font-semibold">{{ state.selectedPaymentOption.title }}</p>
                                        </div>
                                        <ListboxButton
                                            class="inline-flex items-center rounded-l-none rounded-r-md bg-blue-600 p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-50">
                                            <span class="sr-only">Change agio payment modality</span>
                                            <ChevronDownIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                        </ListboxButton>
                                    </div>

                                    <transition leave-active-class="transition ease-in duration-100"
                                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <ListboxOptions
                                            class="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <ListboxOption as="template" v-for="option in billingMethods"
                                                :key="option.title" :value="option" v-slot="{ active, selected }">
                                                <li
                                                    :class="[active ? 'bg-blue-300 text-white' : 'text-gray-900', 'cursor-default select-none p-4 text-sm']">
                                                    <div class="flex flex-col">
                                                        <div class="flex justify-between items-center">
                                                            <img class="h-10 w-10 mr-3" src="~/assets/img/icons/onetime.png"
                                                                v-if="option.name == AgioPaymentsModels.onetime" />
                                                            <img class="h-10 w-10 mr-3"
                                                                src="~/assets/img/icons/fiftyfifty.png"
                                                                v-if="option.name == AgioPaymentsModels.installment" />
                                                            <p :class="selected ? 'font-semibold' : 'font-normal'">{{
                                                                option.title }}</p>
                                                            <div class="p-2 mx-3 bg-blue-700 text-white rounded"
                                                                v-if="option.name == AgioPaymentsModels.onetime">-10%</div>
                                                            <span v-if="selected"
                                                                :class="active ? 'text-white' : 'text-blue-600'">
                                                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        </div>
                                                        <p :class="[active ? 'text-blue-200' : 'text-gray-500', 'mt-3']">{{
                                                            option.paragraph }}</p>
                                                    </div>
                                                </li>
                                            </ListboxOption>
                                        </ListboxOptions>
                                    </transition>
                                </div>
                            </Listbox>
                            <a v-if="state.selectedPaymentOption.name == AgioPaymentsModels.installment"
                                class="mt-3 text-blue-500 underline cursor-pointer" @click="openPaymentTable">{{ $t('seeReamboursmentPlan') }}</a>
                        </div>
                        <div class="my-6" v-if="!isSimulation">

                            <Listbox as="div" v-model="selectedPaymentMethod">
                                <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{
                                    $t('payment') }}</ListboxLabel>
                                <div class="relative mt-2">
                                    <ListboxButton
                                        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
                                        <span class="block truncate">{{
                                            selectedPaymentMethod ? $t(selectedPaymentMethod) : $t('select') }}</span>
                                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </ListboxButton>

                                    <transition leave-active-class="transition ease-in duration-100"
                                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <ListboxOptions
                                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            <ListboxOption as="template" v-for="method in paymentMethods" :key="method.id"
                                                :value="method.name" v-slot="{ active, selected }">
                                                <li
                                                    :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                                    <span
                                                        :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                                            $t(method.name) }}</span>

                                                    <span v-if="selected"
                                                        :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                </li>
                                            </ListboxOption>
                                        </ListboxOptions>
                                    </transition>
                                </div>
                            </Listbox>
                        </div>
                        <div class="my-6"
                            v-if="selectedPaymentMethod == PaymentMethods.bankAccount && paymentAccounts.length > 0 && !isSimulation">

                            <Listbox as="div" v-model="selectedPaymentAccount">
                                <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{
                                    $t('bank_account') }}</ListboxLabel>
                                <div class="relative mt-2">
                                    <ListboxButton
                                        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
                                        <span class="block truncate">{{
                                            selectedPaymentAccount ? formatBankAccount(selectedPaymentAccount) : $t('select') }}</span>
                                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </ListboxButton>

                                    <transition leave-active-class="transition ease-in duration-100"
                                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <ListboxOptions
                                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            <ListboxOption as="template" v-for="account in paymentAccounts"
                                                :key="account.id" :value="account" v-slot="{ active, selected }">
                                                <li
                                                    :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                                    <span
                                                        :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                                            formatBankAccount(account) }}</span>

                                                    <span v-if="selected"
                                                        :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                </li>
                                            </ListboxOption>
                                        </ListboxOptions>
                                    </transition>
                            </div>
                        </Listbox>
                    </div>
                </div>
                
            </div>
            <div class="md:col-span-2">
                    <PerformanceChart :data="contractData" v-if="contractData"/>
                </div>
        </div>
        <div class="mt-10" v-if="!isSimulation">
            <button v-if="!depot || depot?.is_savings_plan == 0" type="submit"
                    :disabled="!enableBtn"
                    :class="enableBtn?'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500':'bg-blue-300 focus:ring-blue-200'"
                    class="flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2"

                    @click.prevent="confirm"
                    >{{ $t('confirm') }}
            </button>
            <p v-else class="text-center text-sm font-medium text-blue-600">
                {{ $t('already_a_savings_plan') }}
            </p>
        </div>
    </div>
    <Modal :open="showPaymentTable" @onClose="closePaymentTable" :minWidth="'min-w-fit'" >
            <div class="sm:mx-auto sm:w-full sm:max-w-2xl min-w-fit" >
            <div class="text-center my-6 text-2xl font-semibold">{{ $t('paymentPlan') }}</div>
            <div class="grid grid-cols-4 gap-2 py-2 px-2 bg-gray-50 text-center">
                <div class="truncate">{{ $t('month') }}</div>
                <div class="truncate">{{ $t('deposit') }}</div>
                <div class="truncate">{{ $t('agio') }}</div>
                <div class="truncate">{{ $t('buy_assets') }}</div>
            </div>
            <div class="grid grid-cols-4 gap-2 py-2 px-2" v-for="paymentData in paymentTableData" :key="paymentData.month">
                <div>{{ paymentData.month }}</div>
                <div>{{ $n(paymentData.saving) }} {{ currency }}</div>
                <div>{{ $n(paymentData.agio) }} {{ currency }}</div>
                <div>{{ $n(paymentData.assetPurchase) }} {{ currency }}</div>
            </div>
            <div class="grid grid-cols-4 gap-2 py-2 px-2 mt-3 bg-gray-50 text-center">
               
                
                <div class="truncate col-span-2">
                 {{ $t('total_agio') }}
                </div>
                <div>

</div>
                <div>
                 {{ $n(totalAgio) }} {{ currency }}
                </div>
            </div>
        </div>
        </Modal>

</div></template>
<script lang="ts" setup>

import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { AccountService, AddDepotService, CurrencyService, PaymentAccountService } from "~~/lib/services";
import { AssetTypes, PaymentAccountSpecs, ProductsSpec } from "~~/lib/contants";
import { Ref } from 'vue';
import { SpPerformanceData,DepotTarget, PaymentAccount, Depot } from '~~/lib/models';
import { AgioPaymentsModels } from '~~/lib/contants/AgioPaymentsModels';
import { PaymentMethods } from '~~/lib/contants/PaymentMethods';
import { formatDate, formatIban } from '~~/lib/Formatters';
import PerformanceChart from '@/components/NewDepot/PerformanceChart';
import Modal from '@/components/common/Modal';
import simulator from '~/pages/simulator.vue';
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
    depot:{
        type: Object as PropType<Depot>
        
    },
    type:{
             type:String,
             
         },
    isSimulation:{
        type: Boolean,
        default:false
    },
});
const emit = defineEmits<{
  (e: 'onContractDataSet',data:object): void
}>()
const billingMethods = [
{
        name:AgioPaymentsModels.installment,
        reduction:0,
        title:'75/25',
        paragraph:props.type == AssetTypes.gold?t('fiftyOptionExplanationGold'):t('fiftyOptionExplanationSilver'),
    },
    {
        name:AgioPaymentsModels.onetime,
        reduction:10,
        title:t('agioPaymentOption2Title'),
        paragraph:props.type == AssetTypes.gold?t('oneOptionExplanationGold'):t('oneOptionExplanationSilver'),
    }
    
]
const totalReturns = ref(0);
const agioPercentage  = ref(0);
const totalAgio = ref(0);
const selectedPaymentMethod = ref(null);
const selectedPaymentAccount = ref(null);
const contractData : Ref<SpPerformanceData> = ref();
const showPaymentTable = ref(false);
const enableBtn = ref(false);
const currency = CurrencyService.getCurrencySymbol();
const paymentMethods = [
    {
        id:1,
        name:PaymentMethods.bankTranfer
    },
    {
        id:2,
        name:PaymentMethods.bankAccount
    }
]
const years = ref(new Array(2));
const months = ref([]);
const days = [{option:1,name:'1'},{option:15,name:'15'}];
const paymentAccounts : Ref<Array<PaymentAccount>> = ref([]);
const paymentTableData = ref([]);
const state = reactive({
    performance:9,
    monthlySaving:25,
    numberOfYears:2,
    selectedPaymentOption:billingMethods[0],
    
})
const date = reactive({
    day:1,
    month:0,
    year:0
})
const buildUrl = (url:string)=>{
    const source = new URL(url,import.meta.url).href;
    console.log(source);
    return source;
}
function getMonths(startMonth=0)
{
    months.value = [];
    for (let index = startMonth; index < (12); index++) {
        let monthName = '';
        if(index==0){
            monthName='01'
        }
        else{
            monthName = (index+1).toString();
        }
        months.value.push({option:index,name:t(monthName)});
        
    }
}
watch(date,(newDate,oldDate)=>{
    const {nextPossibleDay,nextPossibleMonth,nextPossibleYear} = AddDepotService.calculateNextPossibleDates();

    
        setupMonths();
        if(newDate.year == nextPossibleYear){
            if(newDate.month < nextPossibleMonth){
                date.day = nextPossibleDay;
                date.month = nextPossibleMonth;
            }
            if(newDate.month == nextPossibleMonth){
                if(newDate.day <nextPossibleDay){
                    date.day = nextPossibleDay
                }
            }
            
        }
})
watch(selectedPaymentMethod,async (newOne)=>{
    if(newOne == PaymentMethods.bankAccount){
        try{
         paymentAccounts.value = await PaymentAccountService.getClientPaymentAccounts();
         if(paymentAccounts.value && paymentAccounts.value.length > 0){
            paymentAccounts.value.forEach(account=>{
                if(account.is_default){
                    selectedPaymentAccount.value = account;
                }
            })
         }
        }
        catch(err){
            useBugsnag().notify(err);
        }
        
    }
})
watch([selectedPaymentMethod,selectedPaymentAccount],([newSelectedPaymentMethod,newSelectedPaymentAccount])=>{
    if(newSelectedPaymentMethod){
        if(newSelectedPaymentMethod == PaymentMethods.bankTranfer){
            enableBtn.value = true;
            return;
        }
        else if(newSelectedPaymentMethod == PaymentMethods.bankAccount){
            if(newSelectedPaymentAccount){
                enableBtn.value = true;
                return;
            }
        }
    }
    enableBtn.value = false;
})
watch([agioPercentage,state],([newAgioPercentage,newState],[oldAgioPercentage,oldState])=>{
    if(state.numberOfYears <2){
        state.numberOfYears = 2;
    }
    if(state.numberOfYears > 45){
        state.numberOfYears = 45
    }
    if(newAgioPercentage && newState && newState.monthlySaving >0 && newState.numberOfYears>0 && !isNaN(newState.monthlySaving) && !isNaN(state.numberOfYears)){
        totalAgio.value = AddDepotService.calculateTotalAgio(newAgioPercentage,newState.selectedPaymentOption.reduction,newState.numberOfYears,newState.monthlySaving);
        contractData.value = AddDepotService.calculateChartData(newState.numberOfYears,newState.monthlySaving,newState.performance,totalAgio.value,newState.selectedPaymentOption.name);
        if(contractData.value.returnsData && contractData.value.returnsData.length > 0)
            totalReturns.value =contractData.value.returnsData[contractData.value.returnsData.length-1].value;
        else{
            totalReturns.value = 0;
        }
    }
    
    
})
const formatBankAccount = (option:PaymentAccount)=>{
    let iban = '';
    let bank = ''
    if(option && option.payment_account_specs.length > 0){
        option.payment_account_specs.forEach(spec=>{
            if(spec.name == PaymentAccountSpecs.iban){
                iban = formatIban(spec.value);
            }
            if(spec.name == PaymentAccountSpecs.bank_name){
                bank = spec.value;
            }
        })
    }
    return bank+" "+iban;
}
const closePaymentTable = ()=>{
    showPaymentTable.value = false;
}
const openPaymentTable = ()=>{
    totalAgio.value = AddDepotService.calculateTotalAgio(agioPercentage.value,state.selectedPaymentOption.reduction,state.numberOfYears,state.monthlySaving);
    paymentTableData.value = AddDepotService.calculateAgioTableData(state.monthlySaving,totalAgio.value);
    console.log(paymentTableData.value);
    showPaymentTable.value = true;
}
const setupMonths = ()=>{
    if(!date.year)
        return [];
        const {nextPossibleDay,nextPossibleMonth,nextPossibleYear} = AddDepotService.calculateNextPossibleDates();
    if(date.year==nextPossibleYear){
        return getMonths(nextPossibleMonth)
    }
    return getMonths(0);
}
const confirm = ()=>{
    emit('onContractDataSet',{
        agio_payment_option:state.selectedPaymentOption.name,
        interval_amount:state.monthlySaving,
        interval_day:date.day,
        duration:state.numberOfYears,
        interval_startdate:formatDate(new Date(date.year,date.month,date.day)),
        payment_method:selectedPaymentMethod.value,
        payment_account_id:selectedPaymentAccount.value?selectedPaymentAccount.value.id:undefined,
        totalAgio:totalAgio.value
    })
}
onMounted(async ()=>{
    try{
        if(props.target){
            state.monthlySaving = props.target.interval_amount;
            state.numberOfYears = props.target.duration;
        }
        else{
            state.monthlySaving = 300;
            state.numberOfYears = 10;
        }
        if(props.depot && props.depot.target_type){
            state.monthlySaving = props.depot.target_type.interval_amount;
            state.numberOfYears = props.depot.target_type.duration;
        }
        const {nextPossibleDay,nextPossibleMonth,nextPossibleYear} = AddDepotService.calculateNextPossibleDates();
        for (let index = 0; index < years.value.length; index++) {
             years.value[index] = {name:nextPossibleYear+index,option:nextPossibleYear+index};

        }
        date.day = nextPossibleDay;
        date.month = nextPossibleMonth;
        date.year = nextPossibleYear;
        setupMonths();
        if(props.accountId){
            const productSpecs = await AccountService.getAccountProductDetails(props.accountId);
            productSpecs.forEach(spec=>{
                if(spec.product_spec_name == ProductsSpec.gold_transaction_fee){
                    agioPercentage.value = parseInt(spec.value)/100;
                }
            })
        }
        else{
            agioPercentage.value = 5.95;
        }
        
    }catch(err){
        useBugsnag().notify(err);
    }
})
</script>