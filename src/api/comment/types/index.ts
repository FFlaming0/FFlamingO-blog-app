/** 评论者信息 */
interface Commenter {
  name: string;          // 昵称
  email?: string;        // 邮箱（用于 Gravatar）
  qq?: string;           // QQ 号（用于获取 QQ 头像）
  os?: string;           // 操作系统（展示用）
  browser?: string;      // 浏览器（展示用）
  ip?: string;           // IP 归属地（展示用）
}

/** 评论实体（嵌套回复） */
interface Comment {
  id: number;
  content: string;
  commenter: Commenter;
  createdAt: string;      // 提交时间
  isTop: boolean;         // 是否置顶
  status: '';             // 审核状态
  replies?: Comment[];    // 子回复列表（递归）
}

export type { Commenter, Comment }