<script setup lang="ts">
import { ref } from 'vue'
import GlassBox from '@/components/box/GlassBox.vue'
import { getDropDownAnimeStyles } from '@/composables/animation/useDropDown'
import type { NavItem } from '@/api/system/config/types'

defineProps<{
  items: NavItem[]
}>()

// 控制下拉菜单展开状态
const isOpen = ref(false)
</script>

<template>
  <div class="dropdown-wrapper" @mouseenter="isOpen = true" @mouseleave="isOpen = false">
    <!-- 触发元素（支持自定义插槽） -->
    <slot name="down"> </slot>

    <!-- 下拉菜单 -->
    <GlassBox
      class="dropdown-menu"
      :style="getDropDownAnimeStyles(isOpen)"
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
  min-width: 100px;
  z-index: 100;
}

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
