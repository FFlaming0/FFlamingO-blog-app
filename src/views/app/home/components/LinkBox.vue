<script setup lang="ts">
import GlassBox from '@/components/box/GlassBox.vue'
import type { SocialLink } from '@/api/system/config/types'

const props = defineProps<{
  items: SocialLink[]
}>()
</script>

<template>
  <div class="link-box">
    <!-- 外层加一个包裹层，用于控制图片的绝对定位 -->
    <div v-for="(item, idx) in items" :key="idx" class="link-item-wrapper">
      <!-- 链接按钮 -->
      <GlassBox
        class="link-box-item"
        :width="30"
        :height="27"
        padding="8px 8px"
        radius="50%"
        display="flex"
        align-items="center"
        justify-content="center"
      >
        <a
          :href="item.url || undefined"
          :target="item.url ? '_blank' : undefined"
          :rel="item.url ? 'noopener noreferrer' : undefined"
          class="link-box-item-text"
        >
          <i :class="item.icon"></i>
        </a>
      </GlassBox>

      <!-- 图片展开方框 -->
      <GlassBox
        v-if="item.pic"
        class="picture-box"
        :width="100"
        height="auto"
        padding="4px"
        radius="8px"
        display="block"
      >
        <img class="picture" :src="item.pic" />
      </GlassBox>
      <!-- <div v-if="item.pic" class="picture-box">
        <img :src="item.pic" />
      </div> -->
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

.link-box-item:hover {
  background: var(--bg-hover);
  opacity: 1;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;

  /* ③ 添加白色半透明外发光阴影 */
  box-shadow: 0 0 10px 4px var(--bg-primary);
}

.link-box-item-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--primary);
  font-size: 24px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link-box-item-text:hover {
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

  z-index: 10;

  /* 平滑的展开动画 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.picture {
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
