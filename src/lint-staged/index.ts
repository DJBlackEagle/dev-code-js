type LintStagedTaskFunction = (
  stagedFileNames: readonly string[],
) => string | readonly string[] | Promise<string | readonly string[]>;

type LintStagedTask = string | readonly string[] | LintStagedTaskFunction;

type LintStagedConfigOptions = Record<string, LintStagedTask>;

const lintStagedConfig: LintStagedConfigOptions = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.md': ['markdownlint-cli2 --fix', 'prettier --write'],
  '*.{json,jsonc,yml,yaml}': ['prettier --write'],
};

/**
 * Creates a customized lint-staged configuration by merging user overrides with the shared preset.
 * @param overrides - Custom lint-staged glob rules to merge.
 * @returns The merged lint-staged configuration object.
 */
function createLintStagedConfig(overrides: LintStagedConfigOptions = {}): LintStagedConfigOptions {
  return {
    ...lintStagedConfig,
    ...overrides,
  };
}

export {
  createLintStagedConfig,
  lintStagedConfig,
  type LintStagedConfigOptions,
  type LintStagedTask,
  type LintStagedTaskFunction,
};
export default lintStagedConfig;
