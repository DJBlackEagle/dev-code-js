import { describe, expect, it } from 'vitest';
import { angularConfig } from './angular.js';
import { baseConfig } from './base.js';
import { cssConfig } from './css.js';
import defaultIndex, { eslintPresets, presets } from './index.js';
import { jsonConfig } from './json.js';
import { markdownEslintConfig } from './markdown.js';
import { nestjsConfig } from './nestjs.js';
import { packageJsonConfig } from './package-json.js';
import { prettierEslintConfig } from './prettier.js';
import { vitestConfig } from './vitest.js';
import { yamlConfig } from './yaml.js';

describe('ESLint Presets Barrel (index.ts)', () => {
  it('should export presets for library, nestjs, and angular', () => {
    expect(defaultIndex).toBe(eslintPresets);
    expect(presets).toBe(eslintPresets);
    expect(eslintPresets.library.length).toBe(
      baseConfig.length +
        jsonConfig.length +
        packageJsonConfig.length +
        yamlConfig.length +
        markdownEslintConfig.length +
        vitestConfig.length +
        prettierEslintConfig.length,
    );
    expect(eslintPresets.nestjs.length).toBe(
      baseConfig.length +
        jsonConfig.length +
        packageJsonConfig.length +
        yamlConfig.length +
        markdownEslintConfig.length +
        nestjsConfig.length +
        vitestConfig.length +
        prettierEslintConfig.length,
    );
    expect(eslintPresets.angular.length).toBe(
      baseConfig.length +
        jsonConfig.length +
        packageJsonConfig.length +
        yamlConfig.length +
        markdownEslintConfig.length +
        cssConfig.length +
        angularConfig.length +
        vitestConfig.length +
        prettierEslintConfig.length,
    );
  });
});
