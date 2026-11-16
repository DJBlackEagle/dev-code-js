import packageJson from 'eslint-plugin-package-json';
import type { ConfigArray } from 'typescript-eslint';

interface PackageJsonConfigOptions {
  files?: string[];
  ignores?: string[];
}

const DEFAULT_PACKAGE_JSON_FILES = ['**/package.json'] as const;

/**
 * Creates a flat ESLint configuration array for `package.json` files using `eslint-plugin-package-json`.
 * @param options - Optional file patterns and ignores for `package.json` linting.
 * @returns The ESLint flat configuration array for `package.json` files.
 */
function createPackageJsonConfig(options: PackageJsonConfigOptions = {}): ConfigArray {
  const { files = [...DEFAULT_PACKAGE_JSON_FILES], ignores } = options;

  return [
    {
      ...packageJson.configs.recommended,
      name: '@djblackeagle/dev-config-js/package-json',
      files,
      ...(ignores !== undefined ? { ignores } : {}),
    },
  ];
}

const packageJsonConfig: ConfigArray = createPackageJsonConfig();

export {
  DEFAULT_PACKAGE_JSON_FILES,
  createPackageJsonConfig,
  packageJsonConfig,
  type PackageJsonConfigOptions,
};
export default packageJsonConfig;
