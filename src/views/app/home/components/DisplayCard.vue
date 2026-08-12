<script setup lang="ts">
import AppLink from '@/components/link/AppLink.vue'
import { useHoverLift } from '@/composables/animation/useHoverLift'
import type { DisplayItem } from '@/api/system/config/types'

defineProps<{
  display: DisplayItem
}>()

const { style, onMouseEnter, onMouseLeave } = useHoverLift({
  borderColor: 'var(--border-color)',
})
</script>

<template>
  <div class="display-card">
    <div class="card-inner" :style="style" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <div class="card-title-wrapper">
        <h3 class="card-title">{{ display.title }}</h3>
      </div>
      <AppLink :to="display.link" class="card-link">
        <div class="card-image">
          <img :src="display.image" :alt="display.title" />
        </div>
        <div class="card-info">{{ display.description }}</div>
      </AppLink>
    </div>
  </div>
</template>

<style scoped>
.display-card {
  grid-column: span 4;
  grid-row: span 2;
  min-height: 18rem;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  will-change: transform, box-shadow;
}

.card-title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 1.25rem;
  z-index: 3;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 60%,
    transparent 100%
  );
  border-radius: 1.25rem 1.25rem 0 0;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  mask-image: linear-gradient(180deg, #000000 20%, #0000004d);
  -webkit-mask-image: linear-gradient(180deg, #000000 20%, #0000004d);
}

.card-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.02em;
}

.card-link {
  background-color: transparent;
  text-decoration: none;
  color: var(--theme-skin, #505050);
  outline: 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  -webkit-transition: all 0.2s ease-in-out;
  word-break: break-word;
}

.card-image {
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.card-inner:hover .card-image img {
  transform: scale(1.08);
}

.card-info {
  --lift-extra: 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 4rem 1.25rem 2rem;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 70%,
    transparent 100%
  );
  color: white;
  transition:
    transform 0.4s ease,
    opacity 0.3s;
  z-index: 2;
  transform: translateY(calc(1rem - var(--lift-extra)));
  opacity: 0.9;
}

.card-inner:hover .card-info {
  --lift-extra: 16px;
}
</style>
