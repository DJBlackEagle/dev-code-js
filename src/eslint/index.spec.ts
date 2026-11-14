import { describe, expect, it } from 'vitest';
import { angularConfig } from './angular.js';
import { baseConfig } from './base.js';
import defaultIndex, { eslintPresets, presets } from './index.js';
import { nestjsConfig } from './nestjs.js';
import { prettierEslintConfig } from './prettier.js';
import { vitestConfig } from './vitest.js';

describe('ESLint Presets Barrel (index.ts)', () => {
  it('should export presets for library, nestjs, and angular', () => {
    expect(defaultIndex).toBe(eslintPresets);
    expect(presets).toBe(eslintPresets);
    expect(eslintPresets.library.length).toBe(
      baseConfig.length + vitestConfig.length + prettierEslintConfig.length,
    );
    expect(eslintPresets.nestjs.length).toBe(
      baseConfig.length + nestjsConfig.length + vitestConfig.length + prettierEslintConfig.length,
    );
    expect(eslintPresets.angular.length).toBe(
      baseConfig.length + angularConfig.length + vitestConfig.length + prettierEslintConfig.length,
    );
  });
});
