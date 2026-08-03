/** 站点配置 */
interface SiteInfo {
  // 标签页配置
  siteTitle: string // 标签页名称
  siteIcon: string // 标签页 icon URL
  // 主页配置
  logo: string // Logo（图片URL 或 文字）
  backgroundImage: string
  mainTitle: string // 主页中心标题
  subTitle: string // 副标题
  avatar: string // 个人头像 URL
}

/** 导航项（支持嵌套） */
interface NavItem {
  name: string // 显示名称
  icon: string
  link?: string // 跳转路径
  secItem?: NavItem[] // 二级嵌套
}

/** 社交链接 */
interface SocialLink {
  icon: string // 图标类名 (FontAwesome/Remix)
  url?: string // 跳转链接
  pic?: string // 悬停提示
}

/** 页脚信息 */
interface FooterInfo {
  copyright: string
  icp: string
  police: string
}

interface Seo {
  seoTitle: string
  seoDescription: string
  ogImage: string // Open Graph 默认图
}

/** 展示栏（Display） */
interface DisplayItem {
  id: number
  title: string
  description: string
  image: string // 封面图 URL
  link: string // 点击跳转链接
  enabled: boolean
}

interface DisplayInfo {
  icon?: string
  label: string
  value: string
}

/** 前台全量配置 */
interface FrontendConfig {
  siteInfo: SiteInfo
  nav: NavItem[]
  footerInfo: FooterInfo
  // 社交与展示
  socialLinks: SocialLink[]
  displays: DisplayItem[]
  displayInfo: DisplayInfo[]
  // SEO 全局
  seo: Seo
}

export type {
  SiteInfo,
  NavItem,
  SocialLink,
  FooterInfo,
  Seo,
  DisplayItem,
  DisplayInfo,
  FrontendConfig,
}
