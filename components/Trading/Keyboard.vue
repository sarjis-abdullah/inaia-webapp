<template>
    <div class="w-full">
        
        <div class="grid grid-cols-3 gap-4">
            <a class="mx-auto p-4 text-gray-800 text-center text-xl rounded-lg cursor-pointer hover:bg-sky-700" @click.prevent="pushButton('1')">1</a>
            <a class="mx-auto p-4 text-gray-800 text-center text-xl" @click.prevent="pushButton('2')">2</a>
            <a class="mx-auto p-4 text-gray-800 text-center text-xl" @click.prevent="pushButton('3')">3</a>
        </div>
        <div class="grid grid-cols-3 gap-4">
            <a class="mx-auto p-4 text-gray-800 text-center text-xl" @click.prevent="pushButton('4')">4</a>
            <a class="mx-auto p-4 text-gray-800 text-center text-xl" @click.prevent="pushButton('5')">5</a>
            <a class="mx-auto p-4 text-gray-800 text-center text-xl" @click.prevent="pushButton('6')">6</a>
        </div>
        <div class="grid grid-cols-3 gap-4">
            <a class="mx-auto p-4 text-gray-800 text-center text-xl" @click.prevent="pushButton('7')">7</a>
            <a class="mx-auto p-4 text-gray-800 text-center text-xl" @click.prevent="pushButton('8')">8</a>
            <a class="mx-auto p-4 text-gray-800 text-center text-xl" @click.prevent="pushButton('9')">9</a>
        </div>
        <div class="grid grid-cols-3 gap-4">
            <a class="mx-auto p-4 text-gray-800 text-center text-xl"></a>
            <a class="mx-auto p-4 text-gray-800 text-center text-xl" @click.prevent="pushButton('0')">0</a>
            <a class="mx-auto p-4 text-gray-800 text-center text-xl" @click.prevent="pushButton('back')"><BackspaceIcon class="w-6"/></a>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { BackspaceIcon } from '@heroicons/vue/20/solid';
const emit = defineEmits<{
  (e: 'onPress',value:string): void
}>()
const pushButton = (value:string)=>{
    emit('onPress',value);
}
</script>