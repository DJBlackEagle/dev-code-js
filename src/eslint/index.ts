import type { ConfigArray } from 'typescript-eslint';
import { angularConfig, createAngularConfig, type AngularConfigOptions } from './angular.js';
import {
  DEFAULT_IGNORES,
  JS_TS_FILES,
  baseConfig,
  createBaseConfig,
  type BaseConfigOptions,
} from './base.js';
import { DEFAULT_CSS_FILES, createCssConfig, cssConfig, type CssConfigOptions } from './css.js';
import {
  DEFAULT_JSONC_FILES,
  DEFAULT_JSON_FILES,
  DEFAULT_JSON_IGNORES,
  createJsonConfig,
  jsonConfig,
  type JsonConfigOptions,
} from './json.js';
import {
  DEFAULT_MARKDOWN_CODE_BLOCK_FILES,
  DEFAULT_MARKDOWN_FILES,
  DEFAULT_MARKDOWN_IGNORES,
  createMarkdownEslintConfig,
  markdownEslintConfig,
  type MarkdownEslintConfigOptions,
} from './markdown.js';
import { nestjsConfig } from './nestjs.js';
import {
  DEFAULT_PACKAGE_JSON_FILES,
  createPackageJsonConfig,
  packageJsonConfig,
  type PackageJsonConfigOptions,
} from './package-json.js';
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
  library: [
    ...baseConfig,
    ...jsonConfig,
    ...packageJsonConfig,
    ...yamlConfig,
    ...markdownEslintConfig,
    ...vitestConfig,
    ...prettierEslintConfig,
  ],
  nestjs: [
    ...baseConfig,
    ...jsonConfig,
    ...packageJsonConfig,
    ...yamlConfig,
    ...markdownEslintConfig,
    ...nestjsConfig,
    ...vitestConfig,
    ...prettierEslintConfig,
  ],
  angular: [
    ...baseConfig,
    ...jsonConfig,
    ...packageJsonConfig,
    ...yamlConfig,
    ...markdownEslintConfig,
    ...cssConfig,
    ...angularConfig,
    ...vitestConfig,
    ...prettierEslintConfig,
  ],
};

const presets = eslintPresets;

export {
  DEFAULT_CSS_FILES,
  DEFAULT_IGNORES,
  DEFAULT_JSONC_FILES,
  DEFAULT_JSON_FILES,
  DEFAULT_JSON_IGNORES,
  DEFAULT_MARKDOWN_CODE_BLOCK_FILES,
  DEFAULT_MARKDOWN_FILES,
  DEFAULT_MARKDOWN_IGNORES,
  DEFAULT_PACKAGE_JSON_FILES,
  DEFAULT_YAML_FILES,
  DEFAULT_YAML_IGNORES,
  JS_TS_FILES,
  TEST_FILE_PATTERNS,
  angularConfig,
  baseConfig,
  createAngularConfig,
  createBaseConfig,
  createCssConfig,
  createJsonConfig,
  createMarkdownEslintConfig,
  createPackageJsonConfig,
  createYamlConfig,
  cssConfig,
  eslintPresets,
  jsonConfig,
  markdownEslintConfig,
  nestjsConfig,
  packageJsonConfig,
  presets,
  prettierEslintConfig,
  vitestConfig,
  yamlConfig,
  type AngularConfigOptions,
  type BaseConfigOptions,
  type CssConfigOptions,
  type EslintPresets,
  type JsonConfigOptions,
  type MarkdownEslintConfigOptions,
  type PackageJsonConfigOptions,
  type YamlConfigOptions,
};
export default eslintPresets;
