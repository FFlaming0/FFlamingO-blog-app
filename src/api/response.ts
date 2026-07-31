// 分页响应结构（列表数据使用）
interface PageResponse<T> {
  list: T[] // 当前页数据列表
  total: number // 总记录数
  page: number // 当前页码
  size: number // 每页大小
}

export type { PageResponse }
