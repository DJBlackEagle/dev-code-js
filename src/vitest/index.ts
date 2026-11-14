import {
  DEFAULT_COVERAGE_EXCLUDE,
  DEFAULT_TEST_INCLUDE,
  createVitestConfig,
  vitestBaseConfig,
  type ViteUserConfig,
} from './base.js';
import { NESTJS_COVERAGE_EXCLUDE, createNestjsVitestConfig, vitestNestjsConfig } from './nestjs.js';

interface VitestPresets {
  base: ViteUserConfig;
  nestjs: ViteUserConfig;
}

const vitestPresets: VitestPresets = {
  base: vitestBaseConfig,
  nestjs: vitestNestjsConfig,
};

export {
  DEFAULT_COVERAGE_EXCLUDE,
  DEFAULT_TEST_INCLUDE,
  NESTJS_COVERAGE_EXCLUDE,
  createNestjsVitestConfig,
  createVitestConfig,
  vitestBaseConfig,
  vitestNestjsConfig,
  vitestPresets,
  type ViteUserConfig,
  type VitestPresets,
};
export default vitestBaseConfig;
