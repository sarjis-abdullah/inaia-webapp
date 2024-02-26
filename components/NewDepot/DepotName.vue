<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 class="text-center mb-8 text-2xl font-bold">{{ $t('set_the_name') }}</h2>
            <div class="col-span-6 sm:col-span-4 z-[1]">
            <SelectAvatar icon-class="top-[12px]" :avatar-url="target.avatar" @onSelectAvatar="handleOnSelectAvatar" className="h-32 w-32 mx-auto mb-4" />
        </div>
            <div class="mt-10">
                    
                    <div class="relative mt-1 rounded-md shadow-sm">

                        <input type="text" name="name" id="name" v-model="state.name"
                        class="block  w-full 10 pl-3 py-2 rounded-md"
                        autofocus
                        :class="(state.name.length>0)?inputStyle:inputErrorStyle"
                            />
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="state.name.length==0">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                    </div>
                </div>
            <div class="mt-10">
                  <button type="submit"  @click.prevent="setName"
                     
                      class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{{ $t('set') }}</button>
                </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid';
import { DepotTarget } from "~~/lib/models";
import SelectAvatar from '@/components/common/SelectAvatar.vue';

const state = reactive({
   name:""
});
const props = defineProps({
    target:{
            type: Object as PropType<DepotTarget>
             
         },
});
const emit = defineEmits<{
  (e: 'onNameSet',name:string): void,
  (e: 'onSelectAvatar',base_64_url:string): void,
}>()
const inputErrorStyle = 'border-red-300   text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';
const inputStyle = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
const setName = ()=>{
    if(state.name != ''){
        emit('onNameSet',state.name);
    }
}
const handleOnSelectAvatar = (base_64_url: any)=> {
    emit('onSelectAvatar', base_64_url);
}
</script>