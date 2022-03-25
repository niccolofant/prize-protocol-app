module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ['Gilroy', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tailwind-scrollbar-hide')],
}
