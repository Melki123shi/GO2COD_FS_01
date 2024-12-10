/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {

  content: [
    './index.html',
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],

  theme: {

    extend: {
      screens: {
        'sm-auth': '650px',
        '2-cols': '800px', 
        '3-cols': '1100px',
      },
    },

  },

  plugins: [
    flowbite.plugin(),
  ],

}
