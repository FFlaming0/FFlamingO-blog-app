<script setup lang="ts">
import { computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import FeatureImage from '@/components/feature/FeatureImage.vue'
import RoundAvatar from '@/components/avatar/RoundAvatar.vue'
import Catalogue from './components/Catalogue.vue'
import { useRequest } from '@/composables/useRequests'
import { getArticle } from '@/api/blog/article'

defineProps<{
  slug: string
}>()

const { data: article } = useRequest(getArticle, {
  defaultParams: [{ id: 1, slug: 'monster-wisadel' }],
})

// 获取滚动 Y 轴偏移
const { y } = useWindowScroll()
// 当滚动超过 400px（FeatureImage 高度）时显示目录
const showToc = computed(() => y.value > 300)
</script>

<template>
  <FeatureImage v-if="article" :pic="article.coverImage">
    <div class="article-title-wrapper">
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-meta">
        <RoundAvatar :diameter="20" />
        <span class="author">{{ 'FFlamingO' }}</span>
        <span class="dot">·</span>
        <span class="date">发布于 {{ article.publishTime }}</span>
        <span class="dot">·</span>
        <span class="views">{{ article.viewCount }} 次阅读</span>
      </div>
    </div>
  </FeatureImage>
  <!-- <div v-if="article" class="content" v-html="article.contentHtml"></div> -->
  <div v-if="article" class="article-layout">
    <!-- 正文区域 -->
    <div class="content" v-html="article.contentHtml"></div>

    <!-- 目录（桌面端） -->
    <aside v-show="showToc" class="toc-aside">
      <Catalogue :content="article.contentHtml" />
    </aside>
  </div>
</template>

<style scoped>
.article-title-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 垂直底部对齐 */
  align-items: flex-start; /* 水平左对齐 */
  width: 100%;
  height: 100%;
  padding: 50px;
  gap: 10px;
  box-sizing: border-box;
}

.article-title {
  color: var(--text-title);
  font-size: 40px;
  font-weight: 100;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  flex-wrap: wrap;
  color: var(--text-title);
}

.article-meta .author {
  font-weight: 500;
}

.article-meta .date,
.article-meta .views {
  opacity: 0.85;
}

.article-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center; /* 整体居中 */
  gap: 40px;
  align-items: flex-start;
}

.content {
  box-sizing: border-box;
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-primary);
}

.toc-aside {
  position: fixed;
  right: 20px;         /* 距离右侧边距 */
  top: 100px;          /* 与顶部保持距离，适应固定导航栏 */
  width: 240px;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  z-index: 10;
  /* 移动端隐藏 */
  display: block;
}

/* 移动端隐藏目录 */
@media (max-width: 1100px) {
  .toc-aside {
    display: none;
  }
  .content {
    flex: 1 1 100%;
    max-width: 820px;
    margin: 0 auto;
  }
  .article-layout {
    justify-content: center;
  }
}

/* 移动端进一步适配 */
@media (max-width: 768px) {
  .article-layout {
    padding: 0 16px;
  }
  .content {
    flex: 1 1 100%;
    max-width: 100%;
  }
}

/* 正文内部样式 */
.content :deep(h2) {
  font-size: 24px;
  margin: 30px 0 16px;
}
.content :deep(h3) {
  font-size: 20px;
  margin: 24px 0 12px;
}
.content :deep(p) {
  margin-bottom: 16px;
}
.content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
}
</style>
