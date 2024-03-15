const appNames = require('./appNames');

/** @type {import('tailwindcss').Config} */

let primary = '#0065D3';
let secondary = '#4DA1FF';
if(process.env.CURRENT_APP){
  if(process.env.CURRENT_APP==appNames.getGreenGold){
    primary = '#083C2F';
    secondary = '#B29E66';
  }
}
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noah', 'sans-serif']
      },
      gridTemplateColumns: {
        '1-2': '1fr 2fr',
      },
      colors: {
        primary:primary,
        secondary: secondary,
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
