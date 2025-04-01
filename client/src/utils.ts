import { PerformanceData } from './types'

export const formatChartData = (data: PerformanceData[]) => {
  return data.map(item => ({
    date: new Date(item.timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    activePower: item.activePower,
    energy: item.energy
  }))
}
