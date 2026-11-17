import eslint from '@eslint/js';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import importX from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import nodePlugin from 'eslint-plugin-n';
import globals from 'globals';
import tseslint, { type ConfigArray } from 'typescript-eslint';

interface ProjectServiceOptions {
  allowDefaultProject?: string[];
  defaultProject?: string;
}

interface BaseConfigOptions {
  project?: string | string[] | boolean;
  projectService?: boolean | ProjectServiceOptions;
  tsconfigRootDir?: string;
  ignores?: string[];
}

interface ParserOptions {
  [key: string]: unknown;
  project?: string | string[] | boolean;
  projectService?: boolean | ProjectServiceOptions;
  tsconfigRootDir?: string;
}

const DEFAULT_IGNORES = [
  'dist/**',
  'node_modules/**',
  'coverage/**',
  '*.d.ts',
  '.tmp/**',
  '**/generated/**',
] as const;
const JS_TS_FILES = ['**/*.{js,mjs,cjs,ts,mts,cts}'] as const;

function scopeToJsTs(configs: ConfigArray): ConfigArray {
  return configs.map((entry) => ({
    ...entry,
    files: entry.files ?? [...JS_TS_FILES],
  }));
}

function createBaseConfig(options: BaseConfigOptions = {}): ConfigArray {
  const {
    project,
    projectService = { allowDefaultProject: ['vitest.config.ts', 'vitest.config.mts'] },
    tsconfigRootDir,
    ignores = [...DEFAULT_IGNORES],
  } = options;

  const parserOptions: ParserOptions = {};
  if (project !== undefined) {
    parserOptions.project = project;
  } else {
    parserOptions.projectService = projectService;
  }
  if (tsconfigRootDir !== undefined) {
    parserOptions.tsconfigRootDir = tsconfigRootDir;
  }

  return [
    {
      name: '@djblackeagle/dev-config-js/ignores',
      ignores,
    },
    ...scopeToJsTs([
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      jsdoc.configs['flat/recommended-typescript'],
      comments.recommended,
    ]),
    {
      name: '@djblackeagle/dev-config-js/base',
      files: [...JS_TS_FILES],
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
        parserOptions,
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
        eqeqeq: ['error', 'always'],
        curly: 'error',
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'default-case-last': 'error',
        'no-param-reassign': 'error',
        'object-shorthand': 'error',
        'prefer-template': 'error',
        'no-else-return': 'error',
        'no-useless-return': 'error',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'function',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: false,
            },
          },
          {
            selector: 'typeAlias',
            format: ['PascalCase'],
            custom: {
              regex: '^T[A-Z]',
              match: false,
            },
          },
          {
            selector: 'enumMember',
            format: ['PascalCase', 'UPPER_CASE'],
          },
          {
            selector: ['objectLiteralProperty', 'typeProperty'],
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: ['objectLiteralProperty', 'typeProperty', 'classProperty', 'default'],
            modifiers: ['requiresQuotes'],
            format: null,
          },
          {
            selector: 'default',
            filter: {
              regex: '^(_id|__typename)$',
              match: true,
            },
            format: null,
          },
        ],
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
      name: '@djblackeagle/dev-config-js/js-disable-type-checked',
      files: ['**/*.{js,mjs,cjs}'],
      ...tseslint.configs.disableTypeChecked,
    },
  ];
}

const baseConfig: ConfigArray = createBaseConfig();

export { DEFAULT_IGNORES, JS_TS_FILES, baseConfig, createBaseConfig, type BaseConfigOptions };
export default baseConfig;
