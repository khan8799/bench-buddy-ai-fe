/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          600: '#1e3a5f',
          700: '#1a2f47',
          800: '#132338',
          900: '#0d1b2e',
        },
        brand: {
          blue: '#2563eb',
        },
        surface: {
          bg: '#f0f2f5',
          card: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
