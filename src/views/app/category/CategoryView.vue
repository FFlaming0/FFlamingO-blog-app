<script setup lang="ts">
import { ref, watch } from 'vue'
import FeatureImage from '@/components/feature/FeatureImage.vue'
import { useRequest } from '@/composables/useRequests'
import { getCategory } from '@/api/blog/category'

const props = defineProps<{
  slug: string
}>()

const { data: categoryInfo } = useRequest(getCategory, { defaultParams: [props.slug] }) // 假设获取 ID 为 1 的分类信息
</script>

<template>
  <FeatureImage v-if="categoryInfo" :pic="categoryInfo.image">
    <h1>{{ categoryInfo.name }}</h1>
  </FeatureImage>
</template>

<style scoped></style>
