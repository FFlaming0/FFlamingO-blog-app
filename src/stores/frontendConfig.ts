import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getSiteInfo,
  getNavItems,
  getSocialLinks,
  getFooterInfo,
  getSeo,
  getDisplays,
  getDisplayInfo,
} from '@/api/system/config'
import { useRequest } from '@/composables/useRequests'

export const useFrontendConfigStore = defineStore('frontendConfig', () => {
  const { data: siteInfo } = useRequest(getSiteInfo)
  const { data: navItems } = useRequest(getNavItems)
  const { data: socialLinks } = useRequest(getSocialLinks)
  const { data: footerInfo } = useRequest(getFooterInfo)
  const { data: seo } = useRequest(getSeo)
  const { data: displays } = useRequest(getDisplays)
  const { data: displayInfo } = useRequest(getDisplayInfo)

  return { siteInfo, navItems, socialLinks, footerInfo, seo, displays, displayInfo }
})
