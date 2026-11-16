import yml from 'eslint-plugin-yml';
import type { ConfigArray } from 'typescript-eslint';

interface YamlConfigOptions {
  files?: string[];
  ignores?: string[];
}

const DEFAULT_YAML_FILES = ['**/*.{yml,yaml}'] as const;
const DEFAULT_YAML_IGNORES = ['**/pnpm-lock.yaml'] as const;

/**
 * Creates a flat ESLint configuration array for YAML files using `eslint-plugin-yml`.
 * @param options - Optional file patterns and ignores for YAML linting.
 * @returns The ESLint flat configuration array for YAML files.
 */
function createYamlConfig(options: YamlConfigOptions = {}): ConfigArray {
  const { files = [...DEFAULT_YAML_FILES], ignores = [...DEFAULT_YAML_IGNORES] } = options;

  return [
    ...yml.configs['flat/standard'].map((entry) => ({
      ...entry,
      files: entry.files ?? files,
      ignores,
    })),
    ...yml.configs['flat/prettier'].map((entry) => ({
      ...entry,
      files: entry.files ?? files,
      ignores,
    })),
    {
      name: '@djblackeagle/dev-config-js/yaml-overrides',
      files,
      ignores,
      rules: {
        'yml/no-empty-mapping-value': 'off',
        'yml/plain-scalar': 'off',
      },
    },
  ];
}

const yamlConfig: ConfigArray = createYamlConfig();

export {
  DEFAULT_YAML_FILES,
  DEFAULT_YAML_IGNORES,
  createYamlConfig,
  yamlConfig,
  type YamlConfigOptions,
};
export default yamlConfig;
