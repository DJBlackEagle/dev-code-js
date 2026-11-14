import type { Config } from 'prettier';

const prettierConfig: Config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  overrides: [
    {
      files: ['*.jsonc'],
      options: {
        trailingComma: 'none',
      },
    },
  ],
};

export { prettierConfig };
export default prettierConfig;
