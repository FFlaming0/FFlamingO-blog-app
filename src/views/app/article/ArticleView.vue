<script setup lang="ts">
import { computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import FeatureImage from '@/components/feature/FeatureImage.vue'
import RoundAvatar from '@/components/avatar/RoundAvatar.vue'
import RoRAvatar from '@/components/avatar/RoRAvatar.vue'
import AppLink from '@/components/link/AppLink.vue'
import Catalogue from './components/Catalogue.vue'
import { useRequest } from '@/composables/useRequests'
import { getArticle } from '@/api/blog/article'
import { useBloggerStore } from '@/stores/blogger'

const props = defineProps<{
  slug: string
}>()

const watchParams = computed<[params: { slug: string }]>(() => [{ slug: props.slug }])

const { data: article } = useRequest(getArticle, {
  defaultParams: [{ slug: props.slug }],
  watchParams: watchParams,
})

const bloggerStore = useBloggerStore()
const { blogger } = storeToRefs(bloggerStore)

// 获取滚动 Y 轴偏移
// const { y } = useWindowScroll()
// 当滚动超过 400px（FeatureImage 高度）时显示目录
// const showToc = computed(() => y.value > 300)
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
  <div v-if="article">
    <!-- 正文区域 -->
    <div class="content">
      <div v-html="article.contentHtml"></div>

      <div v-if="blogger" class="article-footer">
        <AppLink
          :to="'https://creativecommons.org/licenses/by-sa/4.0/deed.zh_CN'"
          :title="'此文章遵守 CC BY-SA 4.0 知识共享许可协议'"
          class="footer-item article-license"
        >
          <i class="fa-brands fa-creative-commons"></i>
          <i class="fa-brands fa-creative-commons-by"></i>
          <i class="fa-brands fa-creative-commons-sa"></i>
        </AppLink>
        <div class="footer-item avatar">
          <!-- <RoundAvatar :diameter="30" /> -->
          <RoRAvatar :diameter="30" />
        </div>
        <div class="footer-item">
          {{ blogger.nickname }}
        </div>
        <div class="footer-item">
          <i class="fa-solid fa-feather"></i>
          {{ blogger.bio }}
        </div>
        <div class="footer-item">
          <i class="fa-solid fa-calendar-day"></i>
          最后更新于 {{ article.publishTime }}
        </div>
        <div class="footer-item">
          <i class="fa-solid fa-tag"></i>
          <span v-for="tag in article.tags">
            <AppLink class="tag-name" :to="{ name: 'tag', params: { slug: tag.slug } }">{{ tag.name }}</AppLink>
          </span>
        </div>
      </div>

      <section class="post-squares nextprev">
        <AppLink
          v-if="article.previousArticle"
          :to="'/article/' + article.previousArticle.slug"
          rel="prev"
          class="prev"
        >
          <div
            class="background"
            :style="{ backgroundImage: 'url(' + article.previousArticle.coverImage + ')' }"
          ></div>
          <span class="label">上一篇文章</span>
          <div class="info">
            <h3>{{ article.previousArticle.title }}</h3>
          </div>
        </AppLink>
        <AppLink
          v-if="article.nextArticle"
          :to="'/article/' + article.nextArticle.slug"
          rel="next"
          class="next"
        >
          <div
            class="background"
            :style="{ backgroundImage: 'url(' + article.nextArticle.coverImage + ')' }"
          ></div>
          <span class="label">下一篇文章</span>
          <div class="info">
            <h3>{{ article.nextArticle.title }}</h3>
          </div>
        </AppLink>
      </section>
    </div>

    <!-- 目录（桌面端） -->
    <!-- <aside v-show="showToc" class="toc-aside">
      <Catalogue :content="article.contentHtml" />
    </aside> -->
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
  right: 20px; /* 距离右侧边距 */
  top: 100px; /* 与顶部保持距离，适应固定导航栏 */
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

.article-footer {
  padding: 30px 0;
  width: 100%;
  height: auto;
  margin: auto;
  position: relative;
  float: left;
  border: none;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}

.footer-item {
  float: left;
  box-shadow: 0 1px 30px -4px #e8e8e8;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  border: 1px solid #ffffff;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 16px;
  color: #7d7d7d;
  font-size: 13px;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.footer-item i {
  margin-right: 5px;
}

.footer-item:hover {
  box-shadow: 0 8px 32px -4px rgba(0, 0, 0, 0.4);
}

.article-license {
  font-size: 24px;
  padding: 12px;
}

.avatar {
  padding: 9px 9.5px;
}

.tag-name {
  color: #7d7d7d;
  transition: all ease 0.3s;
}

.tag-name:hover {
  color: var(--primary);
}

.article-squares {
  overflow: hidden;
  background: #000;
  width: 100%;
  margin: 0 auto;
  position: relative;
  border-radius: 15px;
  z-index: 1;
}

.info {
  bottom: 40px;
  left: 40px;
}

.post-squares.nextprev {
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
  border-radius: 15px;
  background: #000;
  margin: 30px 0;
}

.post-squares.nextprev a {
  flex: 1;
  min-height: 100px;
  padding: 25px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  overflow: hidden;
  transition: opacity 0.3s;
}

/* 只有一个子项时占满宽度 */
.post-squares.nextprev a:only-child {
  width: 100%;
}

.post-squares.nextprev .background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.5;
  transition: opacity 0.3s;
  z-index: 0;
}

.post-squares.nextprev a:hover .background {
  opacity: 0.7;
}

.post-squares.nextprev .label,
.post-squares.nextprev .info {
  position: relative;
  z-index: 1;
  color: #fff;
}

.post-squares.nextprev .label {
  font-size: 13px;
  text-transform: uppercase;
  opacity: 0.8;
}

.post-squares.nextprev .info {
  margin-top: auto;
}

.post-squares.nextprev h3 {
  font-size: 17px;
  font-weight: 400;
  line-height: 1.4;
  margin: 10px 0 0;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 左对齐（上一篇文章） */
.post-squares.nextprev a[rel="prev"] {
  align-items: flex-start;
  text-align: left;
}
.post-squares.nextprev a[rel="prev"] .label,
.post-squares.nextprev a[rel="prev"] .info {
  align-self: flex-start;
}

/* 右对齐（下一篇文章） */
.post-squares.nextprev a[rel="next"] {
  align-items: flex-end;
  text-align: right;
}
.post-squares.nextprev a[rel="next"] .label,
.post-squares.nextprev a[rel="next"] .info {
  align-self: flex-end;
}
</style>
