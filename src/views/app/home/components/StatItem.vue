<!-- components/StatItem.vue -->
<script setup lang="ts">
import { useHoverLift } from '@/composables/animation/useHoverLift'

const props = defineProps<{
  icon: string
  label: string
  value: string | number
}>()

const { style, onMouseEnter, onMouseLeave } = useHoverLift()
</script>

<template>
  <div class="stat-item" :style="style" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <i :class="icon"></i>
    <div class="stat-content">
      <span class="stat-label">{{ label }}</span>
      <span class="stat-value">{{ value }}</span>
    </div>
  </div>
</template>

<style scoped>
.stat-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-homepage-box);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--border-color);
  font-size: 0.85rem;
  gap: 0.6rem;
  min-width: 110px;
  flex-shrink: 0;
  line-height: 1.2;
  height: 50px;
}

.stat-item i {
  color: var(--text-content);
  transition: all 0.3s ease;
}

.stat-item:hover i {
  font-size: 18px;
  color: var(--primary);
}

.stat-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  line-height: 1.2;
  font-weight: 600;
}

.stat-label {
  font-weight: 500;
  color: var(--text-content);
  position: relative;
  font-size: 0.8rem;
  margin-bottom: 1px;
}

.stat-value {
  font-weight: 600;
  color: var(--primary);
  font-size: 0.85rem;
}
</style>
