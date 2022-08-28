/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "800px",
      lg: "1024px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["DM Serif Display", "serif"],
    },
    extend: {
      colors: {
        "main-green": "#848260",
        "main-green-shade": "#434232",
      },
    },
  },
  plugins: [],
};
