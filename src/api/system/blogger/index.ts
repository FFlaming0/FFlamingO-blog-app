import { appRequest } from '@/utils/axios/request'
import type { BloggerProfile } from '@/api/system/blogger/types'

export const getBloggerProfile = (): Promise<BloggerProfile> => appRequest.get('/system/blogger')
