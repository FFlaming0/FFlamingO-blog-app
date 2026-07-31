import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { NavItemList } from '@/types/layouts/menuItem'
import { getNavigation } from '@/api/app/navigation/getMenuItem'

export const useNavigationStore = defineStore('navigation', () => {
  const items = ref<NavItemList>([])
  const loading = ref(false)
  const loaded = ref(false) // 标记是否已请求过

  // 获取导航数据（仅当未加载时）
  const fetchItems = async () => {
    if (loaded.value) return
    loading.value = true
    try {
      const data = await getNavigation()
      items.value = data
      loaded.value = true
    } catch (error) {
      console.error('导航数据加载失败:', error)
    } finally {
      loading.value = false
    }
  }

  return items
})
