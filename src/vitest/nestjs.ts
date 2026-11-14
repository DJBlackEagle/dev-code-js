import { mergeConfig, type ViteUserConfig } from 'vitest/config';
import { DEFAULT_COVERAGE_EXCLUDE, vitestBaseConfig } from './base.js';

const NESTJS_COVERAGE_EXCLUDE = [
  ...DEFAULT_COVERAGE_EXCLUDE,
  'src/main.ts',
  'src/**/*.module.ts',
  'src/**/*.dto.ts',
  'src/**/*.entity.ts',
] as const;

const vitestNestjsConfig: ViteUserConfig = {
  ...vitestBaseConfig,
  test: {
    ...vitestBaseConfig.test,
    coverage: {
      ...vitestBaseConfig.test?.coverage,
      provider: 'v8',
      exclude: [...NESTJS_COVERAGE_EXCLUDE],
    },
  },
};

function createNestjsVitestConfig(overrides: ViteUserConfig = {}): ViteUserConfig {
  return mergeConfig(vitestNestjsConfig, overrides);
}

export { NESTJS_COVERAGE_EXCLUDE, createNestjsVitestConfig, vitestNestjsConfig };
export default vitestNestjsConfig;
