/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@xstory/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: ["postcss.config.mjs"],
};
