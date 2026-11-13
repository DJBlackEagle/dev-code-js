import { describe, expect, it } from 'vitest';
import { PACKAGE_NAME } from './index.js';

describe('PACKAGE_NAME', () => {
  it('should export the correct package name', () => {
    expect(PACKAGE_NAME).toBe('@djblackeagle/dev-config-js');
  });
});
