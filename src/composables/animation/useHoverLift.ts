import { ref, computed, type CSSProperties } from 'vue'

export interface HoverLiftOptions {
  /** 上浮距离（支持任何 CSS 长度值，默认 -6px） */
  liftDistance?: string
  /** hover 时的阴影（默认 0 12px 32px rgba(0,0,0,0.15)） */
  shadow?: string
  /** hover 时的边框颜色（默认 var(--primary)） */
  borderColor?: string
  /** 过渡动画（默认 all 0.3s cubic-bezier(0.25, 1, 0.5, 1)） */
  transition?: string
}

export function useHoverLift(options: HoverLiftOptions = {}) {
  const {
    liftDistance = '-6px',
    shadow = '0 12px 32px rgba(0, 0, 0, 0.15)',
    borderColor = 'var(--primary)',
    transition = 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
  } = options

  const isHovered = ref(false)

  // 动态计算样式
  const style = computed<CSSProperties>(() => {
    const base: CSSProperties = {
      transition,
      // 默认样式（保持与未 hover 时一致，可以由外部父组件提供，这里不覆盖）
    }

    if (isHovered.value) {
      return {
        ...base,
        transform: `translateY(${liftDistance})`,
        boxShadow: shadow,
        borderColor: borderColor,
      }
    }

    // 非 hover 状态，清除 transform 和额外阴影，但保留 transition
    return {
      ...base,
      transform: 'translateY(0)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)', // 可调整默认阴影
      borderColor: 'var(--border-color)',
    }
  })

  const onMouseEnter = () => {
    isHovered.value = true
  }
  const onMouseLeave = () => {
    isHovered.value = false
  }

  return {
    isHovered, // 如果需要外部监听 hover 状态
    style, // 直接绑定到元素 :style
    onMouseEnter,
    onMouseLeave,
  }
}
