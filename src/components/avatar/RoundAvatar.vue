<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBloggerStore } from '@/stores/blogger'
import type { RoundAvatar } from './types/avatar'

// import pic from '@/assets/images/avatar.jpg'

const props = defineProps<{
  diameter: number
}>()

const bloggerStore = useBloggerStore()
const { blogger } = storeToRefs(bloggerStore)

const avatar = computed<RoundAvatar>(() => ({
  diameter: props.diameter,
  src: blogger.value?.avatar ?? '',
  alt: blogger.value?.nickname,
}))

/** 图片加载是否出错 */
const hasError = ref(false)

/**
 * 图片加载错误处理
 */
const handleImageError = () => {
  hasError.value = true
}
const handleImageLoad = () => {
  hasError.value = false
}
</script>

<template>
  <div
    class="circle-image"
    :style="{
      width: avatar.diameter + 'px',
      height: avatar.diameter + 'px',
    }"
  >
    <img
      :src="avatar.src"
      :alt="avatar.alt"
      class="circle-image__img"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    <!-- 加载失败时的占位 -->
    <div v-if="hasError" class="circle-image__fallback">
      <span>{{ avatar.alt }}</span>
    </div>
  </div>
</template>

<style scoped>
.circle-image {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
}

.circle-image__img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

/* 图片加载失败时的占位样式 */
.circle-image__fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #ccc;
  font-size: 10px;
  border-radius: 50%;
}
</style>
