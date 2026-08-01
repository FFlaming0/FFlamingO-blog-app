<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  pic?: string
}>()

// 图片加载状态
const imageError = ref(false)

// 图片加载失败处理（隐藏图片，容器高度变为300px）
const handleImageError = (e: Event) => {
  imageError.value = true
}
</script>

<template>
  <div class="header" :class="{ 'no-image': imageError }">
    <!-- 图片区域（仅当图片加载成功时显示） -->
    <img
      v-if="!imageError"
      :src="props.pic"
      alt="特色图片"
      class="feature-image"
      @error="handleImageError"
    />

    <!-- 插槽内容：覆盖在图片上方（或作为纯内容区） -->
    <div class="content">
      <div class="slot-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 容器：默认高度 400px，无图片时变为 300px */
.header {
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  /* background-color: transparent; 无背景，完全透明 */
  transition: height 0.3s ease;
}

.header.no-image {
  height: 300px;
}

/* 图片样式：填满容器，保持比例裁剪 */
.feature-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 插槽外层容器：绝对定位覆盖，不干扰点击事件 */
.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 让点击穿透，内部内容可交互 */
}

/* 插槽实际容器：占满父容器，且允许交互 */
.slot-container {
  width: 100%;
  height: 100%;
  pointer-events: auto;
  /* 无任何颜色、对齐、内边距等样式，完全由使用者决定 */
}
</style>
