<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import { useFrontendConfigStore } from '@/stores/frontendConfig'
const configStore = useFrontendConfigStore()
</script>

<template>
  <div>
    <!-- <NavBar /> -->
    <main>
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
