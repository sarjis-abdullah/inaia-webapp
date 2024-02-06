/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
