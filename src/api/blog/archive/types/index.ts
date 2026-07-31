import type { ArticleListItem } from '@/api/blog/article/types'

interface ArchiveGroup {
  yearMonth: string;          // "2026-07"
  articles: ArticleListItem[];
}

export type ArchiveList = ArchiveGroup[]; 
export type { ArchiveGroup }