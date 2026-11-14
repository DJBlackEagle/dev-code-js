import { describe, expect, it } from 'vitest';
import { eslintPresets as directEslintPresets } from './eslint/index.js';
import { PACKAGE_NAME, eslintPresets, prettierConfig, vitestPresets } from './index.js';
import { prettierConfig as directPrettierConfig } from './prettier/index.js';
import { vitestPresets as directVitestPresets } from './vitest/index.js';

describe('Public Root Exports (index)', () => {
  it('should export the correct package name', () => {
    expect(PACKAGE_NAME).toBe('@djblackeagle/dev-config-js');
  });

  it('should re-export prettierConfig from the root entrypoint', () => {
    expect(prettierConfig).toBe(directPrettierConfig);
  });

  it('should re-export eslintPresets from the root entrypoint', () => {
    expect(eslintPresets).toBe(directEslintPresets);
  });

  it('should re-export vitestPresets from the root entrypoint', () => {
    expect(vitestPresets).toBe(directVitestPresets);
  });
});
