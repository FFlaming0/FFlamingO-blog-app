export interface Category {
  id: number
  name: string // 分类名称
  slug: string // URL 友好标识
  image?: string // 特色图片
  articleCount: number // 关联文章数量
  sortOrder: number // 排序权重
}
