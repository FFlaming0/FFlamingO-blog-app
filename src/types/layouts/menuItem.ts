export interface DrawerItem {
  label: string
  icon: string
  to?: string
}

export interface navItem {
  label: string
  icon: string
  secItem?: DrawerItem[]
  to?: string
}

export type DrawerItemList = DrawerItem[]
export type NavItemList = navItem[]
