/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,css}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'lab-bg': 'rgb(var(--lab-bg) / <alpha-value>)',
        'lab-text': 'rgb(var(--lab-text) / <alpha-value>)',
        'lab-muted': 'rgb(var(--lab-muted) / <alpha-value>)',
        'lab-primary': 'rgb(var(--lab-primary) / <alpha-value>)',
        'lab-secondary': 'rgb(var(--lab-secondary) / <alpha-value>)',
        'lab-tertiary': 'rgb(var(--lab-tertiary) / <alpha-value>)',
        'lab-accent': 'rgb(var(--lab-secondary) / <alpha-value>)',
        'lab-accent2': 'rgb(var(--lab-tertiary) / <alpha-value>)',
        'lab-accent3': 'rgb(var(--lab-primary) / <alpha-value>)',
        'lab-panel': 'rgb(var(--lab-panel) / <alpha-value>)',
        'lab-panelBorder': 'rgb(var(--lab-panel-border) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 15s infinite alternate',
        'blob-reverse': 'blob-reverse 20s infinite alternate-reverse',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '100%': { transform: 'translate(40px, 30px) scale(1.15)' },
        },
        'blob-reverse': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '100%': { transform: 'translate(-40px, -30px) scale(1.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
};
