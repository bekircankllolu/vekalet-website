/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        parchment: '#F3EDE3',
        sand: '#E8DECE',
        latte: '#D6C9B5',
        bark: '#A08060',
        stone: '#7A6855',
        ink: '#3D2E1E',
        muted: '#6B5D4F',
        sage: '#5A7A52',
        'sage-light': '#7A9A72',
        'sage-dark': '#3D5A38',
        emerald: '#2E5A28',
        'emerald-light': '#EBF3E8',
        gold: '#C8943A',
        'gold-light': '#FDF5E6',
        sky: '#E8F0F8',
        line: '#E2D9CE',
        'line-strong': '#C8BAA8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        soft: '0 2px 16px rgba(61, 46, 30, 0.08)',
        card: '0 4px 24px rgba(61, 46, 30, 0.10)',
        elevated: '0 8px 40px rgba(61, 46, 30, 0.14)',
        green: '0 8px 32px rgba(46, 90, 40, 0.22)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
