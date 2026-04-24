/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "queen-navy": "#1B305B",
        "queen-gold": "#D4AF37",
        "queen-gold-light": "#F1D592",
      },
    },
  },
  plugins: [],
};
