<template>
    <div class="shadow bg-white px-4 py-5 sm:px-6">
      <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
    <div class="ml-4 mt-2">
      <div class="text-xs text-gray-600">{{ title }}</div>
      <h3 class="text-base text-xl font-semibold leading-6 text-gray-900 inline-flex">{{  $n(price) }} {{ currency.symbol }}</h3><span class="ml-2 text-xs" :class="performance>=0?'text-green-600':'text-red-600'"><span v-if="performance>0">+</span>{{ $n(performance)}}%</span>
    </div>
    <div class="ml-4 mt-4 flex flex-shrink-0">
        <button type="button" @click="changePeriod(PricePeriods.month)" class="relative inline-flex items-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset" :class="isActive(PricePeriods.month)?'bg-blue-500 text-white ring-blue-300':'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'">
          <span>{{ $t('month') }}</span>
        </button>
        <button type="button" @click="changePeriod(PricePeriods.year)" class="relative ml-1 inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset " :class="isActive(PricePeriods.year)?'bg-blue-500 text-white ring-blue-300':'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'">
       
          <span>{{ $t('year') }}</span>
        </button>
        <button type="button"  @click="changePeriod(PricePeriods.max)" class="relative ml-1 inline-flex items-center rounded-md  px-3 py-1 text-sm font-semibold  shadow-sm ring-1 ring-inset" :class="isActive(PricePeriods.max)?'bg-blue-500 text-white ring-blue-300':'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'">
          
          <span>{{ $t('max') }}</span>
        </button>
      </div>
  </div>
        <apexchart  type="line" :options="options" :series="series" height="300"></apexchart>
    </div>
</template>
<script lang="ts" setup>
import {AssetTypes, PricePeriods} from '@/lib/contants';
import { invalid } from 'moment';
import { onMounted,Ref,ref,watch } from 'vue';
import { HistoricalPrice } from '~~/lib/models';
import { CurrencyService, PricesHistoryService } from '~~/lib/services';
import { AssetStorage } from '@/storage/AssetStorage';
const options = {
  dataLabels: {
    enabled: false
  },

  markers: {
    size: 0,
    style: 'hollow',
  },
  yaxis: {
    labels: {
      show: false,
      formatter: function (val) {
        return n(val) + ' ' + currency.symbol
      },
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      show: true,
      // format: 'MMM yyyy',
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MMM',
        day: 'dd MMM',
        hour: 'HH:mm'
      },
      style: {
        colors: '#8898aa',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: true,
    },

  },
  tooltip: {
    x: {
      show: false,
      format: 'dd MMM yyyy',
    },
    marker: {
      show: false,
    },
    
  },
  
  stroke: {
    width: 2,
  },
  chart: {
    fontFamily: 'Noah, Open Sans',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },

  },
  colors: [ '#0065D3'],
  grid: {
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: false
      }
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: -10,
    },
  },
}
const series = ref([]);
const silverPrice : Ref<number> = ref(0);
const goldPrice : Ref<number> = ref(0);
const historicalData : Ref<HistoricalPrice[]> = ref([]);
  const currency = CurrencyService.getCurrency();
const period = ref(PricePeriods.year);
const props = defineProps({
    type:{
        type: String,
        default:AssetTypes.gold
    }
});
const price = computed(()=>{
  if(props.type == AssetTypes.gold){
    return goldPrice.value;
  }
  if(props.type == AssetTypes.silver){
    return silverPrice.value;
  }
})
const title = computed(()=>{
  if(props.type == AssetTypes.gold){
    return t('gold_gram_price').toUpperCase()
  }
  if(props.type == AssetTypes.silver){
    return t('silver_gram_price').toUpperCase()
  }
})
const performance = computed(()=>{
  if(historicalData.value.length>0){
    const first = historicalData.value[0].fixing_gram;
    const last = historicalData.value[historicalData.value.length-1].fixing_gram;
    if(last>0)
    {
      return ((last-first)/last)*100;
    }
  }
  return 0;
})
const changePeriod = (p:PricePeriods)=>{
  period.value = p;
}
watch(period,async ()=>{
  await loadPriceHistory();
})
const isLoading = ref(false);
const {t,n,d} = useI18n();
const loadPriceHistory = async ()=>{
  isLoading.value = true;
  if(props.type == AssetTypes.gold){
    
    try{
      
      const data = await PricesHistoryService.getGoldPriceVariationData({
      period:period.value,
      currency:currency.code
      })
      historicalData.value = data;
      let xAxis = [];
      let yAxis = [];
      
      data.forEach(value=>{
        yAxis.push({x:value.price_date,y:value.fixing_gram});
      })
      series.value = [{
        name:t('gold_price'),
        data:yAxis
        
      }]
      
       
      
    }
    catch(err){

    }
    finally{
      isLoading.value = false;
    }
    
  }
  if(props.type == AssetTypes.silver){
    
    try{
      
      const data = await PricesHistoryService.getSilverPriceVariationData({
      period:period.value,
      currency:currency.code
      })
      historicalData.value = data;
      let xAxis = [];
      let yAxis = [];
      
      data.forEach(value=>{
        yAxis.push({x:value.price_date,y:value.fixing_gram});
      })
      series.value = [{
        name:t('silver_price'),
        data:yAxis
        
      }]
      
       
      
    }
    catch(err){

    }
    finally{
      isLoading.value = false;
    }
    
  }
}
const isActive = (value)=>{
  return period.value == value;
}
onMounted(async ()=>{
  if(props.type == AssetTypes.gold){
    goldPrice.value = await AssetStorage.getGoldPrice(); 
  }
  if(props.type == AssetTypes.silver){
    silverPrice.value = await AssetStorage.getSilverPrice(); 
  }
  await loadPriceHistory()
})
</script>