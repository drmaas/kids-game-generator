// Kids Game Generator
// Copyright (C) 2025 Daniel Maas
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import header from "eslint-plugin-header";
import tseslint from "typescript-eslint";
import { Linter } from "eslint";

header.rules.header.meta.schema = false;

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
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
