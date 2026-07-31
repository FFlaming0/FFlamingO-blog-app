import type { SiteInfo, NavItem, SocialLink, FooterInfo, Seo, DisplayItem, FrontendConfig } from '@/api/system/config/types/'

const baseURL = '/api/system/config'
export default [
{
    url: baseURL + '/site-info',
    method: 'get',
    response: () => {
      return siteInfo;
    }
  },
  {
    url: baseURL + '/nav',
    method: 'get',
    response: () => {
      return navItems;
    }
  }, 
  {
    url: baseURL + '/social-link',
    method: 'get',
    response: () => {
      return socialLinks;
    }
  },
  {
    url: baseURL + '/footer-info',
    method: 'get',
    response: () => {
      return footerInfo;
    }
  },
  {
    url: baseURL + '/display',
    method: 'get',
    response: () => {
      return displays;
    }
  },
];

const siteInfo: SiteInfo = {
    siteTitle: 'FFlamingO',
    siteIcon: '/favicon.ico',
    logo: '汀上焰影',
    backgroundImage: '/images/homepage/END8-1_7.png',
    mainTitle: '朱羽凌霞，灼华沐川',
    subTitle: '一羽流火，惊破千顷碧波；半声清唳，唤彻九霄晨曦。',
    avatar: 'src/assets/images/Avatar.png',
}

const wanxiang: NavItem[] = [
  { name: '硅基漫游', link: '/', icon: 'fa-solid fa-terminal' },
  { name: '观灼留影', link: '/', icon: 'fa-solid fa-comment-dots' },
  { name: '墨烬成珠', link: '/', icon: 'fa-solid fa-feather' },
  { name: '幻暮绘梦', link: '/', icon: 'fa-solid fa-film' },
  { name: '流音叙世', link: '/', icon: 'fa-solid fa-headphones' },
  { name: '栖川拾芥', link: '/', icon: 'fa-solid fa-bed-pulse' },
]
const about: NavItem[] = [
  { name: '关于本站', link: '/', icon: 'fa-solid fa-circle-info' },
  { name: '关于作者', link: '/', icon: 'fa-solid fa-user' },
  { name: '友情链接', link: '/', icon: 'fa-solid fa-link' },
  { name: 'Steam', link: '/', icon: 'fa-brands fa-steam' },
]

// 定义一级导航数据（包含 children 可选字段）
const navItems: NavItem[] = [
  { name: '首页', icon: 'fa-solid fa-house', link: '/' },
  { name: '你好，时光', icon: 'fa-solid fa-box-archive', link: '/' },
  { name: '万象', icon: 'fa-solid fa-ellipsis', secItem: wanxiang },
  { name: '专栏', icon: 'fa-solid fa-table-columns', link: '/' },
  { name: '关于', icon: 'fa-solid fa-address-card', secItem: about },
]

const socialLinks: SocialLink[] = [
  { icon: 'ri-qq-line', url: '', pic: '' },
  { icon: 'ri-bilibili-line', url: 'https://space.bilibili.com/283057416' },
  { icon: 'ri-netease-cloud-music-line', url: ''},
  { icon: 'ri-github-line' },
  { icon: 'ri-steam-line' },
  { icon: 'ri-twitter-line' },
  { icon: 'ri-mail-line' }
]

const footerInfo: FooterInfo = {
  copyright: 'Copyright © 2023 FlamingO. All rights reserved.',
  icp: 'ICP备案',
  police: '公安备案'
}

const displays: DisplayItem[] = [
  {
    id: 1,
    title: '标题1',
    description: '描述1',
    image: '/images/homepage/END8-1_7.png',
    link: '/',
    enabled: true,
  },
  {
    id: 2,
    title: '标题2',
    description: '描述2',
    image: '/images/homepage/END8-1_7.png',
    link: '/',
    enabled: true,
  }
]