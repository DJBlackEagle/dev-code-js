import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

interface TsConfigJson {
  $schema?: string;
  extends?: string;
  compilerOptions?: Record<string, unknown>;
}

describe('TypeScript NestJS Configuration Preset (nestjs.json)', () => {
  it('should extend base.json and configure decorator metadata for NestJS', () => {
    const filePath = path.join(import.meta.dirname, 'nestjs.json');
    /** JSON.parse returns any; safe to assert to TsConfigJson structure for spec assertions. */
    const config = JSON.parse(readFileSync(filePath, 'utf8')) as TsConfigJson;

    expect(config.$schema).toBe('https://json.schemastore.org/tsconfig');
    expect(config.extends).toBe('./base.json');
    expect(config.compilerOptions).toMatchObject({
      types: ['node'],
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      strictPropertyInitialization: false,
      verbatimModuleSyntax: false,
      isolatedModules: false,
      declaration: true,
      removeComments: true,
      sourceMap: true,
      incremental: true,
      outDir: './dist',
    });
  });
});
