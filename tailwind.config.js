module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'prize-blue': '#0EB1FE',
        'prize-red': '#FE045B',
        'prize-purple': '#531C93',
        'prize-dark-gray': '#374151',
        'prize-light-gray': '#9ca3af',
      },
      fontFamily: {
        gilroy: ['Gilroy', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tailwind-scrollbar-hide')],
}
