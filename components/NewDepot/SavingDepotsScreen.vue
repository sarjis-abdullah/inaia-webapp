<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div class="text-center" v-if="isLoading">
                <div class="my-10">
                    {{ $t('creatingdepotpleasewait') }}
                </div>
                <Loading :height="40" :width="40"/>
            </div>
            <div class="text-center" v-if="!isLoading && error">
                <XCircleIcon class="w-20 h-auto my-3 text-red-500 mx-auto"></XCircleIcon>
                <p class="text-red-500 text-center my-10">
                    {{ $t('errorOccured') }}
                </p>
                <InLineApiError :err="error"/>
            </div>
            <div class="text-center" v-if="!isLoading && !error && isSuccess">
                <CheckCircleIcon class="w-20 h-auto my-3 text-green-500 mx-auto"></CheckCircleIcon>
                <p class="text-green-500 text-center my-10">{{ $t('depotCreatedSuccessfully') }}</p>
                <button   @click.prevent="goToDashboard"
                     
                     class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{ $t('goToDashboard') }}</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import Loading from "@/components/common/Loading";
import InLineApiError from "@/components/common/InLineApiError";
import {  CheckCircleIcon, XCircleIcon} from '@heroicons/vue/20/solid';
import { urlBuilder } from "~~/helpers/urlBuilder";
const router = useRouter();
const {locale} = useI18n();
const props = defineProps({
    isLoading:{
        type: Boolean,
        default: false
    },
    error:{
        type: Object as PropType<Error>,
        default:null
    },
    isSuccess:{
        type: Boolean,
        default: false
    },
})
const goToDashboard = () => {
    const lang = locale.value;
    const url = urlBuilder(lang,'/dashboard');
    window.open(url,'_self');
}
</script>
