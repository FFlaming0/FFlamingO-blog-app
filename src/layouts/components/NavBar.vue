<script setup lang="ts">
// import Search from '@/components/search/SearchBlock.vue'
import NightStyleButton from './NightStyleButton.vue'
import DrawerMenu from './DrawerMenu.vue'
import RoundAvatar from '@/components/avatar/RoundAvatar.vue'
import GlassBox from '@/components/box/GlassBox.vue'
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDarkMode } from '@/composables/layouts/useDarkMode.ts'
import { useWindowScroll } from '@vueuse/core'
import { useFrontendConfigStore } from '@/stores/frontendConfig'

const { siteInfo, navItems } = storeToRefs(useFrontendConfigStore())

const { toggleDark } = useDarkMode()

// 获取滚动 Y 轴偏移
const { y } = useWindowScroll()
// 滚动超过 10px 时认为已滚动
const isScrolled = computed(() => y.value > 10)
// 悬停状态
const isHovered = ref(false)

// 根据滚动和悬停组合计算毛玻璃样式
const glassProps = computed(() => {
  const scrolled = isScrolled.value
  const hovered = isHovered.value
  const active = scrolled || hovered

  return {
    padding: '10px 30px',
    margin: scrolled ? '0' : '10px 40px 0',
    maxWidth: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    radius: scrolled ? '0' : '128px',
    bg: active ? 'var(--bg-primary)' : 'transparent',
    opacity: active ? 0.8 : 1,
    blur: active ? '16px' : '0px',
    borderWidth: active ? '1px' : '0px',
    borderColor: active ? 'var(--bg-primary)' : 'transparent',
    boxShadow: scrolled
      ? '0 2px 12px rgba(0,0,0,0.15)'
      : hovered
        ? '0 2px 8px rgba(0,0,0,0.08)'
        : 'none',
  }
})
</script>

<template>
  <GlassBox
    v-if="siteInfo && navItems"
    class="navbar"
    :class="{ scrolled: isScrolled }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    v-bind="glassProps"
  >
    <a href="/" class="logo">{{ siteInfo.logo }}</a>
    <nav class="menu-item">
      <template v-for="item in navItems" :key="item.name">
        <!-- 有 secItem → 渲染下拉菜单 -->
        <DrawerMenu v-if="item.secItem" :items="item.secItem">
          <template #down>
            <a class="nav-link"><i :class="item.icon"></i>{{ item.name }}</a>
          </template>
        </DrawerMenu>
        <!-- 无 children → 普通链接 -->
        <a v-else :href="item.link || '/'" class="nav-link">
          <i :class="item.icon"></i>{{ item.name }}
        </a>
      </template>
    </nav>
    <div class="tool-box">
      <a><i class="fa-solid fa-magnifying-glass"></i></a>
      <a><i class="fa-solid fa-dice"></i></a>
      <!-- <Search v-model="search.keyword" /> -->
      <NightStyleButton @click="toggleDark" />
      <RoundAvatar :diameter="35" />
    </div>
  </GlassBox>
</template>

<style scoped>
/* 基础样式：粘性定位，默认半透明背景，圆角，左右留边 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary);
  text-decoration: none;
  padding: 5px 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  align-self: stretch; /* 覆盖父容器的 align-items: center，使自身高度填满父容器内容区 */
}

/* 每个导航链接 */
.nav-link {
  display: flex; /* 变成块级弹性容器，用于内部居中 */
  align-items: center; /* 文字和图标垂直居中 */
  justify-content: center; /* 文字和图标水平居中（可选） */
  padding: 10px 0; /* 移除原有的上下内边距，由 flex 居中 */
  margin: 0 14px;
  height: 100%; /* 拉伸至父容器高度 */
  text-decoration: none;
  color: var(--text-primary);
  font-size: 18px;
  position: relative; /* 伪元素定位参考 */
}

/* 链接悬停变色 */
.nav-link:hover {
  color: var(--primary);
}

/* 下划线伪元素 */
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 0;
  height: 4px;
  border-radius: 10px;
  background: var(--primary);
  transition: width 0.3s ease;
}

/* 悬停时下划线从左侧展开 */
.nav-link:hover::after {
  width: 100%;
}

/* 右上角工具栏 */
.tool-box {
  display: flex;
  align-items: center;
  gap: 10px; /* 工具间距 */
}
</style>
