<script setup lang="ts">
const props = defineProps({
  categories: Array as () => string[], // 所有分类列表
  activeCategory: String as () => string, // 当前选中的分类
})

// 声明要发送的事件
const emit = defineEmits(['update-category'])

function selectCategory(cat: string) {
  // 触发事件，将选中的分类传给父组件
  emit('update-category', cat)
}
</script>

<template>
  <div class="filter-bar">
    <button
      v-for="cat in categories"
      :key="cat"
      :class="{ active: activeCategory === cat }"
      @click="selectCategory(cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-bar button {
  padding: 6px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.filter-bar button.active {
  background: var(--secondary);
  color: #fff;
  border-color: var(--primary);
}

.filter-bar button:hover {
  border-color: var(--primary);
}
</style>
