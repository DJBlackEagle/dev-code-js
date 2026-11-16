import { describe, expect, it } from 'vitest';
import defaultYaml, {
  DEFAULT_YAML_FILES,
  DEFAULT_YAML_IGNORES,
  createYamlConfig,
  yamlConfig,
} from './yaml.js';

describe('ESLint YAML Configuration (yaml.ts)', () => {
  it('should export identical named and default yamlConfig', () => {
    expect(defaultYaml).toBe(yamlConfig);
    expect(Array.isArray(yamlConfig)).toBe(true);
    expect(yamlConfig.length).toBeGreaterThan(0);
  });

  it('should scope YAML rules and Prettier overrides with default files and ignores', () => {
    const firstEntry = yamlConfig[0];
    expect(firstEntry?.files).toEqual([...DEFAULT_YAML_FILES]);
    expect(firstEntry?.ignores).toEqual([...DEFAULT_YAML_IGNORES]);

    const hasYamlNoEmptyDocument = yamlConfig.some(
      (entry) => entry.rules?.['yml/no-empty-document'] !== undefined,
    );
    expect(hasYamlNoEmptyDocument).toBe(true);

    const disablesIndentForPrettier = yamlConfig.some(
      (entry) => entry.rules?.['yml/indent'] === 'off',
    );
    expect(disablesIndentForPrettier).toBe(true);
  });

  it('should support custom file patterns and ignores in createYamlConfig', () => {
    const customConfig = createYamlConfig({
      files: ['.github/workflows/*.yml'],
      ignores: ['vendor/**'],
    });

    const firstEntry = customConfig[0];
    expect(firstEntry?.files).toEqual(['.github/workflows/*.yml']);
    expect(firstEntry?.ignores).toEqual(['vendor/**']);
  });
});
