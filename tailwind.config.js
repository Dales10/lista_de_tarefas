/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grey01': '#1A1A1A',
        'grey21': '#363636',
        'grey21_op80': '#363636cc',
        'grey31': '#4F4F4F',
        'darkGray': '#A9A9A9',
        'lightGrey': '#D3D3D3',
      }
    },
  },
  plugins: [],
}
