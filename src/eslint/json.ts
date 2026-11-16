import json from '@eslint/json';
import type { ConfigArray } from 'typescript-eslint';

interface JsonConfigOptions {
  jsonFiles?: string[];
  jsoncFiles?: string[];
  ignores?: string[];
}

const DEFAULT_JSON_FILES = ['**/*.json'] as const;
const DEFAULT_JSONC_FILES = [
  '**/*.jsonc',
  '**/tsconfig*.json',
  '**/.vscode/*.json',
  '**/.devcontainer/*.json',
  '**/.markdownlint-cli2.jsonc',
] as const;
const DEFAULT_JSON_IGNORES = [
  '**/package.json',
  '**/package-lock.json',
  '**/pnpm-lock.yaml',
] as const;

/**
 * Creates a flat ESLint configuration array for JSON and JSONC files using `@eslint/json`.
 * @param options - Optional file patterns and ignores for JSON and JSONC linting.
 * @returns The ESLint flat configuration array for JSON and JSONC files.
 */
function createJsonConfig(options: JsonConfigOptions = {}): ConfigArray {
  const {
    jsonFiles = [...DEFAULT_JSON_FILES],
    jsoncFiles = [...DEFAULT_JSONC_FILES],
    ignores = [...DEFAULT_JSON_IGNORES],
  } = options;

  const jsoncLanguageOptions: Record<string, unknown> = {
    allowTrailingCommas: true,
  };

  return [
    {
      name: '@djblackeagle/dev-config-js/json',
      files: jsonFiles,
      ignores: [...ignores, ...jsoncFiles],
      plugins: {
        json,
      },
      language: 'json/json',
      rules: {
        ...json.configs.recommended.rules,
      },
    },
    {
      name: '@djblackeagle/dev-config-js/jsonc',
      files: jsoncFiles,
      ignores,
      plugins: {
        json,
      },
      language: 'json/jsonc',
      languageOptions: jsoncLanguageOptions,
      rules: {
        ...json.configs.recommended.rules,
      },
    },
  ];
}

const jsonConfig: ConfigArray = createJsonConfig();

export {
  DEFAULT_JSONC_FILES,
  DEFAULT_JSON_FILES,
  DEFAULT_JSON_IGNORES,
  createJsonConfig,
  jsonConfig,
  type JsonConfigOptions,
};
export default jsonConfig;
