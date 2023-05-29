/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
       bungee: 'Bungee Shade'
      },
      backgroundImage:{
        card:'linear-gradient(to left, #fff6e8, #f5d9b2, #ebbc7e, #e09d4c, #d57e12)',
        cardNumber:"radial-gradient(circle, #3c2d23, #664225, #925825, #be6f20, #eb8812);"
      }
    },
  },
  plugins: [],
}