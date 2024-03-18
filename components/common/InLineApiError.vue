<template>
    <p class="mt-2 text-sm text-red-600 text-center" v-if="errorText" v-html="errorText"></p>
    <p v-else></p>
</template>
<script lang="ts" setup>
import { BadInputException, MissingInformationException,ServerErrorException } from '@/lib/exceptions';

import { ErrorCode } from '@/lib/contants';
import { urlBuilder } from '~~/helpers/urlBuilder';
const { t,locale } = useI18n();
const errorText = ref(null);
const props = defineProps({
    err:{
        type: Object as PropType<Exception>
    }
})
const handleError = (value)=>{
        if(value.err instanceof MissingInformationException || value.err instanceof BadInputException){
            if(value.err.getRealMessage() == ErrorCode.invalid_link)
            {
                const url = urlBuilder(locale.value,'/request-password');
                errorText.value = t('requestNewLink')+' '+`<a class="font-semibold cursor-pointer" href="${url}"'>${t('clickHere')}</a>`;
                return;
            }
            else{
                errorText.value = value.err.getRealMessage();
            }
        }
        else if(value.err instanceof ServerErrorException){
            errorText.value = t(value.err.getTranslationKey());
            useBugsnag().notify(props.err);
        }
        else
        {
            
            errorText.value = value.message;
            useBugsnag().notify(props.err);
        }    
}
onMounted(()=>{
    if(props.err)
        handleError(props)
})
watch(props,(currentValue)=>{
    if(currentValue.err)
        handleError(currentValue);
})

</script>                                               