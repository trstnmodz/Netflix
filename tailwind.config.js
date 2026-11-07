/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#e50914',
          hover: '#f6121d',
          dim: '#b00710',
        },
        ink: {
          900: '#0b0b0f',
          800: '#131318',
          700: '#1a1a22',
          600: '#25252f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(0,0,0,0.65)',
        glow: '0 0 30px rgba(229,9,20,0.35)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 300ms ease-out',
        scaleIn: 'scaleIn 220ms ease-out',
      },
    },
  },
  plugins: [],
}
