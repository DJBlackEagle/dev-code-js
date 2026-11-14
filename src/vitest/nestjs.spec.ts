import { describe, expect, it } from 'vitest';
import defaultNestjs, {
  NESTJS_COVERAGE_EXCLUDE,
  createNestjsVitestConfig,
  vitestNestjsConfig,
} from './nestjs.js';

describe('Vitest NestJS Configuration (nestjs.ts)', () => {
  it('should export identical named and default vitestNestjsConfig', () => {
    expect(defaultNestjs).toBe(vitestNestjsConfig);
  });

  it('should extend base config and exclude NestJS bootstrap/module/DTO/entity files from coverage', () => {
    expect(vitestNestjsConfig.test?.environment).toBe('node');
    expect(vitestNestjsConfig.test?.coverage).toMatchObject({
      provider: 'v8',
      exclude: [...NESTJS_COVERAGE_EXCLUDE],
    });
    expect(NESTJS_COVERAGE_EXCLUDE).toContain('src/main.ts');
    expect(NESTJS_COVERAGE_EXCLUDE).toContain('src/**/*.module.ts');
    expect(NESTJS_COVERAGE_EXCLUDE).toContain('src/**/*.dto.ts');
    expect(NESTJS_COVERAGE_EXCLUDE).toContain('src/**/*.entity.ts');
  });

  it('should merge custom overrides via createNestjsVitestConfig', () => {
    const customConfig = createNestjsVitestConfig({
      test: {
        setupFiles: ['./test/setup.ts'],
      },
    });

    expect(customConfig.test?.setupFiles).toEqual(['./test/setup.ts']);
    expect(customConfig.test?.environment).toBe('node');
  });

  it('should return NestJS config when createNestjsVitestConfig is called without arguments', () => {
    const config = createNestjsVitestConfig();
    expect(config.test).toEqual(vitestNestjsConfig.test);
  });
});
