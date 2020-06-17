module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    "es6": true,
    "node": true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"]
}