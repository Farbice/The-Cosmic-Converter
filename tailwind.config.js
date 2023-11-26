/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   'font-karla-extra-light': 'var(--karla-extra-Light)',
      //   'font-karla-light' : 'var(--karla-Light)',
      //   'font-karla-medium' : 'var(--karla-medium)',
      //   'font-karla-regular' : 'var(--karla-regular)',
      //   'font-karla-semi-bold' : 'var(--karla-semi-bold)'
      // },
      backgroundColor: {
        'regal-blue': '#0D1A2B',
        'input-focus-blue': '#142741'
      },

    },
  },
  plugins: [],
}

