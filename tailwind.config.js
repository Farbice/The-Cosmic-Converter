/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'regal-blue': '#0D1A2B',
        'input-focus-blue': '#142741'
      }

    },
    screens: {
      'xxs' : '440px',
      'xs' : '540px',
      ...defaultTheme.screens,
    }
  },
  plugins: [],
}

