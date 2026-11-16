import { describe, expect, it } from 'vitest';
import defaultPackageJson, {
  DEFAULT_PACKAGE_JSON_FILES,
  createPackageJsonConfig,
  packageJsonConfig,
} from './package-json.js';

describe('ESLint package.json Configuration (package-json.ts)', () => {
  it('should export identical named and default packageJsonConfig', () => {
    expect(defaultPackageJson).toBe(packageJsonConfig);
    expect(Array.isArray(packageJsonConfig)).toBe(true);
    expect(packageJsonConfig).toHaveLength(1);
  });

  it('should configure package-json recommended rules on default files', () => {
    const entry = packageJsonConfig[0];
    expect(entry?.name).toBe('@djblackeagle/dev-config-js/package-json');
    expect(entry?.files).toEqual([...DEFAULT_PACKAGE_JSON_FILES]);
    expect(entry?.ignores).toBeUndefined();
    expect(entry?.rules).toMatchObject({
      'package-json/valid-name': 'error',
      'package-json/valid-version': 'error',
    });
  });

  it('should support custom file patterns and ignores in createPackageJsonConfig', () => {
    const customConfig = createPackageJsonConfig({
      files: ['packages/*/package.json'],
      ignores: ['packages/legacy/package.json'],
    });

    const entry = customConfig[0];
    expect(entry?.files).toEqual(['packages/*/package.json']);
    expect(entry?.ignores).toEqual(['packages/legacy/package.json']);
  });
});
