import { describe, expect, it } from 'vitest';
import defaultVitest, { TEST_FILE_PATTERNS, vitestConfig } from './vitest.js';

describe('ESLint Vitest Configuration (vitest.ts)', () => {
  it('should export identical named and default vitestConfig covering .spec.ts and .test.ts', () => {
    expect(defaultVitest).toBe(vitestConfig);
    expect(vitestConfig[0]?.files).toEqual([...TEST_FILE_PATTERNS]);
    expect(TEST_FILE_PATTERNS).toContain('**/*.spec.ts');
    expect(TEST_FILE_PATTERNS).toContain('**/*.test.ts');
    expect(vitestConfig[0]?.rules).toMatchObject({
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/unbound-method': 'off',
    });
  });
});
