/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wellness: {
          50: '#f2f8f5',
          100: '#e1efe7',
          200: '#c5e0d2',
          300: '#9ecab5',
          400: '#73b093',
          500: '#529676',
          600: '#3f785e',
          700: '#34604d',
          800: '#2b4d3f',
          900: '#244035',
        }
      }
    },
  },
  plugins: [],
}
