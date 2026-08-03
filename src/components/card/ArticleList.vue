<script setup lang="ts">
import ArticleCard from '@/components/card/ArticleCard.vue'
import DisplayTitle from '@/components/title/DisplayTitle.vue'

import { getArticleList } from '@/api/blog/article'
import { useRequest } from '@/composables/useRequests'

const props = defineProps<{
  categorySlug?: string
  tagSlug?: string
}>()

const { data: articles } = useRequest(() =>
  getArticleList({
    categorySlug: props.categorySlug,
    tagSlug: props.tagSlug,
  }),
)
</script>

<template>
  <div class="article-list">
    <div v-for="article in articles" :key="article.id" class="article-card">
      <ArticleCard :article="article" />
    </div>
  </div>
</template>

<style scoped>
.article-list {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
