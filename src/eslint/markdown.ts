import markdown from '@eslint/markdown';
import tseslint, { type ConfigArray } from 'typescript-eslint';

interface MarkdownEslintConfigOptions {
  files?: string[];
  codeBlockFiles?: string[];
  ignores?: string[];
}

const DEFAULT_MARKDOWN_FILES = ['**/*.md'] as const;
const DEFAULT_MARKDOWN_CODE_BLOCK_FILES = ['**/*.md/**'] as const;
const DEFAULT_MARKDOWN_IGNORES = ['**/CHANGELOG.md'] as const;

/**
 * Creates a flat ESLint configuration array for linting fenced code blocks in Markdown files using `@eslint/markdown`.
 * @param options - Optional file patterns and ignores for Markdown code-block linting.
 * @returns The ESLint flat configuration array for Markdown code blocks.
 */
function createMarkdownEslintConfig(options: MarkdownEslintConfigOptions = {}): ConfigArray {
  const {
    files = [...DEFAULT_MARKDOWN_FILES],
    codeBlockFiles = [...DEFAULT_MARKDOWN_CODE_BLOCK_FILES],
    ignores = [...DEFAULT_MARKDOWN_IGNORES],
  } = options;

  return [
    {
      name: '@djblackeagle/dev-config-js/markdown-processor',
      files,
      ignores,
      plugins: {
        markdown,
      },
      processor: 'markdown/markdown',
    },
    {
      ...tseslint.configs.disableTypeChecked,
      name: '@djblackeagle/dev-config-js/markdown-code-blocks',
      files: codeBlockFiles,
      rules: {
        ...tseslint.configs.disableTypeChecked.rules,
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
  ];
}

const markdownEslintConfig: ConfigArray = createMarkdownEslintConfig();

export {
  DEFAULT_MARKDOWN_CODE_BLOCK_FILES,
  DEFAULT_MARKDOWN_FILES,
  DEFAULT_MARKDOWN_IGNORES,
  createMarkdownEslintConfig,
  markdownEslintConfig,
  type MarkdownEslintConfigOptions,
};
export default markdownEslintConfig;
