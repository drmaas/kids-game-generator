import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import header from "eslint-plugin-header";
import type { Linter } from "eslint";

header.rules.header.meta.schema = false;

export default [
  js.configs.recommended,
  {
    ignores: ['config/header.js'],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      header,
    },
    rules: {
      "no-console": [0],
      'react-hooks/rules-of-hooks': reactHooks.configs.recommended.rules['react-hooks/rules-of-hooks'],
      'react-hooks/exhaustive-deps': reactHooks.configs.recommended.rules['react-hooks/exhaustive-deps'],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'header/header': [2, 'config/header.js'],
    },
  },
] satisfies Linter.Config[];
