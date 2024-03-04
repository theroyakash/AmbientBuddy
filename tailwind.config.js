/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sign': ['signifier', ...defaultTheme.fontFamily.sans],
        'garamond': ['AppleGaramond', 'serif'],
      },
    },
  },
  plugins: [],
}
