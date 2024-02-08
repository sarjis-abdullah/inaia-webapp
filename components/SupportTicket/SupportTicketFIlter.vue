<template>
    <section class="grid items-center justify-between gap-2" style="grid-template-columns: 17fr 1fr;">
        <div>
            <input type="text" name="name" placeholder="Search by subject or customer name"
                class="block w-full 10 pl-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div class="cursor-pointer">
            <AdjustmentsHorizontalIcon class="w-5 h-5 ml-auto" v-if="!showDetails" @click="toggleDetails" />
            <AdjustmentsVerticalIcon class="w-5 h-5 ml-auto" v-else @click="toggleDetails" />
        </div>
        <section v-if="showDetails">
            filters
        </section>
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AdjustmentsHorizontalIcon, AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/vue/24/outline'

//data variables
const showDetails = ref(false)

//functions
const toggleDetails = () => {
    showDetails.value = !showDetails.value
}

</script>