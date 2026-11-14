import type { ConfigArray } from 'typescript-eslint';
import { angularConfig, createAngularConfig, type AngularConfigOptions } from './angular.js';
import { DEFAULT_IGNORES, baseConfig, createBaseConfig, type BaseConfigOptions } from './base.js';
import { nestjsConfig } from './nestjs.js';
import { prettierEslintConfig } from './prettier.js';
import { TEST_FILE_PATTERNS, vitestConfig } from './vitest.js';

interface EslintPresets {
  library: ConfigArray;
  nestjs: ConfigArray;
  angular: ConfigArray;
}

const eslintPresets: EslintPresets = {
  library: [...baseConfig, ...vitestConfig, ...prettierEslintConfig],
  nestjs: [...baseConfig, ...nestjsConfig, ...vitestConfig, ...prettierEslintConfig],
  angular: [...baseConfig, ...angularConfig, ...vitestConfig, ...prettierEslintConfig],
};

const presets = eslintPresets;

export {
  DEFAULT_IGNORES,
  TEST_FILE_PATTERNS,
  angularConfig,
  baseConfig,
  createAngularConfig,
  createBaseConfig,
  eslintPresets,
  nestjsConfig,
  presets,
  prettierEslintConfig,
  vitestConfig,
  type AngularConfigOptions,
  type BaseConfigOptions,
  type EslintPresets,
};
export default eslintPresets;
