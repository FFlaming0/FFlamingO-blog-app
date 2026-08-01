<script setup lang="ts">
import GlassBox from '@/components/box/GlassBox.vue'
import { reactive } from 'vue'

import { getDropDownAnimeStyles } from '@/composables/animation/useDropDown'
import type { SocialLink } from '@/api/system/config/types'

const props = defineProps<{
  items: SocialLink[]
}>()

const hoverStates = reactive<boolean[]>(Array(props.items.length).fill(false))

// 根据索引和悬停状态计算 GlassBox 的视觉 props
const getItemGlassProps = (idx: number) => {
  const hovered = hoverStates[idx]
  return {
    // 保持尺寸布局不变
    width: 30,
    height: 27,
    padding: '8px 8px',
    radius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // 动态视觉样式
    bg: hovered ? 'var(--bg-hover)' : 'var(--bg-homepage-box)',
    opacity: hovered ? 1 : 0.8,
    blur: hovered ? '0px' : '16px',
    borderWidth: hovered ? '1px' : '1px', // 保持边框
    borderColor: hovered ? 'var(--bg-primary)' : 'var(--bg-primary)',
    boxShadow: hovered ? '0 0 10px 4px var(--bg-primary)' : 'none',
  }
}

// 配置下拉动画参数
const getDropDownConfig = (idx: number) => {
  const hovered = !!hoverStates[idx] // 确保是 boolean
  return getDropDownAnimeStyles(hovered, {
    enterTransform: 'translateX(-50%) scaleY(1)',
    exitTransform: 'translateX(-50%) scaleY(0)',
    transformOrigin: 'top center',
    duration: '0.3s',
  })
}
</script>

<template>
  <div class="link-box">
    <!-- 外层加一个包裹层，用于控制图片的绝对定位 -->
    <div
      v-for="(item, idx) in items"
      :key="idx"
      class="link-item-wrapper"
      @mouseenter="hoverStates[idx] = true"
      @mouseleave="hoverStates[idx] = false"
    >
      <!-- 链接按钮 -->
      <GlassBox
        v-bind="getItemGlassProps(idx)"
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
        :style="getDropDownConfig(idx)"
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
  z-index: 10;
  /* transform: translateX(-50%) translateY(-12px) scaleY(0); 初始稍微向上收拢 */

  /* 初始状态不可见、不可点击 */
  /* transform-origin: top center;
  opacity: 0;
  visibility: hidden;
  pointer-events: none; */
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
  pointer-events: auto;
}
</style>
