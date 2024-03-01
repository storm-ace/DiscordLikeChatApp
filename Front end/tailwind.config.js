const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        'discord-dark': '#1e2124',
        'discord-dark-lighter': '#282b30',
        'discord-blue': '#7289da',
        'discord-blue-dark': '#677BC4',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}