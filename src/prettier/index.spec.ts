import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import defaultPrettierConfig, { prettierConfig } from './index.js';

interface RootPrettierRc extends Record<string, unknown> {
  $schema?: string;
}

describe('Prettier Configuration Preset (prettierConfig)', () => {
  it('should export identical named and default configurations', () => {
    expect(defaultPrettierConfig).toBe(prettierConfig);
  });

  it('should define standard formatting rules', () => {
    expect(prettierConfig).toMatchObject({
      semi: true,
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      bracketSpacing: true,
      arrowParens: 'always',
      endOfLine: 'lf',
    });
  });

  it('should disable trailing commas for *.jsonc files via overrides', () => {
    expect(prettierConfig.overrides).toEqual([
      {
        files: ['*.jsonc'],
        options: {
          trailingComma: 'none',
        },
      },
    ]);
  });

  it('should stay strictly synchronized with the repository root .prettierrc.json', () => {
    const rootPrettierRcPath = path.resolve(import.meta.dirname, '../../.prettierrc.json');
    const rawContent = readFileSync(rootPrettierRcPath, 'utf8');
    /** JSON.parse returns any; safe to assert to RootPrettierRc for synchronization check. */
    const { $schema: _schema, ...rootOptions } = JSON.parse(rawContent) as RootPrettierRc;

    expect(rootOptions).toEqual(prettierConfig);
  });
});
