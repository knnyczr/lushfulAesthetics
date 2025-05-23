/** @type {import('tailwindcss').Config} */

const Nth = require("tailwind-nth-child");
const nth2 = new Nth("2", "2"); // Sub-elements that are multiples of 3

module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/components/blog/**/*.{js,jsx,ts,tsx}",
    "./src/components/BlogCards/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1536px",
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
      borderWidth: ["nth-child-2"],
      colors: {
        "main-green": "#BABAA0",
        "main-green-shade": "#434232",
        "main-green-light": "#BAB9A0",
        "second-gold": "#EAC096",
        "nyc-green": "#00933C",
        "nyc-red": "#EE352E",
        "nyc-purple": "#B933AD",
        "nyc-gray": "#808183",
        "nyc-yellow": "#FCCC0A",
      },
      width: {
        blogcard: `calc(90vw - 30px)`,
        "blogcard-sm": `calc(55vw)`,
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
  plugins: [require("tailwind-scrollbar-hide"), nth2.nthChild()],
};
