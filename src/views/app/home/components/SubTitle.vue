<script setup lang="ts">
import GlassBox from '@/components/box/GlassBox.vue'
const prop = defineProps<{
  subTitle: string
}>()
</script>

<template>
  <GlassBox :margin="'22px 120.5px 0px'" :max-width="'80%'" :padding="'15px'" :radius="'12px'">
    <p class="title-box-text">{{ prop.subTitle }}</p>
  </GlassBox>
</template>

<style scoped>
.title-box-text {
  font-size: 20px;
  font-family: BlogFont, sans-serif;
  font-weight: 600;
  color: var(--primary);
  text-align: center;
  margin: 0;
  line-height: 1.6;
  letter-spacing: 2px;
}

.title-box-text:hover {
  color: var(--secondary);
}
</style>
