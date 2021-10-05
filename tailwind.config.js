module.exports = {
  purge: [
    "./src/index.js",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bordo: {
          extralight: "#ed246b",
          light: "#952A50",
        },
        gray: {
          lightback: "#f6fbfe",
        },
      },
      fontFamily: {
          custom: ["Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
