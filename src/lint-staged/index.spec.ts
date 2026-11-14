import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import defaultLintStagedConfig, {
  createLintStagedConfig,
  lintStagedConfig,
  type LintStagedConfigOptions,
} from './index.js';

interface RootLintStagedModule {
  default: LintStagedConfigOptions;
}

describe('Lint-Staged Configuration Preset (lintStagedConfig)', () => {
  it('should export identical named and default configurations', () => {
    expect(defaultLintStagedConfig).toBe(lintStagedConfig);
  });

  it('should define standard pre-commit linting and formatting tasks', () => {
    expect(lintStagedConfig).toEqual({
      '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
      '*.{js,jsx}': ['eslint --fix', 'prettier --write'],
      '*.md': ['markdownlint-cli2 --fix', 'prettier --write'],
      '*.{json,jsonc,yml,yaml}': ['prettier --write'],
    });
  });

  it('should return a copy of the base configuration when createLintStagedConfig is called without arguments', () => {
    const config = createLintStagedConfig();

    expect(config).toEqual(lintStagedConfig);
    expect(config).not.toBe(lintStagedConfig);
  });

  it('should merge custom glob rules in createLintStagedConfig', () => {
    const customTask = (files: readonly string[]): string => `prettier --write ${files.join(' ')}`;
    const customConfig = createLintStagedConfig({
      '*.{html,scss}': ['prettier --write'],
      '*.css': customTask,
    });

    expect(customConfig['*.{ts,tsx}']).toEqual(['eslint --fix', 'prettier --write']);
    expect(customConfig['*.{html,scss}']).toEqual(['prettier --write']);
    expect(customConfig['*.css']).toBe(customTask);
  });

  it('should stay strictly synchronized with the repository root .lintstagedrc.js', async () => {
    const rootConfigPath = path.resolve(import.meta.dirname, '../../.lintstagedrc.js');
    const rootConfigUrl = pathToFileURL(rootConfigPath).href;
    /** Dynamic import of root JS config returns any; safe to assert to RootLintStagedModule for sync verification. */
    const rootModule = (await import(rootConfigUrl)) as RootLintStagedModule;

    expect(rootModule.default).toEqual(lintStagedConfig);
  });
});
