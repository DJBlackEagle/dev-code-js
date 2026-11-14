import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

interface MarkdownlintConfig {
  config?: {
    default?: boolean;
    MD013?: {
      line_length?: number;
      tables?: boolean;
      code_blocks?: boolean;
    };
  };
  globs?: string[];
  ignores?: string[];
}

function parseJsonc(content: string): MarkdownlintConfig {
  const stripped = content.replace(/^\s*\/\/.*$/gm, '');
  /** JSON.parse returns any; safe to assert to MarkdownlintConfig after stripping line comments. */
  return JSON.parse(stripped) as MarkdownlintConfig;
}

describe('Markdownlint Configuration Preset (index.jsonc)', () => {
  it('should define default rules, MD013 prose line length, globs, and ignores', () => {
    const presetPath = path.join(import.meta.dirname, 'index.jsonc');
    const rawPreset = readFileSync(presetPath, 'utf8');
    const parsedPreset = parseJsonc(rawPreset);

    expect(parsedPreset).toEqual({
      config: {
        default: true,
        MD013: {
          line_length: 120,
          tables: false,
          code_blocks: false,
        },
      },
      globs: ['**/*.md'],
      ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/.tmp/**'],
    });
  });

  it('should stay strictly synchronized with the repository root .markdownlint-cli2.jsonc', () => {
    const presetPath = path.join(import.meta.dirname, 'index.jsonc');
    const rootPath = path.resolve(import.meta.dirname, '../../.markdownlint-cli2.jsonc');

    const presetContent = readFileSync(presetPath, 'utf8');
    const rootContent = readFileSync(rootPath, 'utf8');

    expect(parseJsonc(rootContent)).toEqual(parseJsonc(presetContent));
  });
});
