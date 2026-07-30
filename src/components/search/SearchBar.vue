<script setup lang="ts">
const keyword = defineModel<string>()
</script>

<template>
  <div class="search-bar">
    <input v-model="keyword" type="text" placeholder="搜索文章标题或摘要..." class="search-input" />
    <span v-if="keyword" class="clear-btn" @click="keyword = ''">✕</span>
  </div>
</template>

<style scoped>
.search-bar {
  position: relative;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #42b883;
}

.clear-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
  font-size: 18px;
  user-select: none;
}
</style>
