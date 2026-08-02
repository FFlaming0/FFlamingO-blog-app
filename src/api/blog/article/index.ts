import { appRequest } from '@/utils/axios/request'
import type { ArticleListItem } from '@/api/blog/article/types'

export const getArticleList = (params?: {
  categorySlug?: string
  tagSlug?: string
}): Promise<ArticleListItem[]> => appRequest.post('/blog/article', params)
