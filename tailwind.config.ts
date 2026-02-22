import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B1220',
        surface: '#111827',
        primary: '#4F46E5',
        'accent-pink': '#F05A6E',
        'accent-purple': '#6D28D9',
        success: '#22C55E',
        text: '#E5E7EB',
        muted: '#9CA3AF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1120px',
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        'hover-lift': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
export default config
