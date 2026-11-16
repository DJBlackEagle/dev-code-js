import { describe, expect, it } from 'vitest';
import defaultCss, { DEFAULT_CSS_FILES, createCssConfig, cssConfig } from './css.js';

describe('ESLint CSS Configuration (css.ts)', () => {
  it('should export identical named and default cssConfig', () => {
    expect(defaultCss).toBe(cssConfig);
    expect(Array.isArray(cssConfig)).toBe(true);
    expect(cssConfig).toHaveLength(1);
  });

  it('should configure CSS recommended rules on default files', () => {
    const entry = cssConfig[0];
    expect(entry?.name).toBe('@djblackeagle/dev-config-js/css');
    expect(entry?.files).toEqual([...DEFAULT_CSS_FILES]);
    expect(entry?.ignores).toBeUndefined();
    expect(entry?.language).toBe('css/css');
    expect(entry?.rules).toMatchObject({
      'css/no-duplicate-imports': 'error',
      'css/no-empty-blocks': 'error',
      'css/no-invalid-properties': 'error',
    });
  });

  it('should support custom file patterns and ignores in createCssConfig', () => {
    const customConfig = createCssConfig({
      files: ['src/styles/**/*.css'],
      ignores: ['src/styles/vendor/**'],
    });

    const entry = customConfig[0];
    expect(entry?.files).toEqual(['src/styles/**/*.css']);
    expect(entry?.ignores).toEqual(['src/styles/vendor/**']);
  });
});
