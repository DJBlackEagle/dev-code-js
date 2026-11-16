import eslint from '@eslint/js';
import json from '@eslint/json';
import vitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const JS_TS_FILES = ['**/*.{js,mjs,cjs,ts,mts,cts}'];
const JSONC_FILES = [
  '**/*.jsonc',
  '**/tsconfig*.json',
  '**/.vscode/*.json',
  '**/.devcontainer/*.json',
  '**/.markdownlint-cli2.jsonc',
];

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '*.d.ts', '.tmp/**'],
  },
  ...[
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    jsdoc.configs['flat/recommended-typescript'],
  ].map((entry) => ({ ...entry, files: entry.files ?? JS_TS_FILES })),
  {
    files: JS_TS_FILES,
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2023,
      },
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-console': 'error',
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-yields': 'off',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts', 'tests/**/*.{ts,js}'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ['**/*.json'],
    ignores: ['**/package-lock.json', '**/pnpm-lock.yaml', ...JSONC_FILES],
    plugins: { json },
    language: 'json/json',
    rules: {
      ...json.configs.recommended.rules,
    },
  },
  {
    files: JSONC_FILES,
    ignores: ['**/package-lock.json', '**/pnpm-lock.yaml'],
    plugins: { json },
    language: 'json/jsonc',
    rules: {
      ...json.configs.recommended.rules,
    },
  },
  eslintConfigPrettier,
);
