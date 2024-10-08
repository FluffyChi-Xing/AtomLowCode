/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // darkMode: false,
  theme: {
    extend: {
      colors: {
        'border': '#e5e5e5',
        'theme': '#EA4F4F',
        'darkTheme': '#6c4e4e',
        'white': '#ffffff',
        'backgroundGray': '#F6F6F7',
        'canvas': '#F0F0F0'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

