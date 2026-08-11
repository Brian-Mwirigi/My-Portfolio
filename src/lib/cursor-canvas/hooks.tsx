'use client'

import { useCallback, useState } from 'react'
import {
  canvasPaletteDark,
  canvasTokens,
  type CanvasPalette,
  type CanvasTokens,
} from './tokens'

export interface CanvasHostTheme extends CanvasTokens {
  readonly kind: string
  readonly tokens: CanvasTokens
  readonly palette: CanvasPalette
}

export function useHostTheme(): CanvasHostTheme {
  return {
    kind: 'dark',
    ...canvasTokens,
    tokens: canvasTokens,
    palette: canvasPaletteDark,
  }
}

export type SetCanvasState<T> = (action: T | ((prev: T) => T)) => void

export function useCanvasState<T>(key: string, defaultValue: T): [T, SetCanvasState<T>] {
  const storageKey = `canvas-state:${key}`
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (raw == null) return defaultValue
      return JSON.parse(raw) as T
    } catch {
      return defaultValue
    }
  })

  const setPersisted = useCallback<SetCanvasState<T>>(
    (action) => {
      setValue((prev) => {
        const next =
          typeof action === 'function' ? (action as (p: T) => T)(prev) : action
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next))
        } catch {
          /* ignore */
        }
        return next
      })
    },
    [storageKey]
  )

  return [value, setPersisted]
}

export type CanvasAction =
  | { type: 'openAgent'; agentId: string }
  | { type: 'newComposerChat'; userPrompt?: string }
  | {
      type: 'openFile'
      path: string
      selection?: { startLineNumber?: number; endLineNumber?: number }
    }

export function useCanvasAction(): (action: CanvasAction) => void {
  return useCallback((action: CanvasAction) => {
    if (typeof window === 'undefined') return
    if (action.type === 'openFile') {
      console.info('[canvas] openFile', action.path)
    }
  }, [])
}
