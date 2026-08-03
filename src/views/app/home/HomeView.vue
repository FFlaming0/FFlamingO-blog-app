<script setup lang="ts">
import HomePage from './components/HomePage.vue'
import DisplayTitle from '@/components/title/DisplayTitle.vue'
import ArticleList from '@/components/card/ArticleList.vue'

// const { activeCategory, categories, filteredArticles } = usePosts()

// 处理子组件发来的分类切换事件
// function handleCategoryChange(cat: string) {
//   activeCategory.value = cat
// }
</script>

<template>
  <HomePage />
  <div class="content">
    <DisplayTitle :title="'Display'" :icon="'fa-solid fa-laptop'" />

    <DisplayTitle :title="'Article'" :icon="'fa-regular fa-bookmark'" />
    <ArticleList />

    <!-- 分类筛选组件 -->
    <!-- <CategoryFilter
      :categories="categories"
      :active-category="activeCategory"
      @update-category="handleCategoryChange"
    />

    <template v-if="filteredArticles.length === 0">
      <p class="empty-tip">该分类下暂无文章</p>
    </template>
    <template v-else>
      <p class="result-info">共 {{ filteredArticles.length }} 篇</p>
      <div class="article-grid">
        <BlogCard v-for="article in filteredArticles" :key="article.id" :article="article" />
      </div>
    </template> -->
  </div>
</template>

<style scoped>
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 20px;
}
.empty-tip {
  text-align: center;
  color: var(--secondary);
  padding: 60px 0;
}
</style>
