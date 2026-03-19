/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Agregamos las tres familias tipográficas
      fontFamily: {
        garamond: ['"Cormorant Garamond"', 'serif'],
        marcellus: ['Marcellus', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      scale: {
        '102': '1.02', 
        '103': '1.03', 
      },
    },
  },
  plugins: [],
};