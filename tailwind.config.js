/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    screens: {
      mobile: { min: "320px", max: "425px" },
      laptop: { min: "8in", max: "15in" },
      desktop: { min: "17in", max: "30in" },
    },
  },
  plugins: [],
};
