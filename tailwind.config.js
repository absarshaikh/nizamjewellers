/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        navy: '#0A192F',
        navyLight: '#112240',
        gold: '#D4AF37',
        textPrimary: '#E6F1FF',
        textSecondary: '#8892B0',
        accentBlue: '#1F6FEB'
      }
    },
  },
  plugins: [],
}