import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import playwright from "eslint-plugin-playwright";
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const { configs: typescriptConfigs } = typescript;

export default [
  eslintPluginPrettierRecommended,
  {
    files: ["pageObjects/**/*.ts", "tests/**/*.ts", "utils/**/*.ts", "data/**/*.ts"],
    plugins: {
      "@typescript-eslint": typescript,
      playwright: playwright,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs["flat/recommended"].rules,
      "no-console": "warn",
    },
  },
];
