import { describe, expect, it } from 'vitest';
import defaultBase, {
  DEFAULT_COVERAGE_EXCLUDE,
  DEFAULT_TEST_INCLUDE,
  createVitestConfig,
  vitestBaseConfig,
} from './base.js';

describe('Vitest Base Configuration (base.ts)', () => {
  it('should export identical named and default vitestBaseConfig', () => {
    expect(defaultBase).toBe(vitestBaseConfig);
  });

  it('should define standard test and v8 coverage settings', () => {
    expect(vitestBaseConfig.test).toMatchObject({
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
    });
  });

  it('should merge custom overrides via createVitestConfig', () => {
    const customConfig = createVitestConfig({
      test: {
        silent: false,
        env: {
          CUSTOM_FLAG: 'enabled',
        },
      },
    });

    expect(customConfig.test?.silent).toBe(false);
    expect(customConfig.test?.environment).toBe('node');
    expect(customConfig.test?.env).toEqual({
      NODE_ENV: 'test',
      CUSTOM_FLAG: 'enabled',
    });
  });

  it('should return base config when createVitestConfig is called without arguments', () => {
    const config = createVitestConfig();
    expect(config.test).toEqual(vitestBaseConfig.test);
  });
});
