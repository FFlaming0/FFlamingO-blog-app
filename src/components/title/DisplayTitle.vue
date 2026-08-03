<script setup lang="ts">
defineProps<{
  title: string
  icon?: string
}>()
</script>

<template>
  <h2 class="display-title"><i v-if="icon" :class="icon"></i>{{ title }}</h2>
</template>

<style scoped>
.display-title {
  font-size: 24px;
  padding: 0 0 10px;
  color: var(--primary);
}

.display-title i {
  width: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-inline-end: 10px;
}
</style>
