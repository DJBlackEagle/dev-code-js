import vitest from '@vitest/eslint-plugin';
import type { ConfigArray } from 'typescript-eslint';

const TEST_FILE_PATTERNS = ['**/*.spec.ts', '**/*.test.ts', 'tests/**/*.{ts,js}'] as const;

const vitestConfig: ConfigArray = [
  {
    files: [...TEST_FILE_PATTERNS],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
];

export { TEST_FILE_PATTERNS, vitestConfig };
export default vitestConfig;
