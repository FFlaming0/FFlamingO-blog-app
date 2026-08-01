<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
// import Feature from '@/components/feature/index.vue'
// import { usePosts } from '@/composables/usePosts.ts'

const route = useRoute()
const id = Number(route.params.id)

// const { isLoading, error, getArticleById } = usePosts()

// 根据 ID 查找文章
// const article = computed(() => getArticleById(id))
</script>

<template>
  <Feature />
  <!-- <div class="post-view"> -->
  <!-- 文章不存在 -->
  <!-- <div v-if="!article" class="not-found">
      <h2>文章不存在</h2>
      <p>找不到 ID 为 {{ id }} 的文章</p>
      <RouterLink to="/">返回首页</RouterLink>
    </div> -->

  <!-- 文章存在，展示完整内容 -->
  <!-- <article v-else>
      <span class="category-tag">{{ article.category }}</span>
      <h1>{{ article.title }}</h1>
      <time>{{ article.date }}</time>
      <div class="content">{{ article.summary }}</div>
      <RouterLink to="/" class="back-link">← 返回首页</RouterLink>
    </article> -->
  <!-- </div> -->
</template>

<style scoped>
.post-view {
  max-width: 720px;
  margin: 40px auto;
  padding: 0 20px;
}

.category-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #e8f5e9;
  color: #42b883;
  border-radius: 12px;
  font-size: 13px;
  margin-bottom: 12px;
}

h1 {
  font-size: 32px;
  margin-bottom: 12px;
  line-height: 1.4;
}

time {
  display: block;
  color: #999;
  font-size: 14px;
  margin-bottom: 30px;
}

.content {
  line-height: 1.8;
  font-size: 16px;
  color: #333;
}

.content :deep(h2) {
  margin: 24px 0 12px;
  font-size: 22px;
}

.content :deep(p) {
  margin-bottom: 12px;
}

.back-link {
  display: inline-block;
  margin-top: 40px;
  color: #42b883;
  text-decoration: none;
}

.not-found {
  text-align: center;
  padding: 60px 0;
}
</style>
