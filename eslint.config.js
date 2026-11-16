import eslint from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import vitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import nodePlugin from 'eslint-plugin-n';
import packageJson from 'eslint-plugin-package-json';
import yml from 'eslint-plugin-yml';
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
    comments.recommended,
  ].map((entry) => ({ ...entry, files: entry.files ?? JS_TS_FILES })),
  {
    files: JS_TS_FILES,
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    plugins: {
      'import-x': importX,
      n: nodePlugin,
    },
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
      '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
      '@eslint-community/eslint-comments/require-description': [
        'error',
        { ignore: ['eslint-enable'] },
      ],
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-mutable-exports': 'error',
      'import-x/no-self-import': 'error',
      'n/no-deprecated-api': 'error',
      'n/no-process-exit': 'error',
      'n/prefer-node-protocol': 'error',
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
    ignores: ['**/package.json', '**/package-lock.json', '**/pnpm-lock.yaml', ...JSONC_FILES],
    plugins: { json },
    language: 'json/json',
    rules: {
      ...json.configs.recommended.rules,
    },
  },
  packageJson.configs.recommended,
  {
    files: JSONC_FILES,
    ignores: ['**/package-lock.json', '**/pnpm-lock.yaml'],
    plugins: { json },
    language: 'json/jsonc',
    languageOptions: {
      allowTrailingCommas: true,
    },
    rules: {
      ...json.configs.recommended.rules,
    },
  },
  ...[...yml.configs['flat/standard'], ...yml.configs['flat/prettier']].map((entry) => ({
    ...entry,
    files: entry.files ?? ['**/*.{yml,yaml}'],
    ignores: ['**/pnpm-lock.yaml'],
  })),
  {
    files: ['**/*.{yml,yaml}'],
    ignores: ['**/pnpm-lock.yaml'],
    rules: {
      'yml/no-empty-mapping-value': 'off',
      'yml/plain-scalar': 'off',
    },
  },
  {
    files: ['**/*.md'],
    ignores: ['**/CHANGELOG.md'],
    plugins: { markdown },
    processor: 'markdown/markdown',
  },
  {
    files: ['**/*.md/**'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'eol-last': 'off',
      'no-console': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'padded-blocks': 'off',
      strict: 'off',
      'unicode-bom': 'off',
    },
  },
  eslintConfigPrettier,
);
