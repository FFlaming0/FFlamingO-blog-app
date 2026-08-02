import { appRequest } from '@/utils/axios/request'
import type { Tag } from '@/api/blog/tag/types'

export const getTag = (slug: string): Promise<Tag> =>
  appRequest.get(`/blog/tag?slug=${slug}`)
