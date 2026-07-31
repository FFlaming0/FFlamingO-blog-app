<script setup lang="ts">
import { useFrontendConfigStore } from '@/stores/frontendConfig'
const configStore = useFrontendConfigStore()
</script>

<template>
  <footer class="footer">
    <p>{{ configStore.footerInfo?.copyright }}</p>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: 20px;
  color: #999;
  border-top: 1px solid #eee;
}
</style>
