import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier/recommended";

export default [
  pluginJs.configs.recommended, // Base ESLint recommended rules
  ...tseslint.configs.recommended, // TypeScript recommended rules
  prettierPlugin,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser for TypeScript files
      ecmaVersion: 2021, // ECMAScript version
      sourceType: "module", // Use ES modules
      globals: globals.browser, // Global variables for the browser environment
    },
    rules: {
      // Custom rules
      "prettier/prettier": "error", // Enforce Prettier formatting
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ], // Warn on unused variables, ignoring those prefixed with '_'
      "@typescript-eslint/no-explicit-any": "off", // Allow usage of 'any'
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ], // Warn on missing return types with exceptions
      "no-console": "warn", // Warn on console statements
      "no-debugger": "error", // Disallow debugger statements
      "consistent-return": "error", // Enforce consistent return statements
      "curly": "error", // Enforce curly braces for all control statements
      "eqeqeq": ["error", "always"], // Enforce strict equality (===)
      "no-var": "error", // Disallow var, prefer let/const
      "prefer-const": "error", // Prefer const over let when possible
    },
  },
  {
    files: ["*.ts", "*.tsx"], // Specific rules for TypeScript files
  },
];
