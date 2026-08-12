import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequests'
import { getBloggerProfile } from '@/api/system/blogger'
import type { BloggerProfile } from '@/api/system/blogger/types'

export const useBloggerStore = defineStore('blogger', () => {
  const { data: blogger } = useRequest(getBloggerProfile)

  return { blogger }
})
