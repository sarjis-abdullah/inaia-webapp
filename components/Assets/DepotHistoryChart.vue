<template>
    <div class="rounded-lg shadow bg-white px-4 py-5 sm:px-6">
      <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
    <div class="ml-4 mt-2">
        <div class="flex flex-row items-center" >
        <img :src="depot?depot.avatar:''" class="w-16 h-16 rounded-full"/>
        <div class="ml-4">
            <div class="text-gray-900">
                {{ $t('depot') }} # {{ depot?.depot_number }}
            </div>
            <div class="text-gray-900 font-semibold text-xl">
                <span class="inline-flex h-2 w-2 rounded-full" :class="getColor"/> <span class="text-gray-900">{{  depot?.name }}</span>
            </div>
            <div class="text-gray-900">
                 {{ depot?$n(depot.gram_amount*getPrice/1000):0 }} {{ currency }}
                 <span class="ml-2 text-sm" :class="performance>=0?'text-green-500':'text-red-500'">{{ performance > 0 ?'+':''}}{{ performance?$n(performance):0 }} %</span>
            </div>
            <div class="text-gray-400 mt--3">
                 {{ depot?$n(depot?.gram_amount/1000):0 }} g
            </div>
            
        </div>
    </div>
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
        <div class="w-full text-center mt-5 relative" style="height: 395px;"  v-if="!isLoading">
            <div class="absolute text-gray-900  w-fit top-px right-2">{{ max?$n(max/100) : 0 }} {{ currency }}</div>
            <div class="absolute text-gray-900  w-fit bottom-8 right-2">{{ min?$n(min/100) : 0 }} {{ currency }}</div>
        <apexchart  type="area" :options="options" :series="series" height=395>
        </apexchart>
    </div>
        <div v-else  >
            <Loading/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {AssetTypes, PricePeriods} from '@/lib/contants';
import { onMounted,Ref,ref,watch,PropType } from 'vue';
import { Depot, DepotHistoryValue, HistoricalPrice } from '~~/lib/models';
import { CurrencyService, AssetsService } from '@/lib/services';
import { AssetStorage } from '@/storage/AssetStorage';
import Loading from '@/components/common/Loading';
import * as array from 'd3-array';
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
        return n(val) + ' ' + currency
      },
    },

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
    y:{
        show:false
    }
    
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
    events: {
          mouseMove: (e, chartContext, config) => {
            debugger;
            console.log(config);
          }
      }

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
const depotHistoryData : Ref<DepotHistoryValue[]> = ref([]);
const currency = CurrencyService.getCurrency().symbol;
const period = ref(PricePeriods.month);
const props = defineProps({
    depot:{
        type: Object as PropType<Depot>
    }
});
const performance = computed(()=>{
  if(depotHistoryData.value.length>0){
    const first = depotHistoryData.value[0].money_value;
    const last = depotHistoryData.value[depotHistoryData.value.length-1].money_value;
    if(last>0)
    {
      return ((last-first)/last)*100;
    }
  }
  return 0;
})
const max = computed(()=>{

    return array.max(depotHistoryData.value,d=>d.money_value);
})
const min = computed(()=>{
    return array.min(depotHistoryData.value,d=>d.money_value);
})
const changePeriod = (p:PricePeriods)=>{
  period.value = p;
}
watch(period,async ()=>{
  await loadDepotValuesHistory();
})
const isLoading = ref(false);
const {t,n,d} = useI18n();
const loadDepotValuesHistory = async ()=>{
  isLoading.value = true;
    try{
      
      const data = await AssetsService.getDepotHistoryValues({
      period:period.value,
      depot_id:props.depot.id
      })
      depotHistoryData.value = data;
      let xAxis = [];
      let yAxis = [];
      
      data.forEach(value=>{
        yAxis.push({x:value.date,y:value.money_value/100});
      })
      series.value = [{
        name:t('depot_value'),
        data:yAxis
        
      }]
      
       
      
    }
    catch(err){
        console.log(err);
    }
    finally{
      isLoading.value = false;
    }
}
const isActive = (value)=>{
  return period.value == value;
}
const getColor = computed( ()=>{
  if(props.depot && props.depot.depot_type){
    if(props.depot.depot_type.name_translation_key.toLocaleUpperCase() == AssetTypes.gold.toLocaleUpperCase()){
      return 'bg-amber-300'; 
      
    }
    if(props.depot.depot_type.name_translation_key.toLocaleUpperCase() == AssetTypes.silver.toLocaleUpperCase()){
      return 'bg-slate-300'; 
    }
  }
})
const getPrice = computed( ()=>{
  if(props.depot && props.depot.depot_type){
    if(props.depot.depot_type.name_translation_key.toLocaleUpperCase() == AssetTypes.gold.toLocaleUpperCase()){
      return goldPrice.value; 
      
    }
    if(props.depot.depot_type.name_translation_key.toLocaleUpperCase() == AssetTypes.silver.toLocaleUpperCase()){
      return silverPrice.value; 
    }
  }
})
const followChartValues = (config) =>{
  console.log(config)
}
onMounted(async ()=>{
    if(props.depot)
    {
        goldPrice.value = await AssetStorage.getGoldPrice();
        silverPrice.value = await AssetStorage.getSilverPrice();
        await loadDepotValuesHistory()
    }
})
</script>
<style>
    .apexcharts-tooltip { opacity: 0 !important; display: none !important;}
    .apexcharts-xaxistooltip-bottom {
        margin-top: 4px !important;
        padding: 4px 5px !important;
        border-color: #0065D3 !important;
        background: #0065D3 !important;
        color:#fff !important;
    }
    .apexcharts-xaxistooltip-bottom:before {
        display: none !important;
    }
    .apexcharts-xaxistooltip-bottom:after {
        border-bottom-color: #0065D3     !important;
    }

    .img-container {
        display: inline-block;
        cursor: pointer;
        position:relative;
        border-radius: 50%;
        overflow: hidden;
        /*border: 3px solid #fff;*/

        width: 74px;
        height: 74px;
        transition: all .15s ease;
    }
    .img-container img {
        max-width: 100%;
    }
    .img-container:hover {
        transform: translate(0%,0%) scale(1.03);
    }
    .img-container .overlay {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,.3);
        opacity:0;
        transition:opacity 250ms ease-in-out;
    }
    .img-container:hover .overlay {
        opacity:1;
    }
    .overlay div {
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        color:#fff;
    }
</style>