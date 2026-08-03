<script setup lang="ts">
import GlassBox from '@/components/box/GlassBox.vue'
import AppLink from '@/components/link/AppLink.vue'

import type { ArticleListItem } from '@/api/blog/article/types'

const props = defineProps<{ article: ArticleListItem }>()

const badgeProps = {
  padding: '5px 10px',
  radius: '4px',
  bg: '#33333360',
  opacity: 1,
  blur: '10px',
  borderWidth: '1px',
  borderColor: '#7d7d7d30',
  boxShadow: 'none',
  width: 'max-content',
  display: 'inline-flex',
  alignItems: 'left',
  justifyContent: 'center',
}

const badgeStyle = {
  position: 'absolute',
  top: '10px',
  zIndex: 3,
}
</script>

<template>
  <AppLink :to="{ name: 'article', params: { slug: article.slug } }">
    <div class="article-card">
      <img v-if="article.coverImage" class="cover-image" :src="article.coverImage" alt="" />
      <GlassBox v-bind="badgeProps" :style="badgeStyle" style="left: 10px">
        <span class="article-data">
          <i class="fa-regular fa-clock"></i> 发布于 &nbsp;
          {{ article.publishTime.split(' ')[0] }} &nbsp;
        </span>
        <span v-if="article.isTop" class="article-top">
          <i class="fa-solid fa-chess-queen"></i> 置顶
        </span>
      </GlassBox>
      <GlassBox
        v-bind="badgeProps"
        :style="badgeStyle"
        style="right: 10px"
        flex-direction="row"
        gap="4px 12px"
      >
        <span class="article-data">
          <i class="fa-regular fa-eye"></i> {{ article.viewCount }} 热度
        </span>
        <span class="article-data">
          <i class="fa-regular fa-comment"></i>
          {{ article.commentCount > 0 ? article.commentCount + ' 评论' : '无 ~' }}
        </span>
        <span class="article-data">
          <i class="fa-regular fa-folder"></i>
          <AppLink :to="{ name: 'category', params: { slug: article.category.slug } }">
            {{ article.category.name }}
          </AppLink>
        </span>
        <span class="article-data">
          <i class="fa-solid fa-hourglass"></i> {{ article.readingTime }} 分钟
        </span>
      </GlassBox>

      <div v-if="article.summary" class="summary">
        <div class="summary-label"><i class="fa-solid fa-bars-staggered"></i> 摘要</div>
        <p>{{ article.summary }}</p>
      </div>

      <GlassBox
        class="article-title"
        :opacity="1"
        radius="0px"
        :backdrop-filter="'saturate(180%) blur(10px)'"
        :box-shadow="'0 1px 30px -4px #e8e8e8'"
        :padding="'10px 15px'"
        :margin="5"
        :max-width="'80%'"
        :width="'fit-content'"
        display="inline-flex"
        flex-direction="row"
      >
        <span class="title-text">
          {{ article.title }}
        </span>
      </GlassBox>
    </div>
  </AppLink>
</template>

<style scoped>
.article-card {
  width: 820px;
  height: 300px;
  border-radius: 12px;
  padding: 0;
  margin: 15px; /* 上下 15px，左右自动居中 */
  background: var(--bg-primary);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.cover-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: height 0.4s ease;
  z-index: 0;
}

.cover-image:hover {
  height: 100%;
  z-index: 2;
}

.article-data {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.article-top {
  color: #ffd700;
  font-size: 12px;
}

.article-top i,
.article-data i {
  margin-right: 5px;
}

.article-data a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.article-data a:hover {
  color: var(--primary);
}

.summary {
  position: absolute;
  bottom: 12px;
  width: 98%;
  max-height: 15%;
  height: fit-content;
  left: 5px;
  margin: 0;
  margin-top: 5px;
  padding: 0 10px;
  color: #000000a8;
  z-index: 1;
  overflow: hidden;
  font-size: 15px;
}

.summary-label {
  padding: 15px 10px;
  color: #cccccc;
  border-radius: 10px !important;
  line-height: 1.5;
  letter-spacing: 1px;
  float: left;
}

.summary-label i {
  margin-right: 4px;
}

.article-title {
  position: absolute;
  bottom: 22%;
  left: 2%;
  z-index: 3;
  max-height: 34%;
  overflow: hidden;
  will-change: backdrop-filter;
  pointer-events: auto;
}

.article-title:hover {
  box-shadow: 0 1px 20px 10px rgba(232, 232, 232, 0.3);
  /* background: rgba(255, 255, 255, 0.85); */
}

.title-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary);
  line-height: 1.4;
  text-decoration: none;
  word-break: break-word;
  transition: color 0.3s ease;
}

.title-text:hover {
  color: var(--secondary);
}
</style>
