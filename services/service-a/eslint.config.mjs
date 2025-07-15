// eslint.config.js (Flat Config)
import js from '@eslint/js';
import globals from 'globals';
import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';

export default [
  // Base JS config for Node.js files
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
    },
    ...js.configs.recommended,
  },
  // TypeScript config for Node.js
  {
    files: ['**/*.{ts,mts,cts}'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': plugin,
    },
    rules: {
      ...plugin.configs.recommended.rules,
    },
  },
];