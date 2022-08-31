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
    extend: {
      colors: {
        "main-green": "#848260",
        "main-green-shade": "#434232",
      },
    },
  },
  plugins: [],
};
