import { appRequest } from '@/utils/axios/request'
import type { Category } from '@/api/blog/category/types'

export const getCategory = (slug: string): Promise<Category> =>
  appRequest.get(`/blog/category?slug=${slug}`)
