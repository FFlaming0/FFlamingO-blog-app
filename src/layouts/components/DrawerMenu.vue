<script setup lang="ts">
<<<<<<< Updated upstream
=======
import { ref } from 'vue'
import GlassBox from '@/components/box/GlassBox.vue'
import { getDropDownAnimeStyles } from '@/composables/animation/useDropDown'
>>>>>>> Stashed changes
import type { NavItem } from '@/api/system/config/types'

defineProps<{
  items: NavItem[]
}>()
</script>

<template>
  <div class="dropdown-wrapper">
    <!-- 触发元素（支持自定义插槽） -->
    <slot name="down"> </slot>

    <!-- 下拉菜单 -->
<<<<<<< Updated upstream
    <div class="dropdown-menu">
=======
    <GlassBox
      class="dropdown-menu"
      :style="
        getDropDownAnimeStyles(isOpen, {
          enterTransform: 'translateX(-50%) scaleY(1)',
          exitTransform: 'translateX(-50%) scaleY(0)',
          transformOrigin: 'top center',
          duration: '0.3s',
        })"
      :padding="'8px 0'"
      :radius="'16px'"
      :bg="'var(--bg-primary)'"
      :blur="'16px'"
      :border-width="'0'"
      :box-shadow="'0 8px 24px rgba(0, 0, 0, 0.15)'"
      :enable-glass="true"
      display="block"
    >
      <a v-for="(item, idx) in items" :key="idx" :href="item.link || '/'" class="dropdown-item">
        <i v-if="item.icon" :class="item.icon"></i>
        {{ item.name }}
      </a>
    </GlassBox>
    <!-- <div
      class="dropdown-menu"
      :style="
        getDropDownAnimeStyles(isOpen, {
          enterTransform: 'translateX(-50%) scaleY(1)',
          exitTransform: 'translateX(-50%) scaleY(0)',
          transformOrigin: 'top center',
          duration: '0.3s',
        })
      "
    >
>>>>>>> Stashed changes
      <a v-for="(item, idx) in items" :key="idx" :href="item.link || '/'" class="dropdown-item">
        <i v-if="item.icon" :class="item.icon"></i>
        {{ item.name }}
      </a>
    </div> -->
  </div>
</template>

<style scoped>
.dropdown-wrapper {
  position: relative;
  display: flex; /* 改为 flex，便于内部对齐 */
  align-items: center; /* 垂直居中触发元素 */
  height: 100%; /* 继承父容器高度 */
}

.dropdown-menu {
  display: block;
  position: absolute;
  top: calc(100% + 10px); /* 与触发元素保持间距 */
  left: 50%;
  transform: translateX(-50%) scaleY(0);
  transform-origin: top center; /* 缩放动画的起点 */
  opacity: 0;
  visibility: hidden; /* 隐藏时不可交互 */
  min-width: 100px;
<<<<<<< Updated upstream
  background: var(--bg-primary);
  backdrop-filter: blur(8px); /* 毛玻璃效果 */
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
=======
>>>>>>> Stashed changes
  z-index: 100;
  transition:
    opacity 0.5s ease,
    transform 0.3s ease,
    visibility 0.3s ease;
}

<<<<<<< Updated upstream
/* 悬停时展开并渐显 */
.dropdown-wrapper:hover .dropdown-menu {
  transform: translateX(-50%) scaleY(1); /* 完全展开 */
  opacity: 1;
  visibility: visible;
}

=======
>>>>>>> Stashed changes
.dropdown-item {
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中（整体居中） */
  padding: 10px 10px;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 14px;
}

.dropdown-item:hover {
  color: var(--secondary);
}
</style>
