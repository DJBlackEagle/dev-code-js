import eslint from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';
import tseslint, { type ConfigArray } from 'typescript-eslint';

interface BaseConfigOptions {
  project?: string | string[] | boolean;
  projectService?: boolean;
  tsconfigRootDir?: string;
  ignores?: string[];
}

interface ParserOptions {
  project?: string | string[] | boolean;
  projectService?: boolean;
  tsconfigRootDir?: string;
}

const DEFAULT_IGNORES = ['dist/**', 'node_modules/**', 'coverage/**', '*.d.ts', '.tmp/**'] as const;

function createBaseConfig(options: BaseConfigOptions = {}): ConfigArray {
  const {
    project,
    projectService = true,
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
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    jsdoc.configs['flat/recommended-typescript'],
    {
      name: '@djblackeagle/dev-config-js/base',
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

export { DEFAULT_IGNORES, baseConfig, createBaseConfig, type BaseConfigOptions };
export default baseConfig;
