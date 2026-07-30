<script setup lang="ts">
// import Search from '@/components/search/SearchBlock.vue'
import NightStyleButton from './NightStyleButton.vue'
import DrawerMenu from './DrawerMenu.vue'
import RoundAvatar from '@/components/avatar/RoundAvatar.vue'
import { ref, computed } from 'vue'
import { useSearchStore } from '@/stores/search'
import { useDarkMode } from '@/composables/layouts/useDarkMode.ts'
import { useWindowScroll } from '@vueuse/core'

import type { DrawerItem, DrawerItemList } from '@/types/layouts/drawerItem.ts'

const { isDark, toggleDark } = useDarkMode()
const search = useSearchStore()

const wanxiang: DrawerItemList = [
  { label: '硅基漫游', to: '/', icon: 'fa-solid fa-terminal' },
  { label: '观灼留影', to: '/', icon: 'fa-solid fa-comment-dots' },
  { label: '墨烬成珠', to: '/', icon: 'fa-solid fa-feather' },
  { label: '幻暮绘梦', to: '/', icon: 'fa-solid fa-film' },
  { label: '流音叙世', to: '/', icon: 'fa-solid fa-headphones' },
  { label: '栖川拾芥', to: '/', icon: 'fa-solid fa-bed-pulse' },
]
const about: DrawerItemList = [
  { label: '关于本站', to: '/', icon: 'fa-solid fa-circle-info' },
  { label: '关于作者', to: '/', icon: 'fa-solid fa-user' },
  { label: '友情链接', to: '/', icon: 'fa-solid fa-link' },
  { label: 'Steam', to: '/', icon: 'fa-brands fa-steam' },
]

// 获取滚动 Y 轴偏移
const { y } = useWindowScroll()
// 滚动超过 10px 时认为已滚动
const isScrolled = computed(() => y.value > 10)
</script>

<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <a href="/" class="logo">汀上焰影</a>
    <nav class="menu-item">
      <a href="/" class="nav-link"><i class="fa-solid fa-house"></i>首页</a>
      <a href="/" class="nav-link"><i class="fa-solid fa-box-archive"></i>你好，时光</a>
      <!-- <a class="nav-link"><i class="fa-solid fa-ellipsis"></i>万象</a> -->
      <DrawerMenu :items="wanxiang">
        <template #down>
          <a class="nav-link"><i class="fa-solid fa-ellipsis"></i>万象</a>
        </template>
      </DrawerMenu>
      <a href="/" class="nav-link"><i class="fa-solid fa-table-columns"></i>专栏</a>
      <!-- <a class="nav-link"><i class="fa-solid fa-address-card"></i>关于</a> -->
      <DrawerMenu :items="about">
        <template #down>
          <a class="nav-link"><i class="fa-solid fa-address-card"></i>关于</a>
        </template>
      </DrawerMenu>
    </nav>
    <div class="tool-box">
      <a><i class="fa-solid fa-magnifying-glass"></i></a>
      <a><i class="fa-solid fa-dice"></i></a>
      <!-- <Search v-model="search.keyword" /> -->
      <NightStyleButton @click="toggleDark" />
      <RoundAvatar :diameter="35" />
    </div>
  </header>
</template>

<style scoped>
/* 基础样式：粘性定位，默认半透明背景，圆角，左右留边 */
.navbar {
  /* text-align: center; */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  /* 默认顶端透明状态 */
  margin: 10px 40px 0; /* 保留边距，透明不影响视觉 */
  border-radius: 128px; /* 保留圆角，透明时看不到 */
  background: transparent; /* 全透明 */
  backdrop-filter: none; /* 去除毛玻璃 */
  box-shadow: none; /* 无阴影 */
  transition: all 0.3s ease; /* 平滑切换 */
}

/* 顶端悬停 → 恢复“当前样式”（半透明毛玻璃+圆角+边距） */
.navbar:not(.scrolled):hover {
  background: var(--bg-primary);
  backdrop-filter: blur(40px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  /* margin 和 border-radius 沿用默认值，无需覆盖 */
}

/* 滚动后 → 全宽无圆角，背景与悬停时一致（半透明毛玻璃） */
.navbar.scrolled {
  margin: 0; /* 去掉边距，占满宽度 */
  border-radius: 0; /* 无圆角 */
  background: var(--bg-primary); /* 与悬停时背景相同 */
  backdrop-filter: blur(16px); /* 毛玻璃 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15); /* 加深阴影 */
  padding: 10px 30px; /* 可调整内边距，保持舒适 */
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

.menu-item a {
  margin: 0 14px;
  padding: 10px 0;
  text-decoration: none;
  color: var(--text-primary);
  font-size: 18px;
}

.menu-item a:hover {
  color: var(--primary);
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
