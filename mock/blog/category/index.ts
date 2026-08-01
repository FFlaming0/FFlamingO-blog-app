import type { Category } from '@/api/blog/category/types'

const baseURL = '/api/blog/category'
export default [
{
    url: baseURL,
    method: 'get',
    response: (options: any) => {
      // 可以通过 options.query 获取查询参数（如果插件支持）
      // 或者用原生 URL 解析
      const url = new URL(options.url as string, 'http://localhost/api/blog/category');
      const slug = url.searchParams.get('slug');
      return categoryData.filter(category => category.slug === slug)[0];
    }
  },
];

const categoryData: Category[] = [
    {
        id: 1,
        name: '硅基漫游',   
        slug: 'tech',
        image: 'http://fflamingo.top/wp-content/uploads/2025/08/1756578561-科技.jpg',
        articleCount: 3,
        sortOrder: 1
    },
    {
        id: 2,
        name: '观灼留影',
        slug: 'review',
        image: 'http://fflamingo.top/wp-content/uploads/2025/08/1756618488-神探夏洛克-scaled-e1756618580541.jpg',
        articleCount: 2,
        sortOrder: 2
    },
    {
        id: 3,
        name: '幻幕绘梦',
        slug: 'anime',
        image: 'http://fflamingo.top/wp-content/uploads/2025/08/1756621037-koishi.png',
        articleCount: 1,
        sortOrder: 3
    }
]