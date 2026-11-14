import { describe, expect, it } from 'vitest';
import defaultNestjs, { nestjsConfig } from './nestjs.js';

describe('ESLint NestJS Configuration (nestjs.ts)', () => {
  it('should export identical named and default nestjsConfig with decorator-friendly rules', () => {
    expect(defaultNestjs).toBe(nestjsConfig);
    expect(nestjsConfig[0]?.files).toEqual(['**/*.ts']);
    expect(nestjsConfig[0]?.rules).toMatchObject({
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      '@typescript-eslint/no-useless-constructor': 'off',
    });
  });
});
