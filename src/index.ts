import {
  commitlintConfig,
  createCommitlintConfig,
  type CommitlintConfigOptions,
  type CommitlintRuleCondition,
  type CommitlintRuleSeverity,
  type CommitlintRuleTuple,
} from './commitlint/index.js';
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
import {
  createLintStagedConfig,
  lintStagedConfig,
  type LintStagedConfigOptions,
  type LintStagedTask,
  type LintStagedTaskFunction,
} from './lint-staged/index.js';
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
  commitlintConfig,
  createAngularConfig,
  createBaseConfig,
  createCommitlintConfig,
  createLintStagedConfig,
  createNestjsVitestConfig,
  createVitestConfig,
  eslintPresets,
  lintStagedConfig,
  nestjsConfig,
  prettierConfig,
  prettierEslintConfig,
  vitestBaseConfig,
  vitestConfig,
  vitestNestjsConfig,
  vitestPresets,
  type AngularConfigOptions,
  type BaseConfigOptions,
  type CommitlintConfigOptions,
  type CommitlintRuleCondition,
  type CommitlintRuleSeverity,
  type CommitlintRuleTuple,
  type EslintPresets,
  type LintStagedConfigOptions,
  type LintStagedTask,
  type LintStagedTaskFunction,
  type ViteUserConfig,
  type VitestPresets,
};
