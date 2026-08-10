import { appRequest } from '@/utils/axios/request'
import type { ArticleListItem, ArticleDetail } from '@/api/blog/article/types'

export const getArticleList = (params?: {
  categorySlug?: string
  tagSlug?: string
}): Promise<ArticleListItem[]> => appRequest.post('/blog/article', params)

export const getArticle = (params?: { id?: number; slug?: string }): Promise<ArticleDetail> =>
  appRequest.get('/blog/article', { params })
