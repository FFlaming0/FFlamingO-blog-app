<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import Title from './Title.vue'
import SubTitle from './SubTitle.vue'
import LinkBox from './LinkBox.vue'
import { useFrontendConfigStore } from '@/stores/frontendConfig'

const config = useFrontendConfigStore()
const { siteInfo, socialLinks } = storeToRefs(config)

// import bg from '/images/homepage/END8-1_7.png'

// const bgImageUrl = ref(new URL(bg, import.meta.url).href)
// const changeBackground = (newUrl: string) => {
//   bgImageUrl.value = newUrl
// }
</script>

<template>
  <div
    class="container"
    v-if="siteInfo"
    :style="{ backgroundImage: `url(${siteInfo.backgroundImage})` }"
  >
    <Title :title="siteInfo.mainTitle" />
    <SubTitle :sub-title="siteInfo.subTitle" />
    <LinkBox v-if="socialLinks" :items="socialLinks" />
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
