import { appRequest } from '@/utils/axios/request'
import type { StatsOverview } from '@/api/system/stats/types'

export const getStatsOverview = (): Promise<StatsOverview> => appRequest.get('/system/stats')
