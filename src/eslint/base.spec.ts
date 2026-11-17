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
    expect(DEFAULT_IGNORES).toContain('**/generated/**');

    const rulesBlock = baseConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/base',
    );
    expect(rulesBlock?.linterOptions).toEqual({
      reportUnusedDisableDirectives: 'error',
    });
    expect(rulesBlock?.rules).toMatchObject({
      '@typescript-eslint/no-explicit-any': 'error',
      '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
      '@eslint-community/eslint-comments/require-description': [
        'error',
        { ignore: ['eslint-enable'] },
      ],
      'import-x/first': 'error',
      'import-x/no-duplicates': 'error',
      'n/prefer-node-protocol': 'error',
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
      'jsdoc/require-jsdoc': 'off',
    });
    const namingConvention = rulesBlock?.rules?.['@typescript-eslint/naming-convention'];
    expect(Array.isArray(namingConvention)).toBe(true);
    expect(namingConvention).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          selector: 'interface',
          custom: { regex: '^I[A-Z]', match: false },
        }),
        expect.objectContaining({
          selector: 'typeAlias',
          custom: { regex: '^T[A-Z]', match: false },
        }),
        expect.objectContaining({
          modifiers: ['requiresQuotes'],
          format: null,
        }),
        expect.objectContaining({
          selector: 'default',
          filter: { regex: '^(_id|__typename)$', match: true },
          format: null,
        }),
      ]),
    );
    expect(rulesBlock?.languageOptions?.parserOptions).toEqual({
      projectService: {
        allowDefaultProject: ['vitest.config.ts', 'vitest.config.mts'],
      },
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
