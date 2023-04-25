/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        myBreakPoint: '1380px',
      },
    },
  },
  plugins: [],
}
