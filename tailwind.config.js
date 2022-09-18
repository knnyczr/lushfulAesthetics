/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Playfair Display", "serif"],
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    extend: {
      colors: {
        "main-green": "#BABAA0",
        "main-green-shade": "#434232",
        "main-green-light": "#BAB9A0",
        "second-gold": "#EAC096",
      },
      aspectRatio: {
        "3/4": "3 / 4",
      },
      spacing: {
        128: "28rem",
        136: "36rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
