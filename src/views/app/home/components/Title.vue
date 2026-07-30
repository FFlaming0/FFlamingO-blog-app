<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const title = '朱羽凌霞，灼华沐川'
const isJittering = ref(false)
// 抖动偏移量
const dx = ref(0)
const dy = ref(0)
let animationId: number | null = null

// 每帧更新偏移量
function updateJitter() {
  if (!isJittering.value) return
  const maxX = 5 // 水平抖动幅度
  const maxY = 3 // 垂直抖动幅度
  let x = Math.random() * maxX
  let y = Math.random() * maxY
  if (Math.random() < 0.5) x = -x
  if (Math.random() < 0.5) y = -y
  dx.value = x
  dy.value = y
  animationId = requestAnimationFrame(updateJitter)
}

function startJitter() {
  if (!isJittering.value) {
    isJittering.value = true
    updateJitter()
  }
}

function stopJitter() {
  isJittering.value = false
  // 重置偏移量（可选，让文字瞬间归位）
  dx.value = 0
  dy.value = 0
}

onMounted(() => {
  updateJitter()
})

// 组件卸载时停止抖动，避免内存泄漏
onBeforeUnmount(() => {
  isJittering.value = false
})
</script>

<template>
  <div class="title-wrapper" @mouseenter="startJitter" @mouseleave="stopJitter">
    <!-- 主标题 -->
    <h1 class="title main" role="heading" tabindex="0">{{ title }}</h1>
    <!-- 抖动层 -->
    <h1
      class="title jitter"
      aria-hidden="true"
      :style="{ transform: `translate(${dx}px, ${dy}px)` }"
      v-if="isJittering"
    >
      {{ title }}
    </h1>
  </div>
</template>

<style scoped>
.title-wrapper {
  /* 使用 Grid 让两个标题重叠在同一位置 */
  display: grid;
  place-items: center;
}

.title {
  /* 设计稿样式 */
  font-size: 72px;
  font-family: BlogFont, sans-serif;
  font-weight: 100;
  color: #ffffff;
  padding: 0 66px; /* 左右内边距 */
  margin: 0; /* 重置默认外边距 */
  text-align: center;
  /* 可选：添加文本阴影提高可读性 */
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  /* 限制最大宽度，避免过长文本溢出 */
  max-width: 100%;
  word-break: break-word;
  /* 两个标题重叠在同一 grid 单元格 */
  grid-column: 1;
  grid-row: 1;
}

.main {
  color: #ffffff;
  z-index: 2; /* 白色层在上 */
  position: relative; /* 使 z-index 生效 */
}

.jitter {
  color: var(--primary); /* 抖动层 */
  z-index: 1; /* 位于主标题下方 */
  /* 动态偏移通过内联 style 中的 transform 实现 */
  will-change: transform; /* 优化性能 */
}
</style>
