<script setup lang="ts">
import StatItem from './StatItem.vue'
import DisplayCard from './DisplayCard.vue'
import { computed } from 'vue'
import { useFrontendConfigStore } from '@/stores/frontendConfig'
import { useStatsStore } from '@/stores/stats'
import { storeToRefs } from 'pinia'

const configStore = useFrontendConfigStore()
const { displays } = storeToRefs(configStore)
const { statsOverview } = storeToRefs(useStatsStore())

const statItems = computed(() => {
  const data = statsOverview.value
  if (!data) {
    return [
      { icon: 'fa-solid fa-medal', label: '运行时间', value: '加载中...' },
      { icon: 'fa-regular fa-file-lines', label: '内容数', value: '加载中...' },
      { icon: 'fa-regular fa-eye', label: '访问数', value: '加载中...' },
      { icon: 'fa-solid fa-user-clock', label: '上次在线', value: '加载中...' },
    ]
  }
  return [
    { icon: 'fa-solid fa-medal', label: '运行时间', value: `${data.runDays} 天` },
    { icon: 'fa-regular fa-file-lines', label: '内容数', value: `${data.articleCount} 篇` },
    { icon: 'fa-regular fa-eye', label: '访问数', value: data.totalViews },
    { icon: 'fa-solid fa-user-clock', label: '上次在线', value: data.lastLoginTime },
  ]
})
</script>

<template>
  <div class="display-grid">
    <div v-if="statsOverview" class="stat-container">
      <StatItem
        v-for="item in statItems"
        :key="item.label"
        :icon="item.label"
        :label="item.label"
        :value="item.value"
      />
    </div>

    <DisplayCard
      v-if="displays"
      v-for="display in displays"
      :key="display.title"
      :display="display"
    />
    <!-- <div v-if="displays" class="display-card" v-for="(display, idx) in displays">
      <div class="card-title-wrapper">
        <h3 class="card-title">{{ display.title }}</h3>
      </div>
      <AppLink :to="display.link" class="card-link">
        <div class="card-image">
          <img :src="display.image" :alt="display.title" />
        </div>
        <div class="card-info">{{ display.description }}</div>
      </AppLink>
    </div> -->
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
</style>
