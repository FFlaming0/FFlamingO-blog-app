import { appRequest } from '@/utils/axios/request'
import type {
  SiteInfo,
  NavItem,
  SocialLink,
  FooterInfo,
  Seo,
  DisplayItem,
  FrontendConfig,
} from '@/api/system/config/types'

export const getSiteInfo = (): Promise<SiteInfo> => appRequest.get('/system/config/site-info')
export const getNavItems = (): Promise<NavItem[]> => appRequest.get('/system/config/nav')
export const getSocialLinks = (): Promise<SocialLink[]> =>
  appRequest.get('/system/config/social-link')
export const getFooterInfo = (): Promise<FooterInfo> => appRequest.get('/system/config/footer-info')
export const getSeo = (): Promise<Seo> => appRequest.get('/system/config/seo')
export const getDisplays = (): Promise<DisplayItem[]> => appRequest.get('/system/config/display')
