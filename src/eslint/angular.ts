import angular from 'angular-eslint';
import globals from 'globals';
import type { ConfigArray } from 'typescript-eslint';

interface AngularConfigOptions {
  prefix?: string;
}

function createAngularConfig(options: AngularConfigOptions = {}): ConfigArray {
  const { prefix = 'app' } = options;

  return [
    ...angular.configs.tsRecommended.map((config) => ({
      ...config,
      files: ['**/*.ts'],
    })),
    {
      name: '@djblackeagle/dev-config-js/angular-selectors',
      files: ['**/*.ts'],
      languageOptions: {
        globals: {
          ...globals.browser,
        },
      },
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix,
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix,
            style: 'kebab-case',
          },
        ],
      },
    },
    ...angular.configs.templateRecommended.map((config) => ({
      ...config,
      files: ['**/*.html'],
    })),
    ...angular.configs.templateAccessibility.map((config) => ({
      ...config,
      files: ['**/*.html'],
    })),
  ];
}

const angularConfig: ConfigArray = createAngularConfig();

export { angularConfig, createAngularConfig, type AngularConfigOptions };
export default angularConfig;
