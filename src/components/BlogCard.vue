<script setup lang="ts">
import type { PropType } from 'vue'
import type { Article } from '@/types/article'

const props = defineProps<{
  article: Article
}>()
</script>

<template>
  <RouterLink :to="{ name: 'post', params: { id: article.id } }" class="card-link">
    <div class="card">
      <img :src="article.cover" :alt="article.title" class="card-cover" />
      <div class="card-content">
        <span class="tag">{{ article.category }}</span>
        <h3>{{ article.title }}</h3>
        <p>{{ article.summary }}</p>
        <span class="date">{{ article.date }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.tag {
  display: inline-block;
  padding: 2px 10px;
  background: #f5ede8;
  color: var(--primary);
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: 8px;
}
.card h3 {
  margin: 18px 0 8px;
  font-size: 18px;
}
.card p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
}
.date {
  font-size: 12px;
  color: #999;
}
</style>
