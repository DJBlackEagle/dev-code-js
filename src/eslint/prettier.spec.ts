import { describe, expect, it } from 'vitest';
import defaultPrettier, { prettierEslintConfig } from './prettier.js';

describe('ESLint Prettier Configuration (prettier.ts)', () => {
  it('should export identical named and default prettierEslintConfig', () => {
    expect(defaultPrettier).toBe(prettierEslintConfig);
    expect(prettierEslintConfig.length).toBeGreaterThan(0);
  });
});
