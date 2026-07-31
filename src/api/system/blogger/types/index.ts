interface BloggerProfile {
  nickname: string;
  avatar: string;
  email?: string;
  bio: string;            // 个人简介（支持 HTML/Markdown）
  skills: string[];       // 技能标签
}

export type { BloggerProfile }