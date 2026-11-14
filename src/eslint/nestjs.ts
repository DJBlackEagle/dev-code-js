import type { ConfigArray } from 'typescript-eslint';

const nestjsConfig: ConfigArray = [
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-extraneous-class': [
        'error',
        {
          allowWithDecorator: true,
        },
      ],
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];

export { nestjsConfig };
export default nestjsConfig;
