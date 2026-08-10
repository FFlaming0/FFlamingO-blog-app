<!-- components/article/TableOfContents.vue -->
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue'

// 目录项接口
interface TocItem {
  id: string
  text: string
  level: number
}

const props = withDefaults(
  defineProps<{
    content?: string
    selector?: string
    minLevel?: number
    maxLevel?: number
    scrollOffset?: number
  }>(),
  {
    content: '',
    selector: 'h1, h2, h3, h4, h5, h6',
    minLevel: 1,
    maxLevel: 3,
    scrollOffset: 80,
  },
)

const items = ref<TocItem[]>([])
const activeId = ref<string>('')

// 解析 HTML 提取标题
function parseHeadings(html: string): TocItem[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const headingEls = doc.querySelectorAll(props.selector)
  const result: TocItem[] = []

  headingEls.forEach((el, index) => {
    const level = parseInt(el.tagName.charAt(1), 10)
    if (level < props.minLevel || level > props.maxLevel) return

    let id = el.id
    if (!id) {
      id = `heading-${index}`
      el.id = id
    }
    result.push({
      id,
      text: el.textContent?.trim() || '',
      level,
    })
  })
  return result
}

// 设置 IntersectionObserver
function setupObserver() {
  if (observer.value) {
    observer.value.disconnect()
  }

  const headingSelectors = items.value.map((item) => `#${item.id}`).join(', ')
  const headingEls = document.querySelectorAll(headingSelectors)

  if (!headingEls.length) return

  observer.value = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      const first = visible[0]
      if (first) {
        activeId.value = first.target.id
      }
    },
    {
      rootMargin: `-${props.scrollOffset}px 0px 0px 0px`,
      threshold: 0.2,
    },
  )

  headingEls.forEach((el) => observer.value!.observe(el))
}

// 监听 content 变化重新解析并刷新观察者
watch(
  () => props.content,
  (newVal) => {
    if (newVal) {
      items.value = parseHeadings(newVal)
      nextTick(() => setupObserver())
    } else {
      items.value = []
      observer.value?.disconnect()
    }
  },
  { immediate: true },
)

// 组件挂载后建立观察者
onMounted(() => {
  if (props.content) {
    nextTick(() => setupObserver())
  }
})

// 清理观察者
const observer = ref<IntersectionObserver | null>(null)
onUnmounted(() => {
  observer.value?.disconnect()
})

// 点击目录跳转
function scrollToHeading(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - props.scrollOffset
  window.scrollTo({ top, behavior: 'smooth' })
  activeId.value = id
}
</script>

<template>
  <div v-if="items.length > 0" class="toc-container">
    <div class="toc-title">目录</div>
    <ul class="toc-list">
      <li
        v-for="item in items"
        :key="item.id"
        :class="['toc-item', `toc-level-${item.level}`, { active: activeId === item.id }]"
        @click="scrollToHeading(item.id)"
      >
        <span class="toc-link">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.toc-container {
  position: sticky;
  top: 100px; /* 调整与顶部距离 */
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  padding: 16px 0;
  border-left: 3px solid var(--primary, #42b883);
}

.toc-title {
  font-weight: 600;
  font-size: 16px;
  padding: 0 16px 8px;
  color: var(--text-primary);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  padding: 6px 16px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-secondary);
  transition:
    color 0.2s,
    background 0.2s;
  border-left: 2px solid transparent;
}

.toc-item:hover {
  color: var(--primary);
  background: rgba(66, 184, 131, 0.06);
}

.toc-item.active {
  color: var(--primary);
  border-left-color: var(--primary);
  background: rgba(66, 184, 131, 0.08);
  font-weight: 500;
}

.toc-level-1 {
  padding-left: 16px;
}
.toc-level-2 {
  padding-left: 32px;
}
.toc-level-3 {
  padding-left: 48px;
}
.toc-level-4 {
  padding-left: 64px;
}
.toc-level-5 {
  padding-left: 80px;
}
.toc-level-6 {
  padding-left: 96px;
}
</style>
