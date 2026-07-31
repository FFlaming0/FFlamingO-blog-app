export interface StatsOverview {
  runDays: number // 博客运行天数
  articleCount: number // 文章总数
  totalViews: number // 全站总访问量（PV）
  totalComments: number // 评论总数
  lastLoginTime?: string // 博主上次在线时间
}
