import { ref, computed, onMounted } from 'vue'
import { useSearchStore } from '@/stores/search'
import type { Article } from '@/types/article'

export function usePosts() {
  const articles = ref<Article[]>([]) // 所有文章数据
  const isLoading = ref(true) // 加载状态
  const error = ref(null) // 错误信息
  const activeCategory = ref('全部') // 当前选中的分类
  const searchStore = useSearchStore() // 使用 Pinia 的搜索状态

  // 提取所有分类（去重）
  const categories = computed(() => {
    const cats = articles.value.map((a) => a.category)
    return ['全部', ...new Set(cats)]
  })

  // 过滤后的文章：先按分类，再按关键词
  const filteredArticles = computed(() => {
    let result = articles.value

    // 第一步：按分类过滤
    if (activeCategory.value !== '全部') {
      result = result.filter((a) => a.category === activeCategory.value)
    }

    // 第二步：按关键词过滤（搜索标题和摘要）
    if (searchStore.keyword.trim()) {
      const kw = searchStore.keyword.trim().toLowerCase()
      result = result.filter(
        (a) => a.title.toLowerCase().includes(kw) || a.summary.toLowerCase().includes(kw),
      )
    }

    return result
  })

  // 根据 ID 查找单篇文章
  function getArticleById(id: number) {
    return articles.value.find((a) => a.id === id)
  }

  // 切换分类
  function setCategory(cat: string) {
    activeCategory.value = cat
  }

  // 加载数据
  async function fetchPosts() {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch('/posts.json')
      // 检查响应是否成功（404 或 500 时抛出错误）
      if (!response.ok) {
        throw new Error(`加载失败：HTTP ${response.status}`)
      }
      const data = await response.json()
      articles.value = data
    } catch (err: any) {
      error.value = err.message
      console.error('文章数据加载失败：', err)
    } finally {
      isLoading.value = false
    }
  }

  // 组件挂载时自动加载
  onMounted(() => {
    fetchPosts()
  })

  // 返回给组件使用的数据和方法
  return {
    articles,
    isLoading,
    error,
    activeCategory,
    categories,
    filteredArticles,
    getArticleById,
    setCategory,
    fetchPosts,
  }
}
