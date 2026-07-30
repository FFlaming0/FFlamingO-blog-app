<script setup lang="ts">
import { ref } from 'vue'

import Title from './Title.vue'
import SubTitle from './SubTitle.vue'
import LinkBox from './LinkBox.vue'

import type { LinkBoxList } from '@/types/app/home/link-box.ts'

import bg from '/images/homepage/END8-1_7.png'

const bgImageUrl = ref(new URL(bg, import.meta.url).href)

const changeBackground = (newUrl: string) => {
  bgImageUrl.value = newUrl
}

const linkBoxes = ref<LinkBoxList>([
  {
    icon: 'ri-qq-line',
    link: '',
    picture: bg,
  },
  {
    icon: 'ri-bilibili-line',
    link: 'https://space.bilibili.com/283057416',
    picture: '',
  },
  {
    icon: 'ri-netease-cloud-music-line',
  },
  {
    icon: 'ri-github-line',
  },
  {
    icon: 'ri-steam-line',
  },
  {
    icon: 'ri-twitter-line',
  },
  {
    icon: 'ri-mail-line',
  },
])
</script>

<template>
  <div class="container" :style="{ backgroundImage: `url(${bgImageUrl})` }">
    <Title />
    <SubTitle />
    <LinkBox :items="linkBoxes" />
  </div>
</template>

<style scoped>
.container {
  /* 控制背景图的显示方式 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* 确保容器有高度才能显示背景 */
  width: 100%;
  height: 100vh;

  /* 使用 Flex 让子元素居中 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px; /* 标题与方框间距 */
}
</style>
