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
        <div class="text-center">
            <button @click="!isDepotStatusPaused ? showPauseModal = true : showContinueModal = true" class="inline-flex items-center rounded-md px-3 py-2 gap-2 text-sm font-semibold shadow-sm ring-1 ring-inset bg-blue-600 text-white ring-blue-300">
                <PauseIcon v-if="!isDepotStatusPaused" class="h-4 w-4" aria-hidden="true" />
                <PlayIcon v-else class="h-4 w-4" aria-hidden="true" />
                {{depotStatusText}}
            </button>
        </div>
        <p class="mt-2 text-sm text-red-600 text-center" v-if="errorText" v-html="errorText"></p>
    </a>
    <Modal v-if="showPauseModal" :open="showPauseModal" @onClose="showPauseModal = false">
      <article class="relative">
        <h2 class="leading-7 text-gray-900 text-2xl font-bold max-w-[12rem] mx-auto mb-6 text-center">
          {{ $t('pauseSavingsPlan') }}
        </h2>
        
        <div class="pt-6 flex justify-between items-center">
            <span class="font-bold text-gray-900">{{ $t('endDate') }}</span>
            <button class="leading-6 hover:text-blue-500">
                  {{ depotPauseEndDate }}
            </button>
        </div>
        <div class="flex justify-between items-center mt-4">
            <span class="font-bold text-gray-900">{{ $t('pausePeriod') }}</span>
            <button class="leading-6 hover:text-blue-500">
                  {{monthSliderValue}}{{ monthSliderValue == 1 ? ' month' : ' months' }}
            </button>
        </div>
        <div class="flex justify-between items-center mt-4">
            <input type="range" min="1" max="6" v-model="monthSliderValue" step="1" class="w-full" />
        </div>
        <div v-if="willStartNextMonth" class="text-sm mt-4 text-center text-red-500">
          <p class="py-2">{{ $t('pauseWillNotEffectCurrentTransactions') }}</p>
        </div>
        <div v-if="errorText" class="mt-4 text-center text-red-500">
          <p class="py-2" v-html="errorText"></p>
        </div>
        <div class="">
            <button v-if="!pending" :disabled="disableDepotPause" @click="resumePlan" class="capitalize w-full rounded-md px-3 text-sm font-semibold shadow-sm ring-1 ring-inset bg-blue-500 text-white ring-blue-300 py-3 mt-4">
                  {{ $t('continue') }}
            </button>
            <Loading v-else/>
        </div>
      </article>
    </Modal>
    <Modal :open="showContinueModal" @onClose="showContinueModal = false" :title="`<span class='font-bold'>${$t('resumeSavingsPlan')}</span>`">
      <article class="relative">
        <div class="mt-4 max-w-[14rem]">
          <p class="py-2" v-html="$t('areYouSureYouWantToResume')"></p>
        </div>
        <div v-if="errorText" class="mt-4 text-center text-red-500">
          <p class="py-2" v-html="errorText"></p>
        </div>
      </article>
      <template v-slot:footer>
            <div class="flex justify-end gap-2 mt-4">
                <button v-if="!pending" @click="resumePlan"
                    class="px-2 py-1 border-gray-300 rounded-md uppercase text-sm">
                    {{ $t('ok') }}
                </button>
                <Loading v-else />
                <button @click="showContinueModal = false" class="px-2 py-1 border-gray-300 rounded-md uppercase text-sm">
                    {{ $t('cancel') }}
                </button>
            </div>
        </template>
    </Modal>
</template>
<script lang="ts" setup>
import {ref,PropType,Ref} from 'vue';
import { Depot } from '@/lib/models';
import { AddDepotService, CurrencyService } from '@/lib/services';
import ListItem from '@/components/common/ListItem';
import DepotStatus from '@/components/Assets/DepotStatus';
import { PlusIcon, PlayIcon, PauseIcon } from '@heroicons/vue/20/solid'
import { DepotStatuses } from '@/lib/contants';
import Modal from '@/components/common/Modal.vue';
import Loading from '@/components/common/Loading.vue';
import moment from 'moment'
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
const route = useRoute();
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
const monthSliderValue = ref(1)
const waitPeriod = 7;
const depotPauseEndDate = computed(()=> moment().format(moment().add(monthSliderValue.value,'M').format('yyyy-MM-DD')))
const disableDepotPause = computed(()=> {
    if(monthSliderValue.value > 0 && monthSliderValue.value < 7)
        return false
    return true
})
const willStartNextMonth = computed(() => {
    const intervalDay = props?.depot?.interval_day;
    if (intervalDay) {
        let orderDay = null;
        if(intervalDay == 15)
            orderDay = moment().date(intervalDay);
        if(intervalDay == 1)
            orderDay = moment().month(moment().get('month')+1).date(intervalDay);
        const lastDate = moment().date(intervalDay).subtract(waitPeriod,'d');
        const now = moment();
        if(now.isSameOrAfter(lastDate) && now.isSameOrBefore(orderDay)){
            return true
        }
    }
    return false
})
const showPauseModal = ref(false)
const showContinueModal = ref(false)
const depotStatusId = ref(null)
const depotData = computed(()=> {
    if(!isDepotStatusPaused.value && depotPauseEndDate.value){
        return {
            status_id: depotStatusId.value,
            end_date: depotPauseEndDate.value,
        }
    }
    return {
        status_id: depotStatusId.value
    }
})
const errorText = ref('')
const pending = ref(false)
const resumePlan = async()=>{
    try{
        pending.value = true
        await getDepotStatusList()
        if(props?.depot?.id){
            let result = await AddDepotService.updateDepotStatus(props.depot.id, depotData.value)
            emit('updateDepotStatus', result)
        }
        errorText.value = ''
    }
    catch(err)
    {
        errorText.value = err?.message;
    }
    finally {
        pending.value = false
        showPauseModal.value = false
        showContinueModal.value = false
    }
}
const getDepotStatusList = async()=>{
    try{
        let result = await AddDepotService.getDepotStatusList()
        if (result?.length) {
            const found = result?.find(el => {
            const status = isDepotStatusPaused.value ? DepotStatuses.active : DepotStatuses.paused
                if (el.name_translation_key == status) {
                    return el
                }
            });
            depotStatusId.value = found?.id
        }
        return Promise.resolve(result)
    }
    catch(err)
    {
        errorText.value = err?.message;
        return Promise.reject(err)
    }
    finally {
    }
}
</script>