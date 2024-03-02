/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["index.html"],
  theme: {
    extend: {
      fontFamily: {
        'sign': ['signifier', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
