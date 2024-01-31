<template>
    <section>
        <section class="border-t border-gray-100 px-4 pb-6 sm:col-span-2 sm:px-0">
            <article class="grid gap-2 mt-4">
                <header>
                    <h3 class="text-3xl font-medium leading-6 text-gray-900">hello</h3>
                    <h6 class="text-base font-medium leading-6 text-gray-900">10-20-2023</h6>
                </header>
                <summury class="text-xl font-medium leading-6 text-gray-900">
                     summury
                </summury>
                <p class="text-base">Message text details</p>
            </article>
            <section>
                <header class="text-sm font-medium leading-6 text-gray-900">Documents</header>
                <section class="mt-2 text-sm text-gray-900">
                    <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                        <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                            <div class="flex w-0 flex-1 items-center">
                                <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span class="truncate font-medium">resume_back_end_developer.pdf</span>
                                    <span class="flex-shrink-0 text-gray-400">2.4mb</span>
                                </div>
                            </div>
                            <div class="ml-4 flex-shrink-0">
                                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                            </div>
                        </li>
                        <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                            <div class="flex w-0 flex-1 items-center">
                                <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span class="truncate font-medium">coverletter_back_end_developer.pdf</span>
                                    <span class="flex-shrink-0 text-gray-400">4.5mb</span>
                                </div>
                            </div>
                            <div class="ml-4 flex-shrink-0">
                                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                            </div>
                        </li>
                    </ul>
                </section>
            </section>
        </section>
    </section>
</template>
  
<script setup>
import { CheckIcon, HandThumbUpIcon, UserIcon, PaperClipIcon } from '@heroicons/vue/20/solid'

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
</script>