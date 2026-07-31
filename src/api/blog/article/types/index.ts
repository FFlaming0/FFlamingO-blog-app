import type { Category } from '@/api/blog/category/types';
import type { Tag } from '@/api/blog/tag/types';

/** 文章列表项（首页、分类页、标签页、归档页、搜索结果） */
interface ArticleListItem {
  id: number;
  slug: string;               // URL 路由标识
  title: string;
  summary: string;            // 摘要
  coverImage?: string;        // 封面图
  category: Category;         // 所属分类（简略对象）
  tags: Tag[];               // 关联标签列表
  status: 'PUBLISHED';       // 前台只展示已发布
  publishTime: string;       // 格式化时间 "yyyy-MM-dd HH:mm:ss"
  wordCount: number;
  readingTime: number;       // 阅读时长（分钟）
  viewCount: number;
  isTop: boolean;            // 是否置顶
  isComment: boolean;        // 是否允许评论
  commentCount: number;      // 评论总数（用于列表展示）
}

/** 文章详情页（包含正文） */
interface ArticleDetail extends ArticleListItem {
  contentHtml: string;       // 渲染后的 HTML 正文
  // 相邻文章导航
  previousArticle?: Pick<ArticleListItem, 'id' | 'title' | 'slug' | 'coverImage'>;
  nextArticle?: Pick<ArticleListItem, 'id' | 'title' | 'slug' | 'coverImage'>;
}

export type {
  ArticleListItem,
  ArticleDetail,
};