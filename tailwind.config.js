/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["DM Serif Display", "serif"],
    },
    extend: {
      colors: {
        "main-green": "#848260",
      },
    },
  },
  plugins: [],
};
