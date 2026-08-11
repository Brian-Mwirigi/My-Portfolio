'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
import { canvasTokens, canvasRadius } from './tokens'
import { Card, CardBody, CardHeader, CanvasChevron, Text, Stack } from './ui-primitives'

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  style,
}: {
  title: ReactNode
  children?: ReactNode
  defaultOpen?: boolean
  style?: CSSProperties
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={style}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          width: '100%',
          padding: '8px 0',
          border: 'none',
          background: 'transparent',
          color: canvasTokens.text.primary,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <CanvasChevron expanded={open} />
        <span style={{ fontSize: 13, fontWeight: 500 }}>{title}</span>
      </button>
      {open ? <div style={{ paddingBottom: 8 }}>{children}</div> : null}
    </div>
  )
}

export type CollapsibleSectionProps = {
  title: ReactNode
  children?: ReactNode
  defaultOpen?: boolean
  style?: CSSProperties
}

export function DiffView({
  lines,
  style,
}: {
  path?: string
  lines: { type: 'add' | 'del' | 'context' | 'header'; content: string; lineNumber?: number }[]
  style?: CSSProperties
}) {
  return (
    <pre
      style={{
        margin: 0,
        padding: 12,
        fontSize: 12,
        lineHeight: '18px',
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        overflow: 'auto',
        ...style,
      }}
    >
      {lines.map((l, i) => (
        <div
          key={i}
          style={{
            background:
              l.type === 'add'
                ? canvasTokens.diff.insertedLine
                : l.type === 'del'
                  ? canvasTokens.diff.removedLine
                  : 'transparent',
            color: canvasTokens.text.primary,
          }}
        >
          {(l.type === 'add' ? '+ ' : l.type === 'del' ? '- ' : '  ') + l.content}
        </div>
      ))}
    </pre>
  )
}

export function DiffStats({
  additions,
  deletions,
}: {
  additions: number
  deletions: number
}) {
  return (
    <span style={{ fontSize: 12, color: canvasTokens.text.secondary }}>
      <span style={{ color: canvasTokens.diff.stripAdded }}>+{additions}</span>{' '}
      <span style={{ color: canvasTokens.diff.stripRemoved }}>-{deletions}</span>
    </span>
  )
}

export type DiffLineType = 'add' | 'del' | 'context' | 'header'
export type DiffLineData = {
  type: DiffLineType
  content: string
  lineNumber?: number
}
export type DiffViewProps = {
  path?: string
  lines: DiffLineData[]
  style?: CSSProperties
}
export type DiffStatsProps = { additions: number; deletions: number }

export type TodoStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'
export type TodoItem = { id: string; content: string; status: TodoStatus }

export function TodoList({ items }: { items: TodoItem[] }) {
  return (
    <Stack gap={6}>
      {items.map((item) => (
        <Text key={item.id} size="small" tone="secondary">
          [{item.status}] {item.content}
        </Text>
      ))}
    </Stack>
  )
}

export function TodoListCard({
  title,
  items,
}: {
  title?: ReactNode
  items: TodoItem[]
}) {
  return (
    <Card>
      {title ? <CardHeader>{title}</CardHeader> : null}
      <CardBody>
        <TodoList items={items} />
      </CardBody>
    </Card>
  )
}

export type TodoListProps = { items: TodoItem[] }
export type TodoListCardProps = { title?: ReactNode; items: TodoItem[] }

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked?: boolean
  onChange?: (v: boolean) => void
  label?: ReactNode
}) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      {label}
    </label>
  )
}

export function Toggle({
  checked,
  onChange,
}: {
  checked?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!checked)}
      style={{
        width: 32,
        height: 18,
        borderRadius: 999,
        border: 'none',
        background: checked
          ? canvasTokens.accent.control
          : canvasTokens.fill.primary,
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: checked ? 16 : 2,
          width: 14,
          height: 14,
          borderRadius: 999,
          background: '#fff',
        }}
      />
    </button>
  )
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        height: 28,
        padding: '0 8px',
        borderRadius: canvasRadius.md,
        border: `1px solid ${canvasTokens.stroke.secondary}`,
        background: canvasTokens.bg.editor,
        color: canvasTokens.text.primary,
        fontSize: 13,
        ...props.style,
      }}
    />
  )
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{
        padding: 8,
        borderRadius: canvasRadius.md,
        border: `1px solid ${canvasTokens.stroke.secondary}`,
        background: canvasTokens.bg.editor,
        color: canvasTokens.text.primary,
        fontSize: 13,
        ...props.style,
      }}
    />
  )
}

export function Select({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[]
  value?: string
  onChange?: (v: string) => void
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      style={{
        height: 28,
        borderRadius: canvasRadius.md,
        border: `1px solid ${canvasTokens.stroke.secondary}`,
        background: canvasTokens.bg.editor,
        color: canvasTokens.text.primary,
        fontSize: 13,
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

export function IconButton({
  children,
  onClick,
  title,
}: {
  children?: ReactNode
  onClick?: () => void
  title?: string
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{
        width: 24,
        height: 24,
        borderRadius: canvasRadius.sm,
        border: 'none',
        background: 'transparent',
        color: canvasTokens.text.secondary,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

export type CheckboxProps = {
  checked?: boolean
  onChange?: (v: boolean) => void
  label?: ReactNode
}
export type ToggleProps = {
  checked?: boolean
  onChange?: (v: boolean) => void
}
export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>
export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>
export type SelectOption = { label: string; value: string }
export type SelectProps = {
  options: SelectOption[]
  value?: string
  onChange?: (v: string) => void
}
export type IconButtonProps = {
  children?: ReactNode
  onClick?: () => void
  title?: string
}

export type DAGLayoutNode = { id: string; label?: string; rank?: number }
export type DAGLayoutEdge = { from: string; to: string }
export type DAGLayoutRank = { rank: number; nodes: string[] }
export type DAGLayoutOptions = { nodeWidth?: number; nodeHeight?: number; rankGap?: number; nodeGap?: number }
export type DAGLayoutResult = {
  nodes: Array<{ id: string; x: number; y: number }>
  edges: DAGLayoutEdge[]
  width: number
  height: number
}

export function computeDAGLayout(
  nodes: DAGLayoutNode[],
  edges: DAGLayoutEdge[],
  options: DAGLayoutOptions = {}
): DAGLayoutResult {
  const nodeWidth = options.nodeWidth ?? 120
  const nodeHeight = options.nodeHeight ?? 40
  const rankGap = options.rankGap ?? 48
  const nodeGap = options.nodeGap ?? 24
  const ranks = new Map<number, DAGLayoutNode[]>()
  nodes.forEach((n, i) => {
    const r = n.rank ?? i
    const list = ranks.get(r) ?? []
    list.push(n)
    ranks.set(r, list)
  })
  const placed: Array<{ id: string; x: number; y: number }> = []
  let maxW = 0
  let y = 0
  Array.from(ranks.entries())
    .sort((a, b) => a[0] - b[0])
    .forEach(([, list]) => {
      let x = 0
      list.forEach((n: DAGLayoutNode) => {
        placed.push({ id: n.id, x, y })
        x += nodeWidth + nodeGap
      })
      maxW = Math.max(maxW, x)
      y += nodeHeight + rankGap
    })
  return { nodes: placed, edges, width: maxW, height: y }
}
