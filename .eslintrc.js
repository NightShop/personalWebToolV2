module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
  ],
  rules: {
    quotes: ["error", "double"],
    indent: ["off"],
    "react/jsx-indent": ["off"],
    "react/react-in-jsx-scope": ["off"],
    "no-console": ["off"],
    "react/jsx-filename-extension": "off",
  },
};