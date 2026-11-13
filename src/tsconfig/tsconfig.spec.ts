import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

interface TsConfigJson {
  $schema?: string;
  extends?: string;
  compilerOptions?: Record<string, unknown>;
  angularCompilerOptions?: Record<string, unknown>;
}

const TSCONFIG_DIR = import.meta.dirname;

function loadTsConfig(filename: string): TsConfigJson {
  const filePath = path.join(TSCONFIG_DIR, filename);
  const content = readFileSync(filePath, 'utf8');
  /** JSON.parse returns unknown/any; safe to assert to TsConfigJson structure for spec assertions. */
  return JSON.parse(content) as TsConfigJson;
}

describe('TypeScript Configuration Presets (tsconfig)', () => {
  describe('base.json', () => {
    it('should define strict baseline compiler options', () => {
      const config = loadTsConfig('base.json');

      expect(config.$schema).toBe('https://json.schemastore.org/tsconfig');
      expect(config.compilerOptions).toMatchObject({
        target: 'ES2023',
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
        strict: true,
        noImplicitAny: true,
        strictNullChecks: true,
        noUncheckedIndexedAccess: true,
        exactOptionalPropertyTypes: true,
        noImplicitOverride: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        verbatimModuleSyntax: true,
        isolatedModules: true,
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        skipLibCheck: true,
      });
    });
  });

  describe('library.json', () => {
    it('should extend base.json and enable declarations and source maps', () => {
      const config = loadTsConfig('library.json');

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

  describe('nestjs.json', () => {
    it('should extend base.json and configure decorator metadata for NestJS', () => {
      const config = loadTsConfig('nestjs.json');

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

  describe('angular.json', () => {
    it('should extend base.json and configure DOM libraries and strict Angular compiler options', () => {
      const config = loadTsConfig('angular.json');

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
});
