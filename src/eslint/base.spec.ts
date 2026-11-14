import { describe, expect, it } from 'vitest';
import defaultBase, { DEFAULT_IGNORES, baseConfig, createBaseConfig } from './base.js';

describe('ESLint Base Configuration (base.ts)', () => {
  it('should export identical named and default baseConfig', () => {
    expect(defaultBase).toBe(baseConfig);
    expect(Array.isArray(baseConfig)).toBe(true);
  });

  it('should include default ignore patterns and strict TypeScript/code hygiene rules', () => {
    const ignoreBlock = baseConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/ignores',
    );
    expect(ignoreBlock?.ignores).toEqual([...DEFAULT_IGNORES]);

    const rulesBlock = baseConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/base',
    );
    expect(rulesBlock?.rules).toMatchObject({
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': 'error',
      'jsdoc/require-jsdoc': 'off',
    });
    expect(rulesBlock?.languageOptions?.parserOptions).toEqual({
      projectService: true,
    });
  });

  it('should support custom project, tsconfigRootDir, and ignores in createBaseConfig', () => {
    const customConfig = createBaseConfig({
      project: ['./tsconfig.eslint.json'],
      tsconfigRootDir: '/workspace',
      ignores: ['custom-dist/**'],
    });

    const ignoreBlock = customConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/ignores',
    );
    expect(ignoreBlock?.ignores).toEqual(['custom-dist/**']);

    const rulesBlock = customConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/base',
    );
    expect(rulesBlock?.languageOptions?.parserOptions).toEqual({
      project: ['./tsconfig.eslint.json'],
      tsconfigRootDir: '/workspace',
    });
  });

  it('should allow disabling projectService explicitly', () => {
    const customConfig = createBaseConfig({
      projectService: false,
    });
    const rulesBlock = customConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/base',
    );
    expect(rulesBlock?.languageOptions?.parserOptions).toEqual({
      projectService: false,
    });
  });
});
