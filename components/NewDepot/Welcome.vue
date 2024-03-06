<template>
    <div v-if="!loading" class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 class="text-center mb-8 text-2xl font-bold">{{ title }}</h2>
            <img v-if="imgSrc" :src="imgSrc" alt="asset" class="w-32 h-auto mb-5 mx-auto"/>
            <h3 class="text-center mb-8 text-xl">{{ benifits }}</h3>
            <div class="inline-flex w-full items-center my-3" v-for="item in options" :key="item.key">
                <CheckIcon class="w-5 mr-3"/>
                <div class="text-gray-900">{{ item.value }}</div>
            </div>
            <div class="mt-8">
                  <button type="submit"  @click.prevent="statAddingDepot"
                     
                      class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{ $t('start') }}</button>
                </div>
        </div>
    </div>
    <div v-if="loading" class="flex justify-center mt-28">
        <Loading />
    </div>
</template>
<script lang="ts" setup>
import { AssetTypes } from "~~/lib/contants";
import { CheckIcon } from '@heroicons/vue/24/outline';
import Loading from '@/components/common/Loading.vue';
const { t,locale } = useI18n();
const props = defineProps({
    type:{
        type:String,
    },
    depotName:{
        type:String,
        defaut: ""
    },
})
const options = ref([]);
const title = ref('');
const imgSrc = ref('');
const benifits = ref('')
const loading = ref(true)

const emit = defineEmits<{
  (e: 'start'): void
}>()
const statAddingDepot = ()=>{
    emit('start');
}
onMounted(()=>{
    if(props.type == AssetTypes.silver){
        title.value = t('whyInvestInSilver');
        imgSrc.value = new URL('~/assets/img/icons/silverBars.png',import.meta.url).href;
        benifits.value = t('advantagesOfSilver');
        options.value = [
            {key:1,value:t('silverCrisisResistant')},
            {key:2,value:t('optimalWealthAccumulation')},
            {key:3,value:t('industryDemanded')},
            {key:4,value:t('tvaExempted')},
        ]
    }
    if(props.type == AssetTypes.gold){
        title.value = t('whyInvestInGold');
        imgSrc.value = new URL('~/assets/img/icons/goldbars.png',import.meta.url).href;
        benifits.value = t('advantagesOfGold');
        options.value = [
            {key:1,value:t('crisisResistant')},
            {key:2,value:t('optimalWealthAccumulation')},
            {key:3,value:t('benefitsGoldGreenGold')},
            {key:4,value:t('LBMAcertified')},
        ]
        if(locale.value == 'de'){
            options.value.push(
                {key:5,value:'Keine Abgeltungssteuer (25 %)'},
            );
        }
        options.value.concat([
            {key:6,value:t('noTva')},
            {key:7,value:t('ondemandDelivery')},
            {key:8,value:t('securedStorageGermany')},
        ])
    }
    loading.value = false
}) 
</script>