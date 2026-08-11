'use client'

import type { CSSProperties, ReactNode } from 'react'
import { canvasTokens, chartColorSequence, semanticTone } from './tokens'

export type ChartTone = 'success' | 'danger' | 'warning' | 'info' | 'neutral'
export type ChartDataPoint = { label: string; value: number }
export type ChartSeries = { name: string; data: number[]; tone?: ChartTone }
export type ChartReferenceLine = {
  value: number
  label?: string
  tone?: ChartTone
}

function toneColor(tone?: ChartTone, index = 0) {
  if (!tone) return chartColorSequence[index % chartColorSequence.length]
  return tone === 'neutral' ? canvasTokens.text.tertiary : semanticTone[tone]
}

export function BarChart({
  categories,
  series,
  height = 220,
  style,
}: {
  categories: string[]
  series: ChartSeries[]
  height?: number
  stacked?: boolean
  horizontal?: boolean
  normalized?: boolean
  beginAtZero?: boolean
  yMin?: number
  yMax?: number
  referenceLines?: ChartReferenceLine[]
  style?: CSSProperties
  title?: string
}) {
  const max = Math.max(1, ...series.flatMap((s) => s.data))
  const w = Math.max(320, categories.length * 48)
  const pad = { t: 16, r: 12, b: 36, l: 36 }
  const plotH = height - pad.t - pad.b
  const plotW = w - pad.l - pad.r
  const groupW = plotW / Math.max(categories.length, 1)
  const barW = Math.max(4, (groupW * 0.6) / Math.max(series.length, 1))

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${height}`} style={style}>
      {categories.map((cat, i) => (
        <g key={cat}>
          {series.map((s, si) => {
            const v = s.data[i] ?? 0
            const h = (v / max) * plotH
            const x = pad.l + i * groupW + groupW * 0.2 + si * barW
            const y = pad.t + plotH - h
            return (
              <rect
                key={s.name}
                x={x}
                y={y}
                width={barW - 2}
                height={h}
                fill={toneColor(s.tone, si)}
                rx={2}
              />
            )
          })}
          <text
            x={pad.l + i * groupW + groupW / 2}
            y={height - 12}
            textAnchor="middle"
            fill={canvasTokens.text.tertiary}
            fontSize={10}
          >
            {cat}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function LineChart({
  categories,
  series,
  height = 220,
  style,
}: {
  categories: string[]
  series: ChartSeries[]
  height?: number
  beginAtZero?: boolean
  yMin?: number
  yMax?: number
  referenceLines?: ChartReferenceLine[]
  style?: CSSProperties
  title?: string
}) {
  const max = Math.max(1, ...series.flatMap((s) => s.data))
  const w = Math.max(320, categories.length * 48)
  const pad = { t: 16, r: 12, b: 36, l: 36 }
  const plotH = height - pad.t - pad.b
  const plotW = w - pad.l - pad.r

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${height}`} style={style}>
      {series.map((s, si) => {
        const points = s.data
          .map((v, i) => {
            const x =
              pad.l +
              (i / Math.max(categories.length - 1, 1)) * plotW
            const y = pad.t + plotH - (v / max) * plotH
            return `${x},${y}`
          })
          .join(' ')
        return (
          <polyline
            key={s.name}
            points={points}
            fill="none"
            stroke={toneColor(s.tone, si)}
            strokeWidth={2}
          />
        )
      })}
    </svg>
  )
}

export function PieChart({
  data,
  size = 180,
  style,
}: {
  data: ChartDataPoint[]
  size?: number
  style?: CSSProperties
  title?: string
}) {
  const total = data.reduce((a, d) => a + d.value, 0) || 1
  let angle = -Math.PI / 2
  const r = size / 2 - 4
  const cx = size / 2
  const cy = size / 2

  const slices = data.map((d, i) => {
    const slice = (d.value / total) * Math.PI * 2
    const x1 = cx + r * Math.cos(angle)
    const y1 = cy + r * Math.sin(angle)
    angle += slice
    const x2 = cx + r * Math.cos(angle)
    const y2 = cy + r * Math.sin(angle)
    const large = slice > Math.PI ? 1 : 0
    return (
      <path
        key={d.label}
        d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
        fill={toneColor(undefined, i)}
      />
    )
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={style}>
      {slices}
    </svg>
  )
}

export function UsageBar({
  segments,
  style,
}: {
  segments: { label?: string; value: number; color?: string }[]
  style?: CSSProperties
}) {
  const total = segments.reduce((a, s) => a + s.value, 0) || 1
  return (
    <div
      style={{
        display: 'flex',
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
        background: canvasTokens.fill.tertiary,
        ...style,
      }}
    >
      {segments.map((s, i) => (
        <div
          key={i}
          style={{
            width: `${(s.value / total) * 100}%`,
            background: s.color ?? chartColorSequence[i % chartColorSequence.length],
          }}
        />
      ))}
    </div>
  )
}

export type UsageBarSegment = {
  label?: string
  value: number
  color?: string
}
export type UsageBarProps = {
  segments: UsageBarSegment[]
  style?: CSSProperties
}

export function Swatch({
  color,
  label,
}: {
  color: string
  label?: ReactNode
}) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: 2,
          background: color,
        }}
      />
      {label}
    </span>
  )
}

export type SwatchProps = { color: string; label?: ReactNode }
