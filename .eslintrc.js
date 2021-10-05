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
    "react/jsx-filename-extension": "off",
    "arrow-body-style": 1,
    "react/prop-types": 0,
    "max-len": [2, { code: 150 }],
    "jsx-a11y/label-has-associated-control": [2, { assert: "either" }],
    "object-curly-newline": ["error", {
      ObjectPattern: { multiline: true },
    }],
    "react/jsx-indent-props": [2, 4],
  },
};
