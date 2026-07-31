<script setup lang="ts">
const prop = defineProps<{
  subTitle: string
}>()
</script>

<template>
  <div class="title-box">
    <p class="title-box-text">{{ prop.subTitle }}</p>
  </div>
</template>

<style scoped>
.title-box {
  background: var(--bg-homepage-box);
  opacity: 0.8;
  border: 1px solid var(--bg-primary);
  border-radius: 12px; /* 圆角 */
  padding: 15px; /* 内边距 */
  margin: 22px, 120.5px, 0px;
  max-width: 80%; /* 响应式限制 */
  backdrop-filter: blur(16px); /* 毛玻璃效果 */
  transition: all 0.3s ease;
}

.title-box-text {
  font-size: 20px;
  font-family: BlogFont, sans-serif;
  font-weight: 600;
  color: var(--primary);
  text-align: center;
  margin: 0;
  line-height: 1.6;
  letter-spacing: 2px;
}

.title-box-text:hover {
  color: var(--secondary);
}
</style>
