import { Box } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush
} from 'recharts'
import { PerformanceData } from '../../types'
import { formatChartData } from '../../utils'
import { useMemo } from 'react'

interface PerformanceChartProps {
  data: PerformanceData[]
}

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  const chartData = useMemo(() => formatChartData(data), [data])
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis yAxisId='left' orientation='left' stroke='#8884d8' />
          <YAxis yAxisId='right' orientation='right' stroke='#82ca9d' />
          <Tooltip />
          <Legend />
          <Line
            yAxisId='left'
            type='monotone'
            dataKey='activePower'
            name='Active Power (kW)'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId='right'
            type='monotone'
            dataKey='energy'
            name='Energy (kWh)'
            stroke='#82ca9d'
          />
          <Brush
            dataKey='date'
            height={30}
            stroke='#8884d8'
            travellerWidth={8}
            startIndex={Math.floor(data.length * 0.7)} // Start showing last 30%
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}
