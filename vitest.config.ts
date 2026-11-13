import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    silent: true,
    environment: 'node',
    include: ['src/**/*.spec.ts', 'tests/**/*.spec.ts'],
    env: {
      NODE_ENV: 'test',
    },
    reporters: ['default'],
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 80,
        statements: 85,
      },
      provider: 'v8',
      enabled: false,
      reporter: ['text', 'json', 'html'],
    },
  },
});
