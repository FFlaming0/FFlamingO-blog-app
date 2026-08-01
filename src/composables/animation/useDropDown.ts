import type { CSSProperties } from 'vue'

export interface ExpandConfig {
  /** 展开时的 transform 值，默认 'scaleY(1)' */
  enterTransform?: string
  /** 收起时的 transform 值，默认 'scaleY(0)' */
  exitTransform?: string
  /** 展开时的透明度，默认 1 */
  enterOpacity?: number
  /** 收起时的透明度，默认 0 */
  exitOpacity?: number
  /** transform-origin，默认 'top center' */
  transformOrigin?: string
  /** 过渡持续时间，默认 '0.3s' */
  duration?: string
  /** 过渡延迟，默认 '0s' */
  delay?: string
  /** 展开时是否可见（控制 visibility），默认 true */
  visibleOnEnter?: boolean
}

/**
 * 获取下拉/展开动画的样式对象
 * @param isOpen - 是否展开
 * @param config - 动画配置（可选）
 * @returns CSSProperties 样式对象
 */
export function getDropDownAnimeStyles(isOpen: boolean, config: ExpandConfig = {}): CSSProperties {
  const {
    enterTransform = 'scaleY(1)',
    exitTransform = 'scaleY(0)',
    enterOpacity = 1,
    exitOpacity = 0,
    transformOrigin = 'top center',
    duration = '0.3s',
    delay = '0s',
    visibleOnEnter = true,
  } = config

  return {
    transform: isOpen ? enterTransform : exitTransform,
    opacity: isOpen ? enterOpacity : exitOpacity,
    transformOrigin,
    transition: `opacity ${duration} ease, transform ${duration} ease, visibility ${duration} ease`,
    visibility: isOpen && visibleOnEnter ? 'visible' : 'hidden',
    pointerEvents: isOpen ? 'auto' : 'none',
  }
}
