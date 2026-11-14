import { describe, expect, it } from 'vitest';
import { vitestBaseConfig } from './base.js';
import defaultVitest, { vitestPresets } from './index.js';
import { vitestNestjsConfig } from './nestjs.js';

describe('Vitest Presets Barrel (index.ts)', () => {
  it('should export vitestBaseConfig as default export', () => {
    expect(defaultVitest).toBe(vitestBaseConfig);
  });

  it('should expose base and nestjs presets via vitestPresets', () => {
    expect(vitestPresets).toEqual({
      base: vitestBaseConfig,
      nestjs: vitestNestjsConfig,
    });
  });
});
