<template>
    <a class="flex flex-col rounded-lg bg-white shadow p-3" >
        <div v-if="depot && depot.is_savings_plan==1">
            <div class="w-full mt-5 p-2">
                <div class="flex flex-row items-center x-max">
                    <div class="flex flex-row flex-1">
                        <h2 class="text-gray-900 font-semibold text-xl">Savings plan</h2>
                        <DepotStatus :depot="depot" class="ml-2"/>
                    </div>
                    <span class="self-end">{{ depot && depot.interval_amount?$n(depot.interval_amount/100):0 }} {{ currency }} / {{ $t('monthly') }}</span>
                </div>
                <div class="h-1 bg-gray-300 w-full mt-2" ref="line">
                    <div class="h-1  bg-blue-500" :style="'width:'+lineWith+'px'" v-if="lineWith > 0">

                    </div>
                </div>
                <div class="flex flex-row items-center x-max">
                    <div class="flex flex-row flex-1">
                        <span class="text-sm text-gray-400">{{ depot && depot.progress?$n(depot?.progress):0 }} %</span>
                    </div>
                    <span class="text-sm text-gray-400 self-end">{{ depot && depot.invested_amount?$n(depot.invested_amount/100):0 }} {{ currency }} {{ $t('from') }} {{ depot && depot.target_amount ? $n(depot.target_amount/100):0 }} {{ currency }}</span>
                </div>

            </div>
            <div class="divide-y p-2">
                <ListItem :title="$t('contract_term')"><span>{{ depot && depot.interval_startdate?$d(depot.interval_startdate):'' }} - {{ depot && depot.interval_enddate?$d(depot.interval_enddate):'' }}</span></ListItem>
                <ListItem :title="$t('interval_day')"><span>{{ depot && depot.interval_day?$t(depot.interval_day.toString()):'' }}</span></ListItem>
                <ListItem :title="$t('agio')"><span>{{ depot && depot.agio?$n(depot.agio/100):0 }} {{ currency }}</span></ListItem>
                <ListItem :title="$t('payment_method')"><span>{{ depot && depot.payment_method?$t(depot.payment_method):'' }}</span></ListItem>
            </div>
        </div>
        <div v-if="depot && depot.is_savings_plan==0">
            <div class="text-center">
                
                <h3 class="mt-2 text-sm font-semibold text-gray-900">{{ $t('no_savings_plan') }}</h3>
                <p class="mt-1 text-sm text-gray-500">{{ $t('saving_plan_not_active') }}</p>
                <div class="mt-6">
                <button type="button" class="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                @click.prevent="addSavingPlan" v-if="isVerified"
                >
                    <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    {{ $t('add_saving_plan') }}
                </button>
                </div>
            </div>
        </div>
        <div v-if="depot && depot.is_savings_plan==1" class="text-center">
            <button @click="!isDepotStatusPaused ? showPauseModal = true : showContinueModal = true" class="inline-flex items-center rounded-md px-3 py-2 gap-2 text-sm font-semibold shadow-sm ring-1 ring-inset bg-blue-600 text-white ring-blue-300">
                <PauseIcon v-if="!isDepotStatusPaused" class="h-4 w-4" aria-hidden="true" />
                <PlayIcon v-else class="h-4 w-4" aria-hidden="true" />
                {{depotStatusText}}
            </button>
        </div>
    </a>
    <SavingsPlanPauseResumeControl :depot="depot" :showPauseModal="showPauseModal" @updateDepotStatus="updateDepotStatus" @showPauseModal="showPauseModal = false" :showContinueModal="showContinueModal" @showContinueModal="showContinueModal=false" />
</template>
<script lang="ts" setup>
import {ref,PropType} from 'vue';
import { type Depot } from '@/lib/models';
import { CurrencyService } from '@/lib/services';
import ListItem from '@/components/common/ListItem';
import { PlusIcon, PlayIcon, PauseIcon } from '@heroicons/vue/20/solid'
import DepotStatus from '@/components/Assets/DepotStatus';
import { DepotStatuses } from '@/lib/contants';
import SavingsPlanPauseResumeControl from '@/components/Assets/SavingsPlanPauseResumeControl.vue';
//emits
const emit = defineEmits<{
  updateDepotStatus: [Depot: {}],
}>()
const props = defineProps({
    depot:{
        type: Object as PropType<Depot>
    },
    isVerified:{
        type:Boolean
    }
})
const line = ref(null);
const { locale, t } = useI18n();
const router = useRouter();
const currency = CurrencyService.getCurrencySymbol()
const addSavingPlan = ()=>{
    router.push('/'+locale.value+'/depot/addsavingplan/'+props.depot.id);
    /*const url = "http://"+window.location.host+'/'+locale.value+'/depot/addsavingplan/'+props.depot.id;
    window.open(url,'_self');*/
}
const lineWith = computed(()=>{
   
    if(props.depot  && props.depot.progress && line.value){
        console.log(line.value.clientWidth);
        const width =  (line.value.clientWidth/100)*props.depot.progress;
        console.log(width);
        return width;
        
    }
    return 0;
})
const isDepotStatusPaused = computed(()=> !!(props.depot?.status?.name_translation_key == DepotStatuses.paused))
const depotStatusText = computed(()=>{
    if(isDepotStatusPaused.value){
        return t('continue');
    }
    return t('pause');
})
const showPauseModal = ref(false)
const showContinueModal = ref(false)
const updateDepotStatus = (depot: Depot) => {
    emit('updateDepotStatus', depot)
}
</script>