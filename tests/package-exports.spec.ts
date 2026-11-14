import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  PACKAGE_NAME,
  angularConfig,
  baseConfig,
  commitlintConfig,
  createAngularConfig,
  createBaseConfig,
  createCommitlintConfig,
  createLintStagedConfig,
  createNestjsVitestConfig,
  createVitestConfig,
  eslintPresets,
  lintStagedConfig,
  nestjsConfig,
  prettierConfig,
  prettierEslintConfig,
  vitestBaseConfig,
  vitestConfig,
  vitestNestjsConfig,
  vitestPresets,
} from '../src/index.js';

interface PackageJsonStructure {
  name: string;
  type: string;
  exports: Record<string, unknown>;
  dependencies: Record<string, string>;
}

const repoRoot = path.resolve(import.meta.dirname, '..');

describe('End-to-End Package Verification & Stack Presets', () => {
  it('should define all expected subpath exports in package.json', () => {
    const packageJsonPath = path.join(repoRoot, 'package.json');
    /** JSON.parse returns any; safe to assert to PackageJsonStructure for verification. */
    const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as PackageJsonStructure;

    expect(pkg.name).toBe(PACKAGE_NAME);
    expect(pkg.type).toBe('module');
    expect(Object.keys(pkg.exports)).toEqual([
      '.',
      './commitlint',
      './devcontainer/*',
      './devcontainer/*.json',
      './eslint',
      './eslint/*',
      './lint-staged',
      './markdownlint',
      './markdownlint/index.jsonc',
      './prettier',
      './tsconfig/*',
      './tsconfig/*.json',
      './vitest',
      './vitest/*',
    ]);
  });

  it('should ship all static JSON and JSONC configuration assets under src/', () => {
    const expectedAssets = [
      'src/tsconfig/base.json',
      'src/tsconfig/library.json',
      'src/tsconfig/nestjs.json',
      'src/tsconfig/angular.json',
      'src/markdownlint/index.jsonc',
      'src/devcontainer/library.json',
      'src/devcontainer/nestjs.json',
      'src/devcontainer/angular.json',
    ];

    for (const relativeAssetPath of expectedAssets) {
      const fullPath = path.join(repoRoot, relativeAssetPath);
      expect(existsSync(fullPath)).toBe(true);
    }
  });

  it('should provide complete and cohesive presets for the Shared TypeScript Library stack', () => {
    expect(Array.isArray(eslintPresets.library)).toBe(true);
    expect(eslintPresets.library.length).toBeGreaterThan(0);
    expect(vitestPresets.base).toBe(vitestBaseConfig);
    expect(createVitestConfig().test?.environment).toBe('node');
    expect(prettierConfig.singleQuote).toBe(true);
    expect(commitlintConfig.extends).toEqual(['@commitlint/config-conventional']);
    expect(lintStagedConfig['*.{ts,tsx}']).toEqual(['eslint --fix', 'prettier --write']);
  });

  it('should provide complete and cohesive presets for the NestJS Backend stack', () => {
    expect(Array.isArray(eslintPresets.nestjs)).toBe(true);
    expect(eslintPresets.nestjs.length).toBeGreaterThan(eslintPresets.library.length);
    expect(Array.isArray(nestjsConfig)).toBe(true);
    expect(vitestPresets.nestjs).toBe(vitestNestjsConfig);
    expect(createNestjsVitestConfig().test?.coverage?.exclude).toContain('src/main.ts');
  });

  it('should provide complete and cohesive presets for the Angular Frontend stack', () => {
    expect(Array.isArray(eslintPresets.angular)).toBe(true);
    expect(eslintPresets.angular.length).toBeGreaterThan(eslintPresets.library.length);
    expect(Array.isArray(angularConfig)).toBe(true);
    expect(createAngularConfig({ prefix: 'ui' }).length).toBeGreaterThan(0);

    const angularLintStaged = createLintStagedConfig({
      '*.{html,scss}': ['prettier --write'],
    });
    expect(angularLintStaged['*.{html,scss}']).toEqual(['prettier --write']);
  });

  it('should expose all composable building blocks and factory functions from the root entrypoint', () => {
    expect(Array.isArray(baseConfig)).toBe(true);
    expect(Array.isArray(createBaseConfig())).toBe(true);
    expect(Array.isArray(vitestConfig)).toBe(true);
    expect(Array.isArray(prettierEslintConfig)).toBe(true);
    expect(createCommitlintConfig().extends).toEqual(['@commitlint/config-conventional']);
  });
});
