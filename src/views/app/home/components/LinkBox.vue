<script setup lang="ts">
import type { SocialLink } from '@/api/system/config/types'

const props = defineProps<{
  items: SocialLink[]
}>()
</script>

<template>
  <div class="link-box">
    <!-- 外层加一个包裹层，用于控制图片的绝对定位 -->
    <div v-for="(item, idx) in items" :key="idx" class="link-item-wrapper">
      <a
        :href="item.url || undefined"
        :target="item.url ? '_blank' : undefined"
        :rel="item.url ? 'noopener noreferrer' : undefined"
      >
        <i :class="item.icon"></i>
      </a>

      <!-- 图片展开方框 -->
      <div v-if="item.pic" class="picture-box">
        <img :src="item.pic" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.link-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.link-box a {
  display: flex;
  justify-content: center;
  align-items: center;

  /* 设置为正圆形 */
  width: 30px;
  height: 27px;
  border-radius: 50%;

  /* 白色圆环边框 */
  background: var(--bg-homepage-box);
  opacity: 0.8;
  border: 1px solid var(--bg-primary);
  backdrop-filter: blur(4px);

  color: var(--primary);
  font-size: 24px;
  text-decoration: none;

  transition: all 0.3s ease;
  padding: 8px 8px; /* 内边距 */
  backdrop-filter: blur(16px); /* 毛玻璃效果 */
  transition: all 0.3s ease;
}

.link-box a:hover {
  color: var(--secondary);
}

.link-item-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.picture-box {
  /* 绝对定位在父元素正下方 */
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(-12px); /* 初始稍微向上收拢 */

  /* 初始状态不可见、不可点击 */
  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  /* 方框质感：毛玻璃背景、阴影、白边框 */
  background: var(--bg-homepage-box);
  backdrop-filter: blur(16px);
  border: 1px solid var(--bg-primary);
  border-radius: 8px;
  padding: 4px;

  /* 限制图片大小，防止大图撑爆 */
  width: 100px;
  height: auto;
  z-index: 10;

  /* 平滑的展开动画 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.picture-box img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 保证图片填满方框且不变形 */
  border-radius: 4px;
  display: block;
}

/* 4. 触发动画：鼠标悬停在包裹层上时展开 */
.link-item-wrapper:hover .picture-box {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0px); /* 回到原位，完成“向下展开”视觉效果 */
  pointer-events: auto;
}
</style>
