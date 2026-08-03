<script setup lang="ts">
import { ref, computed } from 'vue'
import FeatureImage from '@/components/feature/FeatureImage.vue'
import ArticleList from '@/components/card/ArticleList.vue'
import { useRequest } from '@/composables/useRequests'
import { getTag } from '@/api/blog/tag'

const props = defineProps<{
  slug: string
}>()

const watchParams = computed(() => [props.slug] as [string])

const { data: tagInfo } = useRequest(getTag, { defaultParams: [props.slug], watchParams: watchParams})
</script>

<template>
  <FeatureImage v-if="tagInfo" :pic="tagInfo.image">
    <div class="tag-title-wrapper">
      <h1 class="tag-title">{{ tagInfo.name }}</h1>
    </div>
  </FeatureImage>
  <ArticleList v-if="tagInfo" :category="slug" />
</template>

<style scoped>
.tag-title-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tag-title {
  color: var(--text-title);
  font-size: 40px;
  font-weight: 100;
}
</style>
