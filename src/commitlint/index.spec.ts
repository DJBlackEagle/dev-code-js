import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import defaultCommitlintConfig, {
  commitlintConfig,
  createCommitlintConfig,
  type CommitlintConfigOptions,
} from './index.js';

interface RootCommitlintModule {
  default: CommitlintConfigOptions;
}

describe('Commitlint Configuration Preset (commitlintConfig)', () => {
  it('should export identical named and default configurations', () => {
    expect(defaultCommitlintConfig).toBe(commitlintConfig);
  });

  it('should extend @commitlint/config-conventional by default', () => {
    expect(commitlintConfig).toEqual({
      extends: ['@commitlint/config-conventional'],
    });
  });

  it('should return a copy of the base configuration when createCommitlintConfig is called without arguments', () => {
    const config = createCommitlintConfig();

    expect(config).toEqual(commitlintConfig);
    expect(config).not.toBe(commitlintConfig);
  });

  it('should merge custom rules and options in createCommitlintConfig', () => {
    const ignoreWip = (commit: string): boolean => commit.startsWith('WIP:');
    const customConfig = createCommitlintConfig({
      rules: {
        'header-max-length': [2, 'always', 120],
      },
      ignores: [ignoreWip],
      defaultIgnores: true,
      helpUrl: 'https://github.com/DJBlackEagle/dev-code-js',
    });

    expect(customConfig.extends).toEqual(['@commitlint/config-conventional']);
    expect(customConfig.rules).toEqual({
      'header-max-length': [2, 'always', 120],
    });
    expect(customConfig.ignores).toEqual([ignoreWip]);
    expect(customConfig.defaultIgnores).toBe(true);
    expect(customConfig.helpUrl).toBe('https://github.com/DJBlackEagle/dev-code-js');
  });

  it('should stay strictly synchronized with the repository root commitlint.config.js', async () => {
    const rootConfigPath = path.resolve(import.meta.dirname, '../../commitlint.config.js');
    const rootConfigUrl = pathToFileURL(rootConfigPath).href;
    /** Dynamic import of root JS config returns any; safe to assert to RootCommitlintModule for sync verification. */
    const rootModule = (await import(rootConfigUrl)) as RootCommitlintModule;

    expect(rootModule.default).toEqual(commitlintConfig);
  });
});
