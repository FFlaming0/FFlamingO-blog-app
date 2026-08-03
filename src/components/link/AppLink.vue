<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

export interface AppLinkProps {
  /** 链接地址，支持内部路径（如 '/about'）或完整 URL（如 'https://...'） */
  to?: RouteLocationRaw
  /** 是否使用 custom 模式（RouterLink 的 custom 属性），默认 false */
  custom?: boolean
  /** 自定义 target，仅对外部链接有效，默认根据链接类型自动设置 */
  target?: string
  /** 自定义 rel，仅对外部链接有效，默认 'noopener noreferrer' */
  rel?: string
  /** 强制指定为内部链接（跳过自动检测），默认 false */
  forceInternal?: boolean
  /** 强制指定为外部链接（跳过自动检测），默认 false */
  forceExternal?: boolean
}

const props = withDefaults(defineProps<AppLinkProps>(), {
  to: '',
  custom: false,
  target: undefined,
  rel: 'noopener noreferrer',
  forceInternal: false,
  forceExternal: false,
})

const hasLink = computed(() => {
  if (!props.to) return false
  if (typeof props.to === 'string') return props.to.trim() !== ''
  return true // 对象形式视为有效
})

// 判断是否为内部链接
const isInternal = computed(() => {
  if (props.forceInternal) return true
  if (props.forceExternal) return false
  if (!hasLink.value) return true
  // 仅当 to 是字符串且以 http 开头时视为外部链接
  if (typeof props.to === 'string') {
    return !/^https?:\/\//i.test(props.to)
  }
  // 对象形式一律视为内部链接
  return true
})

// 自动设置 target：外部链接默认 _blank，内部链接默认 undefined

const target = computed(() => {
  if (props.target) return props.target
  if (!hasLink.value || isInternal.value) return undefined
  return '_blank'
})

// 自动设置 rel：外部链接默认 noopener noreferrer，内部链接默认 undefined
const rel = computed(() => {
  if (props.rel) return props.rel
  if (!hasLink.value || isInternal.value) return undefined
  return 'noopener noreferrer'
})
</script>

<template>
  <div v-if="!hasLink" v-bind="$attrs" class="app-link">
    <slot></slot>
  </div>

  <!-- 内部链接：使用 RouterLink -->
  <RouterLink v-else-if="isInternal" :to="to" :custom="custom" v-bind="$attrs" class="app-link">
    <slot></slot>
  </RouterLink>

  <!-- 外部链接：使用 a 标签 -->
  <a v-else :href="to as string" :target="target" :rel="rel" v-bind="$attrs" class="app-link">
    <slot></slot>
  </a>
</template>

<style scoped>
/* 统一重置所有样式：无下划线，继承颜色 */
.app-link {
  color: inherit;
  text-decoration: none;
  background: transparent;
  cursor: pointer;
}
</style>
