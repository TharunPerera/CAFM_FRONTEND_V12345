// module.exports = {
//   plugins: ["import"],
//   rules: {
//     "import/no-unresolved": "error", // catch invalid paths
//     "import/extensions": ["error", "always", { js: "never", jsx: "never" }], // force consistent extensions
//   },
//   settings: {
//     "import/resolver": {
//       node: {
//         extensions: [".js", ".jsx"],
//       },
//     },
//   },
// };

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "@eslint-react/eslint-plugin",
    "@eslint-react/eslint-plugin/jsx",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "build"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "off",
    "react-hooks/exhaustive-deps": "off",
    "no-unused-vars": "off",
    "no-useless-catch": "off",
  },
};
