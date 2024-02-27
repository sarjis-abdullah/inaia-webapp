<template>
    <p class="mt-2 text-sm text-red-600 text-center" v-if="errorText">{{ errorText }}</p>
    <p v-else></p>
</template>
<script lang="ts" setup>
import { BadInputException, MissingInformationException,ServerErrorException } from '@/lib/exceptions';
import { PropType } from "nuxt/dist/app/compat/capi";
const { t } = useI18n();
const errorText = ref(null);
const props = defineProps({
    err:{
        type: Object as PropType<Exception>
    }
})
const handleError = (value)=>{
    if(value.err instanceof MissingInformationException || value.err instanceof BadInputException){
            errorText.value = value.err.getRealMessage();
        }
        else if(value.err instanceof ServerErrorException){
            errorText.value = t(value.err.getTranslationKey());
        }
        else
            errorText.value = t(value.err);
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