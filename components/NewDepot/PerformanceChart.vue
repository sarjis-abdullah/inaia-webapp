<template>
    <div>
        <div class="flex flex-row justify-end">
          <button type="button" @click="changeDisplay(displays.line)" class="relative inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset " :class="isActive(displays.line)?'bg-blue-500 text-white ring-blue-300':'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'">
       
       <span class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
               <PresentationChartLineIcon class="h-full w-full" aria-hidden="true" :class="isActive(displays.line)?'text-white':'text-blue-600 group-hover:text-blue-800'"/>
             </span>
   </button>
            <button type="button" @click="changeDisplay(displays.bars)" class="relative ml-1 inline-flex items-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset" :class="isActive(displays.bars)?'bg-blue-500 text-white ring-blue-300':'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'">
                <span class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                    <ChartBarIcon class="h-full w-full" aria-hidden="true" :class="isActive(displays.bars)?'text-white':'text-blue-600 group-hover:text-blue-800'"/>
                  </span>
        </button>
        
        <button type="button"  @click="changeDisplay(displays.table)" class="relative ml-1 inline-flex items-center rounded-md  px-3 py-1 text-sm font-semibold  shadow-sm ring-1 ring-inset" :class="isActive(displays.table)?'bg-blue-500 text-white ring-blue-300':'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'">
          
            <span class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                    <TableCellsIcon class="h-full w-full" aria-hidden="true" :class="isActive(displays.table)?'text-white':'text-blue-600 group-hover:text-blue-800'"/>
                  </span>
        </button>
        </div>
        <div class="mt-6" v-if="selectedDisplay == displays.bars">
            <apexchart  type="bar" :options="optionBars" :series="seriesBars" height=395>
            </apexchart>
        </div>
        <div class="mt-6" v-if="selectedDisplay == displays.line">
            <apexchart  type="area" :options="optionsArea" :series="seriesArea" height=395>
            </apexchart>
        </div>
        <div class="mt-6" v-if="selectedDisplay == displays.table">
            <div class="grid grid-cols-4 gap-2 py-2 px-2 bg-gray-50 text-center">
            <div class="truncate">{{ $t('year') }}</div>
            <div class="truncate">{{ $t('deposit') }}</div>
            <div class="truncate">{{ $t('agio') }}</div>
            <div class="truncate">{{ $t('performance') }}</div>
        </div>
        <div class="grid grid-cols-4 gap-2 py-2 px-2" v-for="yearData in tableData" :key="yearData.year">
            <div>{{ yearData.year }}</div>
            <div>{{ $n(yearData.deposit) }} {{ currency }}</div>
            <div>{{ $n(yearData.agio) }} {{ currency }}</div>
            <div class="text-balance">{{ $n(yearData.performance) }} {{ currency }}</div>
        </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { PropType,watch } from "vue";
import { DataItem, SpPerformanceData } from "~~/lib/models";
import { ChartBarIcon,TableCellsIcon,PresentationChartLineIcon } from '@heroicons/vue/24/solid';
import { CurrencyService } from "~~/lib/services";
const currency = CurrencyService.getCurrencySymbol();
const tableData = ref([]);
const seriesArea = ref([]);
const seriesBars = ref([]);
const {t,n,d} = useI18n();
const optionBars = {
  dataLabels: {
    enabled: false
  },

  markers: {
    size: 0,
    style: 'hollow',
  },
  yaxis: {
    
    labels: {
      show: true,
      formatter: function (val) {
        return n(val) + ' ' + currency
      },
    },

  },
  xaxis: {
    categories:[
        t('agio'),
        t('savings'),
        t('returns')
    ],
    labels: {
      show: true,
      // format: 'MMM yyyy',
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
    
    },
    marker: {
      show: false,
    },
    y:{
        show:false
    }
    
  },
  
  stroke: {
    curve: 'smooth',
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
  colors: [ '#FF0000','#0065D3','#4DA1FF'],
  plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
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
const optionsArea = {
  dataLabels: {
    enabled: false
  },

  markers: {
    size: 0,
    style: 'hollow',
  },
  yaxis: {
    labels: {
      show: true,
      formatter: function (val) {
        return n(val) + ' ' + currency
      },
    },

  },
  xaxis: {
    
    labels: {
      show: true,
      // format: 'MMM yyyy',
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
    
    },
    marker: {
      show: false,
    },
    y:{
        show:false
    }
    
  },
  
  stroke: {
    curve: 'smooth',
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
  colors: [ '#FF0000','#0065D3','#4DA1FF'],
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
    const displays = {
        line:'line',
        table:'table',
        bars:'bars'
    }
    const selectedDisplay = ref(displays.line);
    const props = defineProps({
        data:{
            type : Object as PropType<SpPerformanceData>
        }
    })
    const isActive = (display:string)=>{
        return selectedDisplay.value == display;
    }
    const changeDisplay = (display:string)=>{
        selectedDisplay.value = display;
    }

const createTableData = (data:SpPerformanceData)=>{
    tableData.value = [];
    for (let index = 0; index < data.savingsData.length; index++) {
        let agio = 0;
        if(index<data.agioData.length){
            agio = data.agioData[index].value;
        }
        tableData.value.push({year:data.savingsData[index].year,deposit:data.savingsData[index].value,agio:agio,performance:data.returnsData[index].value})
        
    }
}
const createBarsSeries = (data:SpPerformanceData)=>{
    let totalAgio = 0;
    data.agioData.forEach(agio=>{
        totalAgio+=agio.value
    })
    seriesBars.value = [{
        
       
        data:[totalAgio,data.savingsData[data.savingsData.length-1].value,data.returnsData[data.returnsData.length-1].value]
    },
]
}
const createAreaSeries = (data:SpPerformanceData)=>{
    let agioSerie = [];
    let savingsSerie = [];
    let returnsSerie = [];
    data.agioData.forEach((agio)=>{
        agioSerie.push({
            x:agio.year,
            y:agio.value
        })
    });
    data.savingsData.forEach(saving=>{
        savingsSerie.push({
            x:saving.year,
            y:saving.value
        })
    })
    data.returnsData.forEach(returns=>{
        returnsSerie.push({
            x:returns.year,
            y:returns.value
        })
    })
    seriesArea.value = [{
        name:t('agio'),
        data:agioSerie
    },
    {
        name:t('savings'),
        data:savingsSerie
    },
    {
        name:t('returns'),
        data:returnsSerie
    }
]
}
watch(props,(currentData)=>{
    if(currentData.data){
        createTableData(currentData.data)
        createAreaSeries(currentData.data)
        createBarsSeries(currentData.data)
    }
})
onMounted(()=>{
    if(props.data){
        createTableData(props.data)
        createAreaSeries(props.data)
        createBarsSeries(props.data)

    }
        
})
</script>
