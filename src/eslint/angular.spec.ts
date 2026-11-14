import { describe, expect, it } from 'vitest';
import defaultAngular, { angularConfig, createAngularConfig } from './angular.js';

describe('ESLint Angular Configuration (angular.ts)', () => {
  it('should export identical named and default angularConfig with default "app" prefix', () => {
    expect(defaultAngular).toBe(angularConfig);

    const selectorBlock = angularConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/angular-selectors',
    );
    expect(selectorBlock?.rules?.['@angular-eslint/component-selector']).toEqual([
      'error',
      {
        type: 'element',
        prefix: 'app',
        style: 'kebab-case',
      },
    ]);
  });

  it('should support custom selector prefix via createAngularConfig', () => {
    const customAngular = createAngularConfig({ prefix: 'ui' });
    const selectorBlock = customAngular.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/angular-selectors',
    );
    expect(selectorBlock?.rules?.['@angular-eslint/directive-selector']).toEqual([
      'error',
      {
        type: 'attribute',
        prefix: 'ui',
        style: 'camelCase',
      },
    ]);
  });
});
