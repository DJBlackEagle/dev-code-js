import { defineConfig, mergeConfig, type ViteUserConfig } from 'vitest/config';

const DEFAULT_TEST_INCLUDE = [
  'src/**/*.spec.ts',
  'src/**/*.test.ts',
  'tests/**/*.spec.ts',
  'tests/**/*.test.ts',
] as const;

const DEFAULT_COVERAGE_EXCLUDE = ['src/**/*.spec.ts', 'src/**/*.test.ts'] as const;

const vitestBaseConfig: ViteUserConfig = defineConfig({
  test: {
    globals: true,
    silent: true,
    environment: 'node',
    include: [...DEFAULT_TEST_INCLUDE],
    env: {
      NODE_ENV: 'test',
    },
    reporters: ['default'],
    coverage: {
      include: ['src/**/*.ts'],
      exclude: [...DEFAULT_COVERAGE_EXCLUDE],
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

function createVitestConfig(overrides: ViteUserConfig = {}): ViteUserConfig {
  return mergeConfig(vitestBaseConfig, overrides);
}

export {
  DEFAULT_COVERAGE_EXCLUDE,
  DEFAULT_TEST_INCLUDE,
  createVitestConfig,
  vitestBaseConfig,
  type ViteUserConfig,
};
export default vitestBaseConfig;
