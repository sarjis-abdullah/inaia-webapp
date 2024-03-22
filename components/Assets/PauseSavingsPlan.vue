<template>
    <Modal v-if="showPauseModal" :open="showPauseModal" @onClose="emit('showPauseModal', false)">
      <article class="">
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
            <button v-if="!pending" :disabled="disableDepotPause" @click="confirmSavingszPlanToPause" class="capitalize w-full rounded-md px-3 text-sm font-semibold shadow-sm ring-1 ring-inset bg-blue-500 text-white ring-blue-300 py-3 mt-4">
                  {{ $t('continue') }}
            </button>
            <Loading v-else/>
        </div>
      </article>
    </Modal>
    <Modal v-if="showContinueModal" :open="showContinueModal" @onClose="closeConfirmationModal" :title="`<span class='font-bold'>${$t('resumeSavingsPlan')}</span>`">
      <article class="">
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
                <button @click="closeConfirmationModal" class="px-2 py-1 border-gray-300 rounded-md uppercase text-sm">
                    {{ $t('cancel') }}
                </button>
            </div>
        </template>
    </Modal>
    <Modal v-if="pauseSavingsPlanConfirmation" :open="pauseSavingsPlanConfirmation" @onClose="closeConfirmationModal" :title="`<span class='font-bold'>${$t('pauseSavingsPlan')}</span>`">
      <article class="">
        <div class="mt-4 max-w-[14rem]">
          <p class="py-2" v-html="$t('pauseSavingsPlanConfirmation')"></p>
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
                <button @click="closeConfirmationModal" class="px-2 py-1 border-gray-300 rounded-md uppercase text-sm">
                    {{ $t('cancel') }}
                </button>
            </div>
        </template>
    </Modal>
</template>
<script lang="ts" setup>
import {ref,PropType} from 'vue';
import { type Depot } from '@/lib/models';
import { AddDepotService } from '@/lib/services';
import { DepotStatuses, WAIT_PERIOD } from '@/lib/contants';
import Modal from '@/components/common/Modal.vue';
import Loading from '@/components/common/Loading.vue';
import moment from 'moment'
//emits
const emit = defineEmits<{
  updateDepotStatus: [Depot: {}],
  showPauseModal: [Boolean: {}],
  showContinueModal: [Boolean: {}],
}>()
const props = defineProps({
    depot:{
        type: Object as PropType<Depot>
    },
    showContinueModal:{
        type:Boolean,
        default: false
    },
    showPauseModal:{
        type:Boolean,
        default: false
    },
})
const pauseSavingsPlanConfirmation = ref(false)
const isDepotStatusPaused = computed(()=> !!(props.depot?.status?.name_translation_key == DepotStatuses.paused))

const monthSliderValue = ref(1)
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
        const lastDate = moment().date(intervalDay).subtract(WAIT_PERIOD,'d');
        const now = moment();
        if(now.isSameOrAfter(lastDate) && now.isSameOrBefore(orderDay)){
            return true
        }
    }
    return false
})
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
        if (!errorText.value) {
            emit('showPauseModal', false)
            emit('showContinueModal', false)
            pauseSavingsPlanConfirmation.value = false
        }
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
const closeConfirmationModal = () => {
    errorText.value = ''
    emit('showContinueModal', false)
    pauseSavingsPlanConfirmation.value = false
}
const confirmSavingszPlanToPause = () => {
    pauseSavingsPlanConfirmation.value = true
    nextTick(()=> {
        emit('showPauseModal', false)
    })
    emit('showContinueModal', false)
}
</script>