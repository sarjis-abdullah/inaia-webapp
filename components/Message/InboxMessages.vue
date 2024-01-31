<template>
    <section class="grid grid-cols-1-2 gap-4">
        <section>
            <div class="border-t border-gray-100 px-4 pb-6 sm:col-span-2 sm:px-0">
                <dd class="mt-2 text-sm text-gray-900">
                    <ul role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200">
                        <li v-for="(message, index) in messages" :class="`${index == 0 ? 'bg-blue-100' : ''}`" class="flex justify-between py-4 pl-4 pr-5 text-sm leading-6 ">
                            <div class="flex w-0 flex-1 items-center">
                                <div class="grid gap-2">
                                    <div class="truncate font-medium">Payment Failed for Depot 1010419 Test silver te</div>
                                    <div class="truncate text-gray-400">Payment Failed for Depot 1010419 Test silver te</div>
                                </div>
                            </div>
                            <div class="ml-4 flex flex-col justify-around items-end">
                                <div class="w-2 h-2 rounded-full bg-blue-700"></div>
                                <div href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                                    10-20-2023
                                </div>
                            </div>
                        </li>
                    </ul>
                </dd>
            </div>
        </section>
        <section>
            <InboxMessageDetails />
        </section>
    </section>
</template>
  
<script setup>
import { CheckIcon, HandThumbUpIcon, UserIcon, PaperClipIcon } from '@heroicons/vue/20/solid'
import InboxMessageDetails from './InboxMessageDetails.vue'
import {ref} from 'vue'

const timeline = [
    {
        id: 1,
        content: 'Applied to',
        target: 'Front End Developer',
        href: '#',
        date: 'Sep 20',
        datetime: '2020-09-20',
        icon: UserIcon,
        iconBackground: 'bg-gray-400',
    },
    {
        id: 2,
        content: 'Advanced to phone screening by',
        target: 'Bethany Blake',
        href: '#',
        date: 'Sep 22',
        datetime: '2020-09-22',
        icon: HandThumbUpIcon,
        iconBackground: 'bg-blue-500',
    },
    {
        id: 3,
        content: 'Completed phone screening with',
        target: 'Martha Gardner',
        href: '#',
        date: 'Sep 28',
        datetime: '2020-09-28',
        icon: CheckIcon,
        iconBackground: 'bg-green-500',
    },
    {
        id: 4,
        content: 'Advanced to interview by',
        target: 'Bethany Blake',
        href: '#',
        date: 'Sep 30',
        datetime: '2020-09-30',
        icon: HandThumbUpIcon,
        iconBackground: 'bg-blue-500',
    },
    {
        id: 5,
        content: 'Completed interview with',
        target: 'Katherine Snyder',
        href: '#',
        date: 'Oct 4',
        datetime: '2020-10-04',
        icon: CheckIcon,
        iconBackground: 'bg-green-500',
    },
]
const messages = ref([{}, {}, {}, {}])
</script>