<template>
    <header class="flex justify-between text-gray-900 mb-3  text-xl">
        <h6>{{ title }}</h6>
        <div v-if="showFilterButton">
            <AdjustmentsHorizontalIcon v-if="!showDetails" @click="showDetailsection" class="h-5 w-5 cursor-pointer"
                aria-hidden="true" />
            <AdjustmentsVerticalIcon v-else @click="showDetailsection" class="h-5 w-5 cursor-pointer" aria-hidden="true" />
        </div>
    </header>
    <section v-if="showDetails" class="flex items-end justify-between py-4">
        <section class="flex gap-2">
            <div class="flex flex-col gap-2">
                <div>{{ $t('startDate') }}</div>
                <input type="date" name="startDate" id="orderStartDate" required v-model="startDate"
                    class="block  w-full 10 pl-3 py-2 rounded-md" placeholder="" />
            </div>
            <div class="flex flex-col gap-2">
                <div>{{ $t('endDate') }}</div>
                <input type="date" name="startDate" id="orderStartDate" required v-model="endDate"
                    class="block  w-full 10 pl-3 py-2 rounded-md" placeholder="" />
            </div>
            <div v-if="conditionToDateFilter" class="flex flex-col gap-2 justify-around">
                <div></div>
                <XMarkIcon @click="removeDateFilter" class="h-5 w-5 rounded-full cursor-pointer" />
            </div>
        </section>
        <div>
            <Loading v-if="pdfLoading" />
            <button v-else :disabled="!conditionToDateFilter || pdfLoading" @click="downloadOrderStatement" type="button"
                class="relative inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold shadow-sm ring-1 ring-inset bg-blue-500 text-white ring-blue-300">
                <span>{{ $t('downloadPDF') }}</span>
            </button>
        </div>
    </section>
</template>

<script lang="ts" setup>
import {ref,computed, watch} from 'vue'
import { AdjustmentsHorizontalIcon, AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import Loading from '@/components/common/Loading.vue';

defineProps ({
    pdfLoading:{
      type: Boolean,
      default:false
    },
    title:{
      type:String,
      requred:true
    },
    showFilterButton:{
      type:Boolean,
      default:false
    }
})
const showDetails = ref(false);
const startDate = ref("");
const endDate = ref("");

const emit = defineEmits<{
  filterOrderBy: [dateQuery: {}]
  downloadOrderStatement: [dateQuery: {}]
}>()

const dateQuery = computed(()=> {
  let params = {}
  if (startDate.value) {
    params.startDate = startDate.value
  }
  if (startDate.value && endDate.value) {
    params.endDate = endDate.value
  }
  return params
})
const statementDateQuery = computed(()=> {
  let params = {}
  if (startDate.value) {
    params.start_date = startDate.value
  }
  if (params.start_date && endDate.value) {
    params.end_date = endDate.value
  }
  return params
})
const conditionToDateFilter = computed(()=> showDetails.value && startDate.value && endDate.value)

const filterOrderBy = (dateQuery: {})=>{
  emit('filterOrderBy', dateQuery);
}
const downloadOrderStatement = async()=>{
  emit('downloadOrderStatement', statementDateQuery.value);
}
const showDetailsection = () => {
  showDetails.value = !showDetails.value
}
const removeDateFilter = () => {
  filterOrderBy({})
  startDate.value = ""
  endDate.value = ""
}

watch(dateQuery, ()=> {
  if (conditionToDateFilter.value) {
    filterOrderBy(dateQuery.value)
  }
}, { deep: true, immediate: true })
</script>