/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b93e90",
      },
      fontFamily: {
        'karla': ['Karla', 'sans-serif'],
      }
    },
  },
  plugins: [],
}