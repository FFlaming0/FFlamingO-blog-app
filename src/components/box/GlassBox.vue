<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

// 仅保留布局和尺寸相关的 props
const props = withDefaults(
  defineProps<{
    /** 宽度（支持数字 px 或字符串） */
    width?: string | number
    /** 高度（支持数字 px 或字符串） */
    height?: string | number
    /** 内边距（支持数字 px 或字符串） */
    padding?: string | number
    /** 外边距（支持数字 px 或字符串） */
    margin?: string | number
    /** 最大宽度（支持数字 px 或字符串） */
    maxWidth?: string | number
    /** CSS display 值，默认 block */
    display?: string
    /** flex 方向，默认 row */
    flexDirection?: string
    /** flex 对齐方式（align-items），默认 stretch */
    alignItems?: string
    /** flex 主轴对齐（justify-content），默认 flex-start */
    justifyContent?: string
    /** gap 间距，默认 0 */
    gap?: string | number
    /** flex-wrap，默认 nowrap */
    flexWrap?: string
    /** 是否圆形（强制 border-radius: 50%），默认 false */
    circle?: boolean
    /** 圆角大小（非圆形时），默认使用 CSS 变量 --glass-radius 或 12px */
    radius?: string
    /** 背景色（支持 CSS 变量） */
    bg?: string
    /** 透明度 */
    opacity?: number
    /** 模糊半径 */
    blur?: string
    /** 边框宽度 */
    borderWidth?: string
    /** 边框颜色（支持 CSS 变量） */
    borderColor?: string
    /** 阴影 */
    boxShadow?: string
    /** 是否启用毛玻璃效果（快速开关） */
    enableGlass?: boolean
    /** 自定义 backdrop-filter 值（若提供，则覆盖 blur 生成的默认值） */
    backdropFilter?: string
  }>(),
  {
    width: 'auto',
    height: 'auto',
    padding: '15px',
    margin: '0',
    maxWidth: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0',
    flexWrap: 'nowrap',
    circle: false,
    radius: '12px',
    // 默认值与原来完全一致
    bg: 'var(--bg-homepage-box)',
    opacity: 0.8,
    blur: '16px',
    borderWidth: '1px',
    borderColor: 'var(--bg-primary)',
    boxShadow: 'none',
    enableGlass: true,
    backdropFilter: undefined,
  },
)

// 计算样式
const boxStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    padding: typeof props.padding === 'number' ? `${props.padding}px` : props.padding,
    margin: typeof props.margin === 'number' ? `${props.margin}px` : props.margin,
    maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth,
    display: props.display,
    flexDirection: props.flexDirection as CSSProperties['flexDirection'],
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    gap: typeof props.gap === 'number' ? `${props.gap}px` : props.gap,
    flexWrap: props.flexWrap as CSSProperties['flexWrap'],
    borderRadius: props.circle ? '50%' : props.radius,
    background: props.enableGlass ? props.bg : 'transparent',
    opacity: props.enableGlass ? props.opacity : 1,
    // 优先使用自定义 backdropFilter，否则使用 blur
    backdropFilter: props.enableGlass ? props.backdropFilter || `blur(${props.blur})` : 'none',
    WebkitBackdropFilter: props.enableGlass
      ? props.backdropFilter || `blur(${props.blur})`
      : 'none',
    border: props.enableGlass ? `${props.borderWidth} solid ${props.borderColor}` : 'none',
    boxShadow: props.enableGlass ? props.boxShadow : 'none',
  }
  return style
})
</script>

<template>
  <div class="glass-box" :style="boxStyle">
    <slot></slot>
  </div>
</template>

<style scoped>
/* 毛玻璃视觉样式统一在此，使用 CSS 变量以便全局主题 */
.glass-box {
  /* 默认圆角（会被 props 覆盖） */
  border-radius: 12px;

  /* box-sizing: border-box; */

  /* 过渡动画 */
  transition: 0.3s all ease;

  /* 保证内部内容不受干扰 */
  position: relative;
}
</style>
