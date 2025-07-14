// eslint.config.js (Flat Config)
import js from '@eslint/js';
import globals from 'globals';
import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Base JS config
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
    },
    ...js.configs.recommended,
  },

  // TypeScript config
  {
    files: ['**/*.{ts,mts,cts}'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': plugin,
    },
    rules: {
      ...plugin.configs.recommended.rules,
    },
  },
]);
