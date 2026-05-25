import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './hooks/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        choc: {
          900: '#1A0800',
          800: '#3D1A00',
          700: '#6B2F0A',
          500: '#8B4513',
          300: '#C4855A'
        },
        pink: {
          900: '#7D2B4A',
          700: '#C45B7E',
          500: '#E8819D',
          300: '#F2A8C0',
          100: '#FBEAF2'
        },
        gold: {
          700: '#8B6914',
          500: '#C9A84C',
          300: '#E8CC7A',
          100: '#FAF3DC'
        },
        cream: '#FDF6EE',
        'cream-dark': '#F5E8D4'
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif']
      },
      boxShadow: {
        warm: '0 8px 32px rgba(139,69,19,0.12)'
      }
    }
  },
  plugins: []
};

export default config;
