<template>
  <ContentLoader viewBox="0 0 250 400">
    <rect x="8" y="6" rx="3" ry="3" width="235" :height="height" />
    <rect x="8" y="46" rx="3" ry="3" width="235" :height="height" />
    <rect x="8" y="86" rx="3" ry="3" width="235" :height="height" />
    <rect x="8" y="126" rx="3" ry="3" width="235" :height="height" />
    <rect x="8" y="166" rx="3" ry="3" width="235" :height="height" />
    <rect x="8" y="206" rx="3" ry="3" width="235" :height="height" />
    <rect x="8" y="246" rx="3" ry="3" width="235" :height="height" />
    <rect x="8" y="286" rx="3" ry="3" width="235" :height="height" />
    <rect x="8" y="326" rx="3" ry="3" width="235" :height="height" />
    <rect x="8" y="366" rx="3" ry="3" width="235" :height="height" />
    <rect x="8" y="406" rx="3" ry="3" width="235" :height="height" />
  </ContentLoader>
</template>
<script lang="ts" setup>
import {
  ContentLoader,
} from 'vue-content-loader'

const height = 30
</script>