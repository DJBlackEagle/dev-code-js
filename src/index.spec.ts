import { describe, expect, it } from 'vitest';
import { PACKAGE_NAME, prettierConfig } from './index.js';
import { prettierConfig as directPrettierConfig } from './prettier/index.js';

describe('Public Root Exports (index)', () => {
  it('should export the correct package name', () => {
    expect(PACKAGE_NAME).toBe('@djblackeagle/dev-config-js');
  });

  it('should re-export prettierConfig from the root entrypoint', () => {
    expect(prettierConfig).toBe(directPrettierConfig);
  });
});
