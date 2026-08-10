import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequests'
import { getStatsOverview } from '@/api/system/stats'
import type { StatsOverview } from '@/api/system/stats/types'

export const useStatsStore = defineStore('stats', () => {
  const { data: statsOverview } = useRequest(getStatsOverview)

  return { statsOverview }
})
