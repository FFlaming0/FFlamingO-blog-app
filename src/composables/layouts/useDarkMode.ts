import { ref, watchEffect } from 'vue'

export function useDarkMode() {
  // 从 localStorage 读取用户之前的设置（没有则默认 light）
  const saved = localStorage.getItem('blog-theme')
  const isDark = ref(saved === 'dark')

  // 应用主题到 DOM
  function applyTheme(dark: boolean) {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('blog-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('blog-theme', 'light')
    }
  }

  // watchEffect 会立即执行一次，完成初始主题的应用
  // 之后每当 isDark 变化，自动同步到 DOM
  watchEffect(() => {
    applyTheme(isDark.value)
  })

  // 切换暗黑模式
  function toggleDark() {
    isDark.value = !isDark.value
  }

  return { isDark, toggleDark }
}
