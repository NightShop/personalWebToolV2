module.exports = {
  purge: [
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bordo: {
          extralight: "#ed246b",
          light: "#952A50",
          dark: "#611b34",
        },
        gray: {
          lightback: "#f6fbfe",
        },
        rink: {
          light: "#fd4367",
          dark: "#c22140",
        },
      },
      fontFamily: {
          custom: ["Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      right: {
        "9/10": "90%",
        "1/10": "10%",
      },
      height: {
        "1/50": "2%",
      },
      letterSpacing: {
        widestest: "0.5em",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
