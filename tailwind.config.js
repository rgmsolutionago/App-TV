/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "brand-gray": "#E9ECF3",
        "brand-gray-100": "#BBBBBB",
        "brand-blue": "#224E99",
        "brand-blue-100": "#0059B1",
        "brand-light-blue": "#F0F7FF",
        "brand-white": "#F8F8F8",
        "brand-green": "#A0C51E",
        "brand-red": "#F24A46",
        "brand-red-100": "#DE2B4C",
        "brand-orange": "#DE812B",
        "brand-purple": "#A52BDE",
        "brand-yellow": "#E8CB33",
        "brand-yellow2": "#F68822",
        "brand-pink": "#FF3376",
        "brand-purple-200": "#613990",
        "brand-lightpink": "#F87294",
        "brand-purple-100": "#6638B2",
        "brand-green-100": "#79A02B",
        "brand-lightgreen": "#99CC33",

        "brand-gray": "#E9ECF3",
        "brand-gray-100": "#BBBBBB",
        "brand-blue": "#224E99",
        "brand-blue-100": "#00274E",
        "brand-light-blue": "#F0F7FF",
        "brand-white": "#F8F8F8",
      },
      fontFamily: {
       
        Roboto: ["Roboto "],
        quicksand: ["Quicksand"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
