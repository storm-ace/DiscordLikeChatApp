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
        'discord-dark': '#36393F',
        'discord-dark-lighter': '#40444B',
        'discord-blue': '#7289DA',
        'discord-blue-dark': '#677BC4',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}