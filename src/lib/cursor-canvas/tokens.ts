export const canvasPaletteDark = {
  foreground: '#E4E4E4EB',
  foregroundSecondary: '#E4E4E48D',
  foregroundTertiary: '#E4E4E45E',
  foregroundQuaternary: '#E4E4E442',
  editor: '#181818',
  chrome: '#141414',
  sidebar: '#141414',
  elevated: '#181818',
  fillPrimary: '#E4E4E430',
  fillSecondary: '#E4E4E41E',
  fillTertiary: '#E4E4E411',
  fillQuaternary: '#E4E4E40A',
  strokePrimary: '#E4E4E433',
  strokeSecondary: '#E4E4E41F',
  strokeTertiary: '#E4E4E414',
  strokeFocused: '#E4E4E4',
  accent: '#599CE7',
  buttonBackground: '#599CE7',
  buttonForeground: '#191c22',
  buttonHoverBackground: '#6AABE9',
  link: '#87c3ff',
  diffInsertedLine: '#3FA26633',
  diffRemovedLine: '#B8004933',
  diffStripAdded: '#3FA2668F',
  diffStripRemoved: '#FC6B838F',
} as const

export const canvasPaletteLight = {
  foreground: '#141414F0',
  foregroundSecondary: '#141414BD',
  foregroundTertiary: '#1414148A',
  foregroundQuaternary: '#1414145C',
  editor: '#FCFCFC',
  chrome: '#F8F8F8',
  sidebar: '#F3F3F3',
  elevated: '#FCFCFC',
  fillPrimary: '#14141433',
  fillSecondary: '#14141424',
  fillTertiary: '#14141414',
  fillQuaternary: '#1414140F',
  strokePrimary: '#14141433',
  strokeSecondary: '#1414141F',
  strokeTertiary: '#14141414',
  strokeFocused: '#3685BF',
  accent: '#3685BF',
  buttonBackground: '#3685BF',
  buttonForeground: '#FCFCFC',
  buttonHoverBackground: '#2E76AB',
  link: '#3685BF',
  diffInsertedLine: '#1F8A651F',
  diffRemovedLine: '#CF2D5614',
  diffStripAdded: '#1F8A65CC',
  diffStripRemoved: '#CF2D56CC',
} as const

export type CanvasPalette = {
  readonly foreground: string
  readonly foregroundSecondary: string
  readonly foregroundTertiary: string
  readonly foregroundQuaternary: string
  readonly editor: string
  readonly chrome: string
  readonly sidebar: string
  readonly elevated: string
  readonly fillPrimary: string
  readonly fillSecondary: string
  readonly fillTertiary: string
  readonly fillQuaternary: string
  readonly strokePrimary: string
  readonly strokeSecondary: string
  readonly strokeTertiary: string
  readonly strokeFocused: string
  readonly accent: string
  readonly buttonBackground: string
  readonly buttonForeground: string
  readonly buttonHoverBackground: string
  readonly link: string
  readonly diffInsertedLine: string
  readonly diffRemovedLine: string
  readonly diffStripAdded: string
  readonly diffStripRemoved: string
}

export const categoryPaletteDark = {
  gray: '#E4E4E48A',
  purple: '#9386F2',
  green: '#3FA266',
  yellow: '#F1B467',
  cyan: '#81A1C1',
  pink: '#B48EAD',
  blue: '#7BAFE9',
  orange: '#DD7F76',
  red: '#FC6B83',
} as const

export const categoryPaletteLight = {
  gray: '#1414148A',
  purple: '#7754D9',
  green: '#1F8A65',
  yellow: '#C08532',
  cyan: '#4C7F8C',
  pink: '#B8448B',
  blue: '#3685BF',
  orange: '#D75C4E',
  red: '#CF2D56',
} as const

export type Color = keyof typeof categoryPaletteDark
export type CategoryPalette = Readonly<Record<Color, string>>

export const colorPalette = categoryPaletteDark
export const usageColorSequence = [
  'blue',
  'purple',
  'green',
  'yellow',
  'cyan',
  'pink',
  'orange',
  'red',
  'gray',
] as const satisfies readonly Color[]

export const chartColorSequence = [
  '#2E79B5E0',
  '#1F8A65E8',
  '#7B64B8F0',
  '#F0A040E0',
  '#C85898E0',
  '#5A6CC0F0',
  '#2A9A8AE0',
  '#C04848E0',
] as const

export interface CanvasTokens {
  bg: { editor: string; chrome: string; elevated: string }
  text: {
    primary: string
    secondary: string
    tertiary: string
    quaternary: string
    link: string
    onAccent: string
  }
  stroke: { primary: string; secondary: string; tertiary: string; focused: string }
  fill: { primary: string; secondary: string; tertiary: string; quaternary: string }
  accent: { primary: string; control: string; controlHover: string }
  diff: {
    insertedLine: string
    removedLine: string
    stripAdded: string
    stripRemoved: string
  }
  category: CategoryPalette
}

function tokensFromPalette(
  palette: CanvasPalette,
  category: CategoryPalette
): CanvasTokens {
  return {
    bg: {
      editor: palette.editor,
      chrome: palette.chrome,
      elevated: palette.elevated,
    },
    text: {
      primary: palette.foreground,
      secondary: palette.foregroundSecondary,
      tertiary: palette.foregroundTertiary,
      quaternary: palette.foregroundQuaternary,
      link: palette.link,
      onAccent: palette.buttonForeground,
    },
    stroke: {
      primary: palette.strokePrimary,
      secondary: palette.strokeSecondary,
      tertiary: palette.strokeTertiary,
      focused: palette.strokeFocused,
    },
    fill: {
      primary: palette.fillPrimary,
      secondary: palette.fillSecondary,
      tertiary: palette.fillTertiary,
      quaternary: palette.fillQuaternary,
    },
    accent: {
      primary: palette.accent,
      control: palette.buttonBackground,
      controlHover: palette.buttonHoverBackground,
    },
    diff: {
      insertedLine: palette.diffInsertedLine,
      removedLine: palette.diffRemovedLine,
      stripAdded: palette.diffStripAdded,
      stripRemoved: palette.diffStripRemoved,
    },
    category,
  }
}

export const canvasTokens = tokensFromPalette(canvasPaletteDark, categoryPaletteDark)
export const canvasTokensLight = tokensFromPalette(
  canvasPaletteLight,
  categoryPaletteLight
)

export const canvasTypography = {
  h1: { fontSize: '24px', lineHeight: '30px', fontWeight: 590 },
  h2: { fontSize: '18px', lineHeight: '24px', fontWeight: 590 },
  h3: { fontSize: '16px', lineHeight: '22px', fontWeight: 590 },
  body: { fontSize: '14px', lineHeight: '20px', fontWeight: 400 },
  small: { fontSize: '12px', lineHeight: '16px', fontWeight: 400 },
} as const

export const canvasSpacing = {
  '0.5': 2,
  '1': 4,
  '1.5': 6,
  '2': 8,
  '2.5': 10,
  '3': 12,
  '3.5': 14,
  '4': 16,
  '4.5': 18,
  '5': 20,
  '6': 24,
  '7': 28,
  '8': 32,
  '9': 36,
  '10': 40,
} as const

export const canvasRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999,
} as const

export const semanticTone = {
  success: categoryPaletteDark.green,
  danger: categoryPaletteDark.red,
  warning: categoryPaletteDark.yellow,
  info: categoryPaletteDark.blue,
  neutral: categoryPaletteDark.gray,
  deleted: categoryPaletteDark.red,
  added: categoryPaletteDark.green,
  renamed: categoryPaletteDark.purple,
} as const
