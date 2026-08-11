import type { CSSProperties } from 'react'
import type { ChartDataPoint, ChartReferenceLine, ChartSeries, ChartTone } from './charts'

export type { ChartDataPoint, ChartReferenceLine, ChartSeries, ChartTone }

type ValueAxisProps = {
  beginAtZero?: boolean
  yMin?: number
  yMax?: number
  referenceLines?: ChartReferenceLine[]
}

export type BarChartProps = ValueAxisProps & {
  categories: string[]
  series: ChartSeries[]
  height?: number
  stacked?: boolean
  horizontal?: boolean
  normalized?: boolean
  style?: CSSProperties
  title?: string
}

export type LineChartProps = ValueAxisProps & {
  categories: string[]
  series: ChartSeries[]
  height?: number
  style?: CSSProperties
  title?: string
}

export type PieChartProps = {
  data: ChartDataPoint[]
  size?: number
  style?: CSSProperties
  title?: string
}
