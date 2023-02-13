<template>
    <div class="grid-cols-6 gap-8">
        <input type="text" class="outline outline-1 text-center w-8 h-8 mx-2" maxlength="1" autofocus data-index="0" v-model="state.digit1" @paste="onPaste" @keyup="(value)=>onChange(value,0)" ref="digit1Input"/>
        <input type="text" class="outline outline-1 text-center w-8 h-8 mx-2" maxlength="1"  data-index="1" v-model="state.digit2" @keyup="(value)=>onChange(value,1)" ref="digit2Input"/>
        <input type="text" class="outline outline-1 text-center w-8 h-8 mx-2" maxlength="1"  data-index="2" v-model="state.digit3" @keyup="(value)=>onChange(value,2)" ref="digit3Input"/>
        <input type="text" class="outline outline-1 text-center w-8 h-8 mx-2" maxlength="1"  data-index="3" v-model="state.digit4" @keyup="(value)=>onChange(value,3)" ref="digit4Input"/>
        <input type="text" class="outline outline-1 text-center w-8 h-8 mx-2" maxlength="1"  data-index="4" v-model="state.digit5" @keyup="(value)=>onChange(value,4)" ref="digit5Input" v-show="length>4"/>
        <input type="text" class="outline outline-1 text-center w-8 h-8 mx-2" maxlength="1"  data-index="5" v-model="state.digit6" @keyup="(value)=>onChange(value,5)" ref="digit6Input" v-show="length>4"/>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
const props = defineProps({
    length : {
        
        default:6
    }
})
const state = reactive({
        digit1:null,
        digit2:null,
        digit3:null,
        digit4:null,
        digit5:null,
        digit6:null
});

const codes = ref([-1,-1,-1,-1,-1,-1]);
const digit1Input = ref(null);
const digit2Input = ref(null);
const digit3Input = ref(null);
const digit4Input = ref(null);
const digit5Input = ref(null);
const digit6Input = ref(null);
const digitInputs = [digit1Input,digit2Input,digit3Input,digit4Input,digit5Input,digit6Input];

const onChange=(key:any,number:number)=>{
    let pressed = key.key;
    if(pressed == 'Backspace')
    {
        if(number>0){
            digitInputs[number-1].value.focus()
        }
        codes.value[number]=-1;
    }
    else if(!isNaN(pressed) && pressed.length == 1)
    {
        if(number<(props.length-1)){
            digitInputs[number+1].value.focus();
        }
        codes.value[number]=parseInt(pressed);
    }
}
const verifyNumber = (num)=>{
    return !isNaN(num) && parseInt(num) <10;
}
const onPaste=(value)=>{
    let digits = value.clipboardData.getData('text');
    if(!isNaN(digits) && digits.length == props.length){
        state.digit1 = digits[0];
        state.digit2 = digits[1];
        state.digit3 = digits[2];
        state.digit4 = digits[3];
        if(props.length == 6){
            state.digit5 = digits[4];
            state.digit6 = digits[5];
        }
        

    }

}
const emit = defineEmits<{
  (e: 'complete', code:string): void
}>()
watch(state,(currentVaue)=>{
    const forthCondition= verifyNumber(currentVaue.digit1) &&
    verifyNumber(currentVaue.digit2) &&
    verifyNumber(currentVaue.digit3) &&
    verifyNumber(currentVaue.digit4);
    if(props.length == 4 && forthCondition)
    {
        let code = currentVaue.digit1+currentVaue.digit2+currentVaue.digit3+currentVaue.digit4;
        emit('complete',code);
    }
    else if(verifyNumber(currentVaue.digit6) &&
    verifyNumber(currentVaue.digit5)){
        let code = currentVaue.digit1+currentVaue.digit2+currentVaue.digit3+currentVaue.digit4+currentVaue.digit5+currentVaue.digit6;
        emit('complete',code);
    }
})
</script>
<style scoped>
</style>