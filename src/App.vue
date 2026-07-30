<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import * as layoutComponents from '@/layouts/index.ts'
const route = useRoute()

const layoutComponent = computed(() => {
  const layoutName = route.meta.layout || 'DefaultLayout'
  // 通过对象属性访问对应组件，如果不存在则回退到 DefaultLayout
  return layoutComponents[layoutName] || layoutComponents.DefaultLayout
})
</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>
