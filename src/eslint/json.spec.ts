import { describe, expect, it } from 'vitest';
import defaultJson, {
  DEFAULT_JSONC_FILES,
  DEFAULT_JSON_FILES,
  DEFAULT_JSON_IGNORES,
  createJsonConfig,
  jsonConfig,
} from './json.js';

describe('ESLint JSON Configuration (json.ts)', () => {
  it('should export identical named and default jsonConfig', () => {
    expect(defaultJson).toBe(jsonConfig);
    expect(Array.isArray(jsonConfig)).toBe(true);
    expect(jsonConfig).toHaveLength(2);
  });

  it('should configure strict JSON and JSONC file blocks with recommended rules', () => {
    const jsonBlock = jsonConfig.find((entry) => entry.name === '@djblackeagle/dev-config-js/json');
    expect(jsonBlock?.files).toEqual([...DEFAULT_JSON_FILES]);
    expect(jsonBlock?.ignores).toEqual([...DEFAULT_JSON_IGNORES, ...DEFAULT_JSONC_FILES]);
    expect(jsonBlock?.language).toBe('json/json');
    expect(jsonBlock?.rules).toMatchObject({
      'json/no-duplicate-keys': 'error',
      'json/no-empty-keys': 'error',
    });

    const jsoncBlock = jsonConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/jsonc',
    );
    expect(jsoncBlock?.files).toEqual([...DEFAULT_JSONC_FILES]);
    expect(jsoncBlock?.ignores).toEqual([...DEFAULT_JSON_IGNORES]);
    expect(jsoncBlock?.language).toBe('json/jsonc');
    expect(jsoncBlock?.rules).toMatchObject({
      'json/no-duplicate-keys': 'error',
      'json/no-empty-keys': 'error',
    });
  });

  it('should support custom file patterns and ignores in createJsonConfig', () => {
    const customConfig = createJsonConfig({
      jsonFiles: ['config/*.json'],
      jsoncFiles: ['config/*.jsonc'],
      ignores: ['vendor/**'],
    });

    const jsonBlock = customConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/json',
    );
    expect(jsonBlock?.files).toEqual(['config/*.json']);
    expect(jsonBlock?.ignores).toEqual(['vendor/**', 'config/*.jsonc']);

    const jsoncBlock = customConfig.find(
      (entry) => entry.name === '@djblackeagle/dev-config-js/jsonc',
    );
    expect(jsoncBlock?.files).toEqual(['config/*.jsonc']);
    expect(jsoncBlock?.ignores).toEqual(['vendor/**']);
  });
});
