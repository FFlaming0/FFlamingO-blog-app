export interface RoundAvatar {
  /** 圆的直径（单位：px） */
  diameter: number
  /** 图片地址 */
  src: string
  /** 图片 alt 文本 */
  alt?: string
}

export interface RoRAvatar {
  /** 圆的直径（单位：px） */
  diameter: number
  /** 图片地址 */
  src: string
  /** 图片 alt 文本 */
  alt?: string
  /** 旋转一圈所需秒数，默认 10 秒 */
  speed: number
}