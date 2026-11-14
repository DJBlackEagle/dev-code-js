import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

interface TsConfigJson {
  $schema?: string;
  extends?: string;
  compilerOptions?: Record<string, unknown>;
  angularCompilerOptions?: Record<string, unknown>;
}

describe('TypeScript Angular Configuration Preset (angular.json)', () => {
  it('should extend base.json and configure DOM libraries and strict Angular compiler options', () => {
    const filePath = path.join(import.meta.dirname, 'angular.json');
    /** JSON.parse returns any; safe to assert to TsConfigJson structure for spec assertions. */
    const config = JSON.parse(readFileSync(filePath, 'utf8')) as TsConfigJson;

    expect(config.$schema).toBe('https://json.schemastore.org/tsconfig');
    expect(config.extends).toBe('./base.json');
    expect(config.compilerOptions).toMatchObject({
      target: 'ES2022',
      module: 'ES2022',
      moduleResolution: 'bundler',
      lib: ['ES2023', 'DOM', 'DOM.Iterable'],
      experimentalDecorators: true,
      useDefineForClassFields: false,
      sourceMap: true,
      declaration: false,
    });
    expect(config.angularCompilerOptions).toMatchObject({
      enableI18nLegacyMessageIdFormat: false,
      strictInjectionParameters: true,
      strictInputAccessModifiers: true,
      strictTemplates: true,
    });
  });
});
