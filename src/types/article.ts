export interface Article {
  id: number // 文章 ID，数字类型
  title: string // 文章标题，字符串类型
  summary: string // 文章摘要
  date: string // 发布日期
  category: string // 分类标签
  cover: string // 封面图片
}

export type ArticleList = Article[]
