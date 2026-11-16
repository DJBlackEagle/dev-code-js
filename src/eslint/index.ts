import type { ConfigArray } from 'typescript-eslint';
import { angularConfig, createAngularConfig, type AngularConfigOptions } from './angular.js';
import {
  DEFAULT_IGNORES,
  JS_TS_FILES,
  baseConfig,
  createBaseConfig,
  type BaseConfigOptions,
} from './base.js';
import {
  DEFAULT_JSONC_FILES,
  DEFAULT_JSON_FILES,
  DEFAULT_JSON_IGNORES,
  createJsonConfig,
  jsonConfig,
  type JsonConfigOptions,
} from './json.js';
import { nestjsConfig } from './nestjs.js';
import { prettierEslintConfig } from './prettier.js';
import { TEST_FILE_PATTERNS, vitestConfig } from './vitest.js';
import {
  DEFAULT_YAML_FILES,
  DEFAULT_YAML_IGNORES,
  createYamlConfig,
  yamlConfig,
  type YamlConfigOptions,
} from './yaml.js';

interface EslintPresets {
  library: ConfigArray;
  nestjs: ConfigArray;
  angular: ConfigArray;
}

const eslintPresets: EslintPresets = {
  library: [...baseConfig, ...jsonConfig, ...yamlConfig, ...vitestConfig, ...prettierEslintConfig],
  nestjs: [
    ...baseConfig,
    ...jsonConfig,
    ...yamlConfig,
    ...nestjsConfig,
    ...vitestConfig,
    ...prettierEslintConfig,
  ],
  angular: [
    ...baseConfig,
    ...jsonConfig,
    ...yamlConfig,
    ...angularConfig,
    ...vitestConfig,
    ...prettierEslintConfig,
  ],
};

const presets = eslintPresets;

export {
  DEFAULT_IGNORES,
  DEFAULT_JSONC_FILES,
  DEFAULT_JSON_FILES,
  DEFAULT_JSON_IGNORES,
  DEFAULT_YAML_FILES,
  DEFAULT_YAML_IGNORES,
  JS_TS_FILES,
  TEST_FILE_PATTERNS,
  angularConfig,
  baseConfig,
  createAngularConfig,
  createBaseConfig,
  createJsonConfig,
  createYamlConfig,
  eslintPresets,
  jsonConfig,
  nestjsConfig,
  presets,
  prettierEslintConfig,
  vitestConfig,
  yamlConfig,
  type AngularConfigOptions,
  type BaseConfigOptions,
  type EslintPresets,
  type JsonConfigOptions,
  type YamlConfigOptions,
};
export default eslintPresets;
