/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@sd/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: ["postcss.config.mjs"],
};
