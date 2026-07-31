export interface FriendLink {
  id: number;
  name: string;
  url: string;
  logo?: string;        // Logo 图片 URL
  description?: string;
  category?: string;    // 分类
  sortOrder: number;
}