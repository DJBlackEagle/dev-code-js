import css from '@eslint/css';
import type { ConfigArray } from 'typescript-eslint';

interface CssConfigOptions {
  files?: string[];
  ignores?: string[];
}

const DEFAULT_CSS_FILES = ['**/*.css'] as const;

/**
 * Creates a flat ESLint configuration array for CSS files using `@eslint/css`.
 * @param options - Optional file patterns and ignores for CSS linting.
 * @returns The ESLint flat configuration array for CSS files.
 */
function createCssConfig(options: CssConfigOptions = {}): ConfigArray {
  const { files = [...DEFAULT_CSS_FILES], ignores } = options;

  return [
    {
      name: '@djblackeagle/dev-config-js/css',
      files,
      ...(ignores !== undefined ? { ignores } : {}),
      plugins: {
        css,
      },
      language: 'css/css',
      rules: {
        ...css.configs.recommended.rules,
      },
    },
  ];
}

const cssConfig: ConfigArray = createCssConfig();

export { DEFAULT_CSS_FILES, createCssConfig, cssConfig, type CssConfigOptions };
export default cssConfig;
