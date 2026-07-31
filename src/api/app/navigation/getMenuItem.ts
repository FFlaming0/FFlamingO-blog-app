import { appRequest } from '@/utils/axios/request';
import type { NavItemList, DrawerItemList } from '@/types/layouts/menuItem.ts';

export const getNavigation = (): Promise<NavItemList> => {
  return appRequest.get('/navigation'); // 实际请求 URL = /api/navigation
};