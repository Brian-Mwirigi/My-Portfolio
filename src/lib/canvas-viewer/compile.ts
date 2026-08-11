import React from 'react'
import { transform } from 'sucrase'
import * as CanvasSDK from '@/lib/cursor-canvas'

/** Pull named bindings from `import { … } from "cursor/canvas"`. */
function extractCanvasImports(source: string): {
  names: string[]
  body: string
} {
  const names = new Set<string>()
  let body = source

  body = body.replace(
    /import\s+type\s*\{[^}]*\}\s*from\s*['"]cursor\/canvas['"]\s*;?/g,
    ''
  )

  body = body.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"]cursor\/canvas['"]\s*;?/g,
    (_, spec: string) => {
      for (const part of spec.split(',')) {
        const bit = part.trim()
        if (!bit) continue
        const [orig, alias] = bit.split(/\s+as\s+/).map((s) => s.trim())
        names.add(alias || orig)
      }
      return ''
    }
  )

  body = body.replace(
    /import\s*\*\s*as\s+(\w+)\s*from\s*['"]cursor\/canvas['"]\s*;?/g,
    (_, ns: string) => {
      names.add(`*${ns}`)
      return `const ${ns} = __SDK__;\n`
    }
  )

  body = body.replace(/import\s*['"]cursor\/canvas['"]\s*;?/g, '')

  return { names: Array.from(names), body }
}

function rewriteExports(body: string): { code: string; defaultName: string } {
  let code = body
  let defaultName = '__CanvasDefault'

  const fnMatch = code.match(/export\s+default\s+function\s+(\w+)/)
  if (fnMatch) {
    defaultName = fnMatch[1]
    code = code.replace(/export\s+default\s+function\s+(\w+)/, 'function $1')
    return { code, defaultName }
  }

  if (/export\s+default\s+/.test(code)) {
    code = code.replace(/export\s+default\s+/, `const ${defaultName} = `)
    return { code, defaultName }
  }

  throw new Error(
    'Canvas must have a default export (export default function …).'
  )
}

export type CompileResult =
  | { ok: true; Component: React.ComponentType }
  | { ok: false; error: string }

export function compileCanvasSource(source: string): CompileResult {
  try {
    const trimmed = source.trim()
    if (!trimmed) {
      return { ok: false, error: 'Empty file.' }
    }

    const { names, body: withoutCanvasImport } = extractCanvasImports(trimmed)

    if (
      /(?:^|\n)\s*import\s+/m.test(withoutCanvasImport) ||
      /\brequire\s*\(/.test(withoutCanvasImport)
    ) {
      return {
        ok: false,
        error:
          'Only imports from "cursor/canvas" are allowed. Remove other imports and embed data inline.',
      }
    }

    const { code: exported, defaultName } = rewriteExports(withoutCanvasImport)

    const cleaned = exported
      .replace(/export\s+type\s+[^;]+;/g, '')
      .replace(/export\s+\{[^}]*\}\s*;?/g, '')
      .replace(/export\s+(const|let|var|function|class)\s+/g, '$1 ')

    const js = transform(cleaned, {
      transforms: ['typescript', 'jsx'],
      jsxRuntime: 'classic',
      production: true,
    }).code

    const bindingLines = names
      .filter((n) => !n.startsWith('*'))
      .map((n) => `const ${n} = __SDK__[${JSON.stringify(n)}];`)
      .join('\n')

    const factory = new Function(
      'React',
      '__SDK__',
      `"use strict";
${bindingLines}
${js}
if (typeof ${defaultName} === "undefined") {
  throw new Error("Default export not found after compile.");
}
return ${defaultName};`
    )

    const Component = factory(React, CanvasSDK) as React.ComponentType

    if (typeof Component !== 'function') {
      return { ok: false, error: 'Compiled default export is not a component.' }
    }

    return { ok: true, Component }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { ok: false, error: message }
  }
}
