'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import {
  canvasRadius,
  canvasTokens,
  canvasTypography,
  semanticTone,
} from './tokens'

const t = canvasTokens

export function mergeStyle(
  base: CSSProperties,
  override?: CSSProperties
): CSSProperties {
  return { ...base, ...override }
}

export function Stack({
  children,
  gap = 0,
  style,
}: {
  children?: ReactNode
  gap?: number
  style?: CSSProperties
}) {
  return (
    <div
      style={mergeStyle(
        { display: 'flex', flexDirection: 'column', gap },
        style
      )}
    >
      {children}
    </div>
  )
}

export function Row({
  children,
  gap = 0,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  style,
}: {
  children?: ReactNode
  gap?: number
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'space-between'
  wrap?: boolean
  style?: CSSProperties
}) {
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  } as const
  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    'space-between': 'space-between',
  } as const

  return (
    <div
      style={mergeStyle(
        {
          display: 'flex',
          flexDirection: 'row',
          gap,
          alignItems: alignMap[align],
          justifyContent: justifyMap[justify],
          flexWrap: wrap ? 'wrap' : 'nowrap',
        },
        style
      )}
    >
      {children}
    </div>
  )
}

export function Grid({
  children,
  columns,
  gap = 0,
  align = 'stretch',
  style,
}: {
  children?: ReactNode
  columns: number | string
  gap?: number
  align?: 'start' | 'center' | 'end' | 'stretch'
  style?: CSSProperties
}) {
  const alignMap = {
    start: 'start',
    center: 'center',
    end: 'end',
    stretch: 'stretch',
  } as const
  const template =
    typeof columns === 'number' ? `repeat(${columns}, minmax(0, 1fr))` : columns

  return (
    <div
      style={mergeStyle(
        {
          display: 'grid',
          gridTemplateColumns: template,
          gap,
          alignItems: alignMap[align],
        },
        style
      )}
    >
      {children}
    </div>
  )
}

export function Divider({ style }: { style?: CSSProperties }) {
  return (
    <hr
      style={mergeStyle(
        {
          border: 'none',
          borderTop: `1px solid ${t.stroke.tertiary}`,
          margin: 0,
          width: '100%',
        },
        style
      )}
    />
  )
}

export function Spacer({
  height,
  width,
}: {
  height?: number
  width?: number
} = {}) {
  if (height != null || width != null) {
    return <div style={{ height: height ?? 0, width: width ?? 0, flexShrink: 0 }} />
  }
  return <div style={{ flex: 1, minWidth: 0 }} />
}

const TextNestContext = createContext(false)

export function Text({
  children,
  tone = 'primary',
  size = 'body',
  as,
  weight = 'normal',
  italic,
  truncate,
  style,
}: {
  children?: ReactNode
  tone?: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
  size?: 'body' | 'small'
  as?: 'p' | 'span'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  italic?: boolean
  truncate?: boolean | 'start' | 'end'
  style?: CSSProperties
}) {
  const nested = useContext(TextNestContext)
  const Tag = as ?? (nested ? 'span' : 'p')
  const weightMap = {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  } as const
  const toneMap = {
    primary: t.text.primary,
    secondary: t.text.secondary,
    tertiary: t.text.tertiary,
    quaternary: t.text.quaternary,
  } as const
  const typo = size === 'small' ? canvasTypography.small : canvasTypography.body

  const truncateStyle: CSSProperties =
    truncate === true || truncate === 'end'
      ? {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }
      : truncate === 'start'
        ? {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            direction: 'rtl',
            textAlign: 'left',
          }
        : {}

  return (
    <TextNestContext.Provider value={true}>
      <Tag
        style={mergeStyle(
          {
            margin: 0,
            color: toneMap[tone],
            fontSize: typo.fontSize,
            lineHeight: typo.lineHeight,
            fontWeight: weightMap[weight],
            fontStyle: italic ? 'italic' : undefined,
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            ...truncateStyle,
          },
          style
        )}
      >
        {children}
      </Tag>
    </TextNestContext.Provider>
  )
}

function Heading({
  as: Tag,
  children,
  style,
  typo,
}: {
  as: 'h1' | 'h2' | 'h3'
  children?: ReactNode
  style?: CSSProperties
  typo: { fontSize: string; lineHeight: string; fontWeight: number }
}) {
  return (
    <Tag
      style={mergeStyle(
        {
          margin: 0,
          color: t.text.primary,
          fontSize: typo.fontSize,
          lineHeight: typo.lineHeight,
          fontWeight: typo.fontWeight,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          letterSpacing: '-0.01em',
        },
        style
      )}
    >
      {children}
    </Tag>
  )
}

export function H1({
  children,
  style,
}: {
  children?: ReactNode
  style?: CSSProperties
}) {
  return (
    <Heading as="h1" typo={canvasTypography.h1} style={style}>
      {children}
    </Heading>
  )
}

export function H2({
  children,
  style,
}: {
  children?: ReactNode
  style?: CSSProperties
}) {
  return (
    <Heading as="h2" typo={canvasTypography.h2} style={style}>
      {children}
    </Heading>
  )
}

export function H3({
  children,
  style,
}: {
  children?: ReactNode
  style?: CSSProperties
}) {
  return (
    <Heading as="h3" typo={canvasTypography.h3} style={style}>
      {children}
    </Heading>
  )
}

export function Code({
  children,
  style,
}: {
  children?: ReactNode
  style?: CSSProperties
}) {
  return (
    <code
      style={mergeStyle(
        {
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          fontSize: '0.92em',
          background: t.fill.tertiary,
          color: t.text.primary,
          padding: '1px 5px',
          borderRadius: canvasRadius.sm,
        },
        style
      )}
    >
      {children}
    </code>
  )
}

export function Link({
  children,
  href,
  style,
}: {
  children?: ReactNode
  href: string
  style?: CSSProperties
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={mergeStyle(
        {
          color: t.text.link,
          textDecoration: 'none',
        },
        style
      )}
    >
      {children}
    </a>
  )
}

type CardCtx = {
  size: 'base' | 'lg'
  stickyHeader: boolean
  collapsible: boolean
  open: boolean
  toggle: () => void
}

const CardContext = createContext<CardCtx | null>(null)

export function CanvasChevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      style={{
        transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 120ms ease',
        flexShrink: 0,
      }}
    >
      <path
        d="M4 2.5L8 6L4 9.5"
        fill="none"
        stroke={t.text.secondary}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Card({
  children,
  variant = 'default',
  size = 'base',
  stickyHeader = false,
  collapsible = false,
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  style,
}: {
  children?: ReactNode
  variant?: 'default' | 'borderless'
  size?: 'base' | 'lg'
  stickyHeader?: boolean
  collapsible?: boolean
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  style?: CSSProperties
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen)
  const open = openProp ?? uncontrolled
  const toggle = () => {
    const next = !open
    if (openProp == null) setUncontrolled(next)
    onOpenChange?.(next)
  }

  const ctx = useMemo(
    () => ({ size, stickyHeader, collapsible, open, toggle }),
    [size, stickyHeader, collapsible, open]
  )

  return (
    <CardContext.Provider value={ctx}>
      <div
        style={mergeStyle(
          {
            background: variant === 'borderless' ? 'transparent' : t.bg.elevated,
            border:
              variant === 'borderless'
                ? 'none'
                : `1px solid ${t.stroke.tertiary}`,
            borderRadius: variant === 'borderless' ? 0 : canvasRadius.lg,
            overflow: 'hidden',
          },
          style
        )}
      >
        {children}
      </div>
    </CardContext.Provider>
  )
}

export function CardHeader({
  children,
  trailing,
  style,
}: {
  children?: ReactNode
  trailing?: ReactNode
  style?: CSSProperties
}) {
  const ctx = useContext(CardContext)
  const height = ctx?.size === 'lg' ? 32 : 28
  const content = (
    <div
      style={mergeStyle(
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          minHeight: height,
          padding: '0 12px',
          borderBottom: `1px solid ${t.stroke.tertiary}`,
          background: t.fill.quaternary,
          position: ctx?.stickyHeader ? 'sticky' : undefined,
          top: ctx?.stickyHeader ? 0 : undefined,
          zIndex: ctx?.stickyHeader ? 1 : undefined,
          cursor: ctx?.collapsible ? 'pointer' : undefined,
          userSelect: ctx?.collapsible ? 'none' : undefined,
        },
        style
      )}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          minWidth: 0,
        }}
      >
        {ctx?.collapsible ? <CanvasChevron expanded={ctx.open} /> : null}
        <span
          style={{
            fontSize: 12,
            lineHeight: '16px',
            fontWeight: 500,
            color: t.text.secondary,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {children}
        </span>
      </div>
      {trailing ? <div style={{ flexShrink: 0 }}>{trailing}</div> : null}
    </div>
  )

  if (ctx?.collapsible) {
    return (
      <button
        type="button"
        onClick={ctx.toggle}
        style={{
          display: 'block',
          width: '100%',
          padding: 0,
          margin: 0,
          border: 'none',
          background: 'transparent',
          textAlign: 'left',
        }}
      >
        {content}
      </button>
    )
  }

  return content
}

export function CardBody({
  children,
  style,
}: {
  children?: ReactNode
  style?: CSSProperties
}) {
  const ctx = useContext(CardContext)
  if (ctx?.collapsible && !ctx.open) return null
  return (
    <div style={mergeStyle({ padding: 12 }, style)}>{children}</div>
  )
}

export function Button({
  children,
  variant = 'secondary',
  disabled,
  type = 'button',
  style,
  onClick,
}: {
  children?: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: CSSProperties
  onClick?: () => void
}) {
  const variants: Record<string, CSSProperties> = {
    primary: {
      background: t.accent.control,
      color: t.text.onAccent,
      border: '1px solid transparent',
    },
    secondary: {
      background: t.fill.tertiary,
      color: t.text.primary,
      border: `1px solid ${t.stroke.secondary}`,
    },
    ghost: {
      background: 'transparent',
      color: t.text.secondary,
      border: '1px solid transparent',
    },
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={mergeStyle(
        {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 24,
          padding: '0 10px',
          borderRadius: canvasRadius.md,
          fontSize: 12,
          fontWeight: 500,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          ...variants[variant],
        },
        style
      )}
    >
      {children}
    </button>
  )
}

export function Pill({
  children,
  active,
  size = 'md',
  leadingContent,
  keyboardHint,
  disabled,
  title,
  style,
  onClick,
  tone: _tone,
}: {
  children?: ReactNode
  active?: boolean
  tone?: string
  size?: 'sm' | 'md'
  leadingContent?: ReactNode
  keyboardHint?: string
  disabled?: boolean
  title?: string
  style?: CSSProperties
  onClick?: () => void
}) {
  const sm = size === 'sm'
  const Tag = onClick ? 'button' : 'span'

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      title={title}
      disabled={disabled}
      onClick={onClick}
      style={mergeStyle(
        {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          height: sm ? 18 : 22,
          padding: sm ? '0 6px' : '0 8px',
          borderRadius: canvasRadius.full,
          fontSize: sm ? 11 : 12,
          lineHeight: 1,
          fontWeight: 500,
          color: active ? t.text.primary : t.text.secondary,
          background: active ? t.fill.primary : 'transparent',
          border: sm
            ? 'none'
            : `1px solid ${active ? t.stroke.secondary : t.stroke.tertiary}`,
          cursor: onClick && !disabled ? 'pointer' : 'default',
          opacity: disabled ? 0.5 : 1,
          whiteSpace: 'nowrap',
        },
        style
      )}
    >
      {leadingContent}
      {children}
      {keyboardHint ? (
        <span style={{ color: t.text.tertiary, fontSize: 10 }}>
          {keyboardHint}
        </span>
      ) : null}
    </Tag>
  )
}

export function Stat({
  value,
  label,
  tone,
  style,
}: {
  value: ReactNode
  label: string
  tone?: 'success' | 'danger' | 'warning' | 'info'
  style?: CSSProperties
}) {
  return (
    <div style={mergeStyle({ minWidth: 0 }, style)}>
      <div
        style={{
          fontSize: 22,
          lineHeight: '28px',
          fontWeight: 590,
          color: tone ? semanticTone[tone] : t.text.primary,
          letterSpacing: '-0.02em',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 2,
          fontSize: 12,
          lineHeight: '16px',
          color: t.text.secondary,
        }}
      >
        {label}
      </div>
    </div>
  )
}

function CalloutIcon({ tone }: { tone: string }) {
  const color =
    tone === 'success'
      ? semanticTone.success
      : tone === 'warning'
        ? semanticTone.warning
        : tone === 'danger'
          ? semanticTone.danger
          : t.accent.primary
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
      <circle cx="7" cy="7" r="6" fill="none" stroke={color} strokeWidth="1.4" />
      <circle cx="7" cy="4.2" r="0.9" fill={color} />
      <rect x="6.3" y="6" width="1.4" height="4.2" rx="0.7" fill={color} />
    </svg>
  )
}

export function Callout({
  children,
  tone = 'info',
  title,
  icon,
  style,
}: {
  children?: ReactNode
  tone?: 'info' | 'success' | 'warning' | 'danger' | 'neutral'
  title?: ReactNode
  icon?: ReactNode
  style?: CSSProperties
}) {
  const accent =
    tone === 'success'
      ? semanticTone.success
      : tone === 'warning'
        ? semanticTone.warning
        : tone === 'danger'
          ? semanticTone.danger
          : tone === 'neutral'
            ? t.stroke.primary
            : t.accent.primary

  return (
    <div
      style={mergeStyle(
        {
          display: 'flex',
          gap: 10,
          padding: '10px 12px',
          borderRadius: canvasRadius.lg,
          background: t.fill.tertiary,
          border: `1px solid ${t.stroke.tertiary}`,
          borderLeft: `3px solid ${accent}`,
        },
        style
      )}
    >
      <div style={{ paddingTop: 2 }}>{icon ?? <CalloutIcon tone={tone} />}</div>
      <div style={{ minWidth: 0, flex: 1 }}>
        {title ? (
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: t.text.primary,
              marginBottom: 4,
            }}
          >
            {title}
          </div>
        ) : null}
        <div
          style={{
            fontSize: 13,
            lineHeight: '18px',
            color: t.text.secondary,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

const rowToneDot: Record<string, string> = {
  success: semanticTone.success,
  danger: semanticTone.danger,
  warning: semanticTone.warning,
  info: semanticTone.info,
  neutral: semanticTone.neutral,
}

export function Table({
  headers,
  rows,
  columnAlign,
  rowTone,
  framed = true,
  striped = false,
  stickyHeader = false,
  style,
  emptyMessage = 'No data',
}: {
  headers: ReactNode[]
  rows: ReactNode[][]
  columnAlign?: Array<'left' | 'center' | 'right' | undefined>
  rowTone?: Array<'success' | 'danger' | 'warning' | 'info' | 'neutral' | undefined>
  framed?: boolean
  striped?: boolean
  stickyHeader?: boolean
  style?: CSSProperties
  emptyMessage?: ReactNode
}) {
  const colCount = headers.length

  return (
    <div
      style={mergeStyle(
        {
          overflow: 'auto',
          border: framed ? `1px solid ${t.stroke.tertiary}` : 'none',
          borderRadius: framed ? canvasRadius.lg : 0,
        },
        style
      )}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 13,
          lineHeight: '18px',
        }}
      >
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  textAlign: columnAlign?.[i] ?? 'left',
                  padding: '8px 12px',
                  color: t.text.tertiary,
                  fontWeight: 500,
                  fontSize: 12,
                  borderBottom: `1px solid ${t.stroke.tertiary}`,
                  background: t.fill.quaternary,
                  position: stickyHeader ? 'sticky' : undefined,
                  top: stickyHeader ? 0 : undefined,
                  whiteSpace: 'nowrap',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={colCount}
                style={{
                  padding: 16,
                  color: t.text.tertiary,
                  textAlign: 'center',
                }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, ri) => {
              const cells = [...row]
              while (cells.length < colCount) cells.push(null)
              const tone = rowTone?.[ri]
              return (
                <tr
                  key={ri}
                  style={{
                    background:
                      striped && ri % 2 === 1 ? t.fill.quaternary : undefined,
                  }}
                >
                  {cells.slice(0, colCount).map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: '8px 12px',
                        color: t.text.primary,
                        textAlign: columnAlign?.[ci] ?? 'left',
                        borderBottom: `1px solid ${t.stroke.tertiary}`,
                        verticalAlign: 'top',
                      }}
                    >
                      {ci === 0 && tone ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'flex-start',
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: 999,
                              background: rowToneDot[tone],
                              marginTop: 6,
                              flexShrink: 0,
                            }}
                          />
                          <span>{cell}</span>
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
