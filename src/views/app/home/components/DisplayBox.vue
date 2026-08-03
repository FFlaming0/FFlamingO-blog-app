<script setup lang="ts">
import AppLink from '@/components/link/AppLink.vue'
import { useFrontendConfigStore } from '@/stores/frontendConfig'
import { storeToRefs } from 'pinia'

const configStore = useFrontendConfigStore()
const { displays, displayInfo } = storeToRefs(configStore)
</script>

<template>
  <div class="display-grid">
    <div v-if="displayInfo" class="stat-container">
      <div class="stat-item" v-for="(item, idx) in displayInfo" :key="idx">
        <i :class="item.icon"></i>
        <div class="stat-content">
          <span class="stat-label">{{ item.label }}</span>
          <span class="stat-value">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <div v-if="displays" class="display-card" v-for="(display, idx) in displays">
      <div class="card-title-wrapper">
        <h3 class="card-title">{{ display.title }}</h3>
      </div>
      <AppLink :to="display.link" class="card-link">
        <div class="card-image">
            <img :src="display.image" :alt="display.title">
        </div>
        <div class="card-info">{{ display.description }}</div>
      </AppLink>
    </div>
  </div>
</template>

<style scoped>
.display-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(3rem, auto);
  gap: 1.25rem;
  width: 100%;
  margin: 15px 0;
  margin-bottom: 40px;
}

.stat-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  width: 100%;
  grid-column: span 12;
  padding: 0.25rem 0.1rem;
}

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
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
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

.display-card {
  grid-column: span 4;
  grid-row: span 2;
  min-height: 18rem;
  overflow: hidden;
  position: relative;
  border-radius: 1.25rem;
  box-shadow:
    0 4px 24px -8px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
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
}

.card-info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 4rem 1.25rem 2rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 70%, transparent 100%);
    color: white;
    transition: transform 0.4s ease, opacity 0.3s;
    z-index: 2;
    transform: translateY(1rem);
    opacity: 0.9;
}
</style>
