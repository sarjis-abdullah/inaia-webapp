<template>
    <a  class="block hover:bg-gray-50">
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="flex min-w-0 flex-1 items-center">
              <div class="flex-shrink-0">
                <img class="h-12 w-12 rounded-full" :src="item?.logo" alt="" />
              </div>
              <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p class="truncate text-sm font-medium text-indigo-600">{{ $t(item?.order_type?.name_translation_key) }}</p>
                  <p class="mt-2 flex items-center text-sm text-gray-500">
                    
                    <span class="truncate"><time :datetime="new Date(item?.action_date)">{{ $d(new Date(item?.action_date))}}</time></span>
                  </p>
                </div>
                <div class="hidden md:block">
                  <div>
                    <p class="text-sm text-gray-900">
                      {{ $n(item?.purchase_amount) }}
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500">
                      <CheckCircleIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                      {{ $t(item?.order_status?.name_translation_key) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </a>
</template>
<script lang="ts" setup>
import {Order} from '@/lib/models/Order';
import { PropType,computed } from 'vue';
const props = defineProps({
    item:{
      type: Object as PropType<Order>
    }
})
</script>