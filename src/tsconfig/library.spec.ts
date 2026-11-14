import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

interface TsConfigJson {
  $schema?: string;
  extends?: string;
  compilerOptions?: Record<string, unknown>;
}

describe('TypeScript Library Configuration Preset (library.json)', () => {
  it('should extend base.json and enable declarations and source maps', () => {
    const filePath = path.join(import.meta.dirname, 'library.json');
    /** JSON.parse returns any; safe to assert to TsConfigJson structure for spec assertions. */
    const config = JSON.parse(readFileSync(filePath, 'utf8')) as TsConfigJson;

    expect(config.$schema).toBe('https://json.schemastore.org/tsconfig');
    expect(config.extends).toBe('./base.json');
    expect(config.compilerOptions).toMatchObject({
      types: ['node'],
      declaration: true,
      declarationMap: true,
      sourceMap: true,
      outDir: './dist',
    });
  });
});
