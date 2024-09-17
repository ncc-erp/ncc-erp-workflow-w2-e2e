const typescript = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const playwright = require("eslint-plugin-playwright");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const { configs: typescriptConfigs } = typescript;

module.exports = [
  eslintPluginPrettierRecommended,
  {
    files: ["pageObjects/**/*.ts", "tests/**/*.ts", "steps/**/*.ts", "utils/**/*.ts", "data/**/*.ts"],
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
      "playwright/expect-expect": "off",
    },
  },
];
