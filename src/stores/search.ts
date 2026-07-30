import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useSearchStore = defineStore('search', () => {
  const keyword = ref<string>('')
  return { keyword }
})
