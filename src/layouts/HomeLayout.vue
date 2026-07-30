<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div>
    <NavBar />
    <main>
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
