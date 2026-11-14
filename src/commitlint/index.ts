type CommitlintRuleSeverity = 0 | 1 | 2;
type CommitlintRuleCondition = 'always' | 'never';
type CommitlintRuleTuple<T = unknown> =
  | readonly [CommitlintRuleSeverity]
  | readonly [CommitlintRuleSeverity, CommitlintRuleCondition]
  | readonly [CommitlintRuleSeverity, CommitlintRuleCondition, T];

interface CommitlintConfigOptions {
  extends?: string[];
  rules?: Record<string, CommitlintRuleTuple>;
  ignores?: ((commit: string) => boolean)[];
  defaultIgnores?: boolean;
  helpUrl?: string;
}

const commitlintConfig: CommitlintConfigOptions = {
  extends: ['@commitlint/config-conventional'],
};

/**
 * Creates a customized Commitlint configuration by merging user overrides with the shared preset.
 * @param overrides - Custom Commitlint configuration options to merge.
 * @returns The merged Commitlint configuration object.
 */
function createCommitlintConfig(overrides: CommitlintConfigOptions = {}): CommitlintConfigOptions {
  return {
    ...commitlintConfig,
    ...overrides,
  };
}

export {
  commitlintConfig,
  createCommitlintConfig,
  type CommitlintConfigOptions,
  type CommitlintRuleCondition,
  type CommitlintRuleSeverity,
  type CommitlintRuleTuple,
};
export default commitlintConfig;
