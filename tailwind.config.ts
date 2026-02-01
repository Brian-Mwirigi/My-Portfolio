import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core palette - space void
        void: '#0a0a0f',
        cosmos: '#12121a',
        nebula: '#1a1a2e',
        
        // Cyan from sci-fi displays
        cyan: {
          DEFAULT: '#06b6d4',
          light: '#22d3ee',
          glow: '#67e8f9',
        },
        // Amber from battery glow
        amber: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          glow: '#fcd34d',
        },
        // Astronaut suit
        suit: {
          white: '#f5f5f4',
          blue: '#3b82f6',
        },
        
        // Light mode surfaces
        surface: {
          DEFAULT: '#fafafa',
          secondary: '#f5f5f5',
          tertiary: '#ebebeb',
        },
        text: {
          primary: '#0a0a0f',
          secondary: '#52525b',
          muted: '#a1a1aa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
        'drift': 'drift 15s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(0, -15px)' },
        },
      },
      backgroundImage: {
        'grid-cyan': 'linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
