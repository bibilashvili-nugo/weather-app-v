import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";

export default {
  ignorePatterns: ["dist"],
  overrides: [
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
          ecmaVersion: "latest",
          ecmaFeatures: { jsx: true },
          sourceType: "module",
        },
      },
      settings: {
        react: { version: "18.3" },
        "import/resolver": {
          node: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
          },
        },
      },
      plugins: {
        react,
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
        import: importPlugin,
      },
      rules: {
        ...js.configs.recommended.rules,
        ...react.configs.recommended.rules,
        ...react.configs["jsx-runtime"].rules,
        ...reactHooks.configs.recommended.rules,
        "react/jsx-no-target-blank": "off",
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
        "import/no-unresolved": "error",
        "import/extensions": [
          "error",
          "ignorePackages",
          {
            js: "never",
            jsx: "never",
            ts: "never",
            tsx: "never",
          },
        ],
      },
    },
  ],
};
