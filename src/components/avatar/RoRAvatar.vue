<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBloggerStore } from '@/stores/blogger'
import type { RoRAvatar } from './types/avatar'

const bloggerStore = useBloggerStore()
const { blogger } = storeToRefs(bloggerStore)

const props = withDefaults(
  defineProps<{
  diameter: number,
  speed?: number,
}>(),
  {
    speed: 10,
  }
)

const avatar = computed<RoRAvatar>(() => ({
  diameter: props.diameter,
  src: blogger.value?.avatar ?? '',
  alt: blogger.value?.nickname,
  speed: props.speed,
}))

/** 图片加载是否出错 */
const hasError = ref(false)

const handleImageError = () => {
  hasError.value = true
}
const handleImageLoad = () => {
  hasError.value = false
}

const containerStyle = computed(() => ({
  width: props.diameter + 'px',
  height: props.diameter + 'px',
}))

const animationStyle = computed(() => ({
  animationDuration: props.speed + 's',
}))
</script>

<template>
  <div class="ror-avatar" :style="containerStyle">
    <img
      v-if="!hasError"
      :src="avatar.src"
      :alt="avatar.alt || 'avatar'"
      class="ror-avatar__img"
      :style="animationStyle"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    <div v-else class="ror-avatar__fallback">
      <span>{{ avatar.alt || '?' }}</span>
    </div>
  </div>
</template>

<style scoped>
.ror-avatar {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
}

.ror-avatar__img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  animation: spin infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.ror-avatar__fallback {
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