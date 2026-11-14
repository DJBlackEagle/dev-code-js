import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

interface TsConfigJson {
  $schema?: string;
  extends?: string;
  compilerOptions?: Record<string, unknown>;
}

describe('TypeScript Base Configuration Preset (base.json)', () => {
  it('should define strict baseline compiler options', () => {
    const filePath = path.join(import.meta.dirname, 'base.json');
    /** JSON.parse returns any; safe to assert to TsConfigJson structure for spec assertions. */
    const config = JSON.parse(readFileSync(filePath, 'utf8')) as TsConfigJson;

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
