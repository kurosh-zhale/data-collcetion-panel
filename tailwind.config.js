/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    screens: {
      mobile: { min: "320px", max: "425px" },
      laptop: { min: "1344px", max: "1632px" },
      desktop: { min: "1920px", max: "3264px" },
    },
  },
  plugins: [],
};
