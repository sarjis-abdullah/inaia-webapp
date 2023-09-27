<template>
    <div v-if="props && props.depot && props.depot.status" :class="theStyle">{{ $t(props.depot.status.name_translation_key) }}</div>
</template>
<script lang="ts" setup>
import { PropType,computed,onMounted,ref,Ref } from 'vue';
import { Depot } from '@/lib/models';
import { DepotStatuses } from '~~/lib/contants';
const props = defineProps({
    depot:{
        type: Object as PropType<Depot>
    }
});
const theStyle = computed(()=>{
    if(props.depot && props.depot.status)
    {
        switch ( props.depot.status.name_translation_key) {
            case DepotStatuses.active:
                return 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
            case DepotStatuses.blocked:
                return 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'
            case DepotStatuses.appliedForSavingPlan:
                return 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20' 
            case DepotStatuses.paused:
                return 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20' 
            case DepotStatuses.withdrawn:
                return 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'
            case DepotStatuses.canceled:
                return 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'
            default:
                return 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20' 
        }
    }
})
</script>