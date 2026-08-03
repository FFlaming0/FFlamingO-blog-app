<script setup lang="ts">
import { ref, computed } from 'vue'
import FeatureImage from '@/components/feature/FeatureImage.vue'
import ArticleList from '@/components/card/ArticleList.vue'
import { useRequest } from '@/composables/useRequests'
import { getCategory } from '@/api/blog/category'

const props = defineProps<{
  slug: string
}>()

const watchParams = computed(() => [props.slug] as [string])

const { data: categoryInfo } = useRequest(getCategory, {
  defaultParams: [props.slug],
  watchParams: watchParams,
})
</script>

<template>
  <FeatureImage v-if="categoryInfo" :pic="categoryInfo.image">
    <div class="category-title-wrapper">
      <h1 class="category-title">{{ categoryInfo.name }}</h1>
    </div>
  </FeatureImage>
  <ArticleList v-if="categoryInfo" :category="slug" />
</template>

<style scoped>
.category-title-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.category-title {
  color: var(--text-title);
  font-size: 40px;
  font-weight: 100;
}
</style>
