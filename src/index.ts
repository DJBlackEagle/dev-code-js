import {
  angularConfig,
  baseConfig,
  createAngularConfig,
  createBaseConfig,
  eslintPresets,
  nestjsConfig,
  prettierEslintConfig,
  vitestConfig,
  type AngularConfigOptions,
  type BaseConfigOptions,
  type EslintPresets,
} from './eslint/index.js';
import { prettierConfig } from './prettier/index.js';
import {
  createNestjsVitestConfig,
  createVitestConfig,
  vitestBaseConfig,
  vitestNestjsConfig,
  vitestPresets,
  type ViteUserConfig,
  type VitestPresets,
} from './vitest/index.js';

const PACKAGE_NAME = '@djblackeagle/dev-config-js';

export {
  PACKAGE_NAME,
  angularConfig,
  baseConfig,
  createAngularConfig,
  createBaseConfig,
  createNestjsVitestConfig,
  createVitestConfig,
  eslintPresets,
  nestjsConfig,
  prettierConfig,
  prettierEslintConfig,
  vitestBaseConfig,
  vitestConfig,
  vitestNestjsConfig,
  vitestPresets,
  type AngularConfigOptions,
  type BaseConfigOptions,
  type EslintPresets,
  type ViteUserConfig,
  type VitestPresets,
};
