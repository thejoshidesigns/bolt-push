/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#F7F8FA',
          surface: '#FFFFFF',
          text: '#111318',
          secondary: '#667085',
          border: '#E5E7EB',
          accent: '#087FE7',
          success: '#15803D',
          warning: '#B45309',
          error: '#DC2626',
        },
        brand: {
          black: '#F7F8FA',
          dark: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E5E7EB',
          gold: '#087FE7',
          'gold-light': '#3B9BF1',
          'gold-dark': '#0668C2',
          'gold-muted': 'rgba(8,127,231,0.10)',
          cream: '#111318',
          'cream-muted': '#3D4452',
          'cream-dim': '#667085',
          silver: '#9CA3AF',
          success: '#15803D',
          warning: '#B45309',
          error: '#DC2626',
        },
        cpp: {
          openart: '#7c3aed',
          dreamina: '#0ea5e9',
          thankyou: '#10b981',
          rundiffusion: '#f59e0b',
        },
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.05em',
        widest3: '0.08em',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      borderRadius: {
        '16': '16px',
        '18': '18px',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
