import type { ArticleListItem } from '@/api/blog/article/types'
import type { Category } from '@/api/blog/category/types'
import type { Tag } from '@/api/blog/tag/types'

interface SearchResult {
  keyword: string;
  // 匹配的文章列表
  articles: ArticleListItem[];
  // 匹配的分类（用于快速跳转）
  matchedCategories: Category[];
  // 匹配的标签（用于快速跳转）
  matchedTags: Tag[];
}