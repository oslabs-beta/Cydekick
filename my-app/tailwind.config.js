/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: true,
  theme: {
    extend: {
      colors:{
        secondary: "#14161d",
        primary: "#1DF28F",
        secondaryPrimary: "#048C7F",
        secondaryPrimaryDark: "#037066"
      },
      backgroundImage: {
        'logo': "url('/logo.png')",
      },
    },
  },
  plugins: [],
};
