import { describe, expect, it } from 'vitest';
import defaultMarkdown, {
  DEFAULT_MARKDOWN_CODE_BLOCK_FILES,
  DEFAULT_MARKDOWN_FILES,
  DEFAULT_MARKDOWN_IGNORES,
  createMarkdownEslintConfig,
  markdownEslintConfig,
} from './markdown.js';

describe('ESLint Markdown Configuration (markdown.ts)', () => {
  it('should export identical named and default markdownEslintConfig', () => {
    expect(defaultMarkdown).toBe(markdownEslintConfig);
    expect(Array.isArray(markdownEslintConfig)).toBe(true);
    expect(markdownEslintConfig).toHaveLength(2);
  });

  it('should configure the markdown processor and disable type-checked rules for code blocks', () => {
    const processorBlock = markdownEslintConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/markdown-processor',
    );
    expect(processorBlock?.files).toEqual([...DEFAULT_MARKDOWN_FILES]);
    expect(processorBlock?.ignores).toEqual([...DEFAULT_MARKDOWN_IGNORES]);
    expect(processorBlock?.processor).toBe('markdown/markdown');

    const codeBlockOverrides = markdownEslintConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/markdown-code-blocks',
    );
    expect(codeBlockOverrides?.files).toEqual([...DEFAULT_MARKDOWN_CODE_BLOCK_FILES]);
    expect(codeBlockOverrides?.rules).toMatchObject({
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
      'no-undef': 'off',
    });
  });

  it('should support custom file patterns and ignores in createMarkdownEslintConfig', () => {
    const customConfig = createMarkdownEslintConfig({
      files: ['docs/**/*.md'],
      codeBlockFiles: ['docs/**/*.md/**'],
      ignores: ['docs/archive/**'],
    });

    const processorBlock = customConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/markdown-processor',
    );
    expect(processorBlock?.files).toEqual(['docs/**/*.md']);
    expect(processorBlock?.ignores).toEqual(['docs/archive/**']);

    const codeBlockOverrides = customConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/markdown-code-blocks',
    );
    expect(codeBlockOverrides?.files).toEqual(['docs/**/*.md/**']);
  });
});
