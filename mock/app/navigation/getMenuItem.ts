export default [
  {
    url: '/api/navigation',
    method: 'get',
    response: () => {
      return navItems;
    }
  }
];


const wanxiang: DrawerItemList = [
  { label: '硅基漫游', to: '/', icon: 'fa-solid fa-terminal' },
  { label: '观灼留影', to: '/', icon: 'fa-solid fa-comment-dots' },
  { label: '墨烬成珠', to: '/', icon: 'fa-solid fa-feather' },
  { label: '幻暮绘梦', to: '/', icon: 'fa-solid fa-film' },
  { label: '流音叙世', to: '/', icon: 'fa-solid fa-headphones' },
  { label: '栖川拾芥', to: '/', icon: 'fa-solid fa-bed-pulse' },
]
const about: DrawerItemList = [
  { label: '关于本站', to: '/', icon: 'fa-solid fa-circle-info' },
  { label: '关于作者', to: '/', icon: 'fa-solid fa-user' },
  { label: '友情链接', to: '/', icon: 'fa-solid fa-link' },
  { label: 'Steam', to: '/', icon: 'fa-brands fa-steam' },
]

// 定义一级导航数据（包含 children 可选字段）
const navItems: NavItemList = [
  { label: '首页', icon: 'fa-solid fa-house', to: '/' },
  { label: '你好，时光', icon: 'fa-solid fa-box-archive', to: '/' },
  { label: '万象', icon: 'fa-solid fa-ellipsis', secItem: wanxiang },
  { label: '专栏', icon: 'fa-solid fa-table-columns', to: '/' },
  { label: '关于', icon: 'fa-solid fa-address-card', secItem: about },
]