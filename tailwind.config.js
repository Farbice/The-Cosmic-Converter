/** @type {import('tailwindcss').Config} */
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
  },
  plugins: [],
}

