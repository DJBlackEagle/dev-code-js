import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

interface DevContainerConfig {
  $schema?: string;
  name?: string;
  image?: string;
  remoteUser?: string;
  postCreateCommand?: string;
  features?: Record<string, unknown>;
  customizations?: {
    vscode?: {
      settings?: Record<string, unknown>;
      extensions?: string[];
    };
  };
}

describe('DevContainer Library Template (library.json)', () => {
  it('should configure Node 24 image, pnpm postCreateCommand, and core VS Code extensions', () => {
    const filePath = path.join(import.meta.dirname, 'library.json');
    /** JSON.parse returns any; safe to assert to DevContainerConfig structure for spec assertions. */
    const config = JSON.parse(readFileSync(filePath, 'utf8')) as DevContainerConfig;

    expect(config.$schema).toBe(
      'https://raw.githubusercontent.com/devcontainers/spec/main/schemas/devContainer.schema.json',
    );
    expect(config.name).toBe('Node.js 24 TypeScript Library');
    expect(config.image).toBe('mcr.microsoft.com/devcontainers/typescript-node:1-24-bookworm');
    expect(config.remoteUser).toBe('node');
    expect(config.postCreateCommand).toBe('corepack enable && pnpm install');
    expect(config.customizations?.vscode?.settings).toMatchObject({
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      'editor.formatOnSave': true,
      'eslint.useFlatConfig': true,
    });
    expect(config.customizations?.vscode?.extensions).toEqual(
      expect.arrayContaining([
        'dbaeumer.vscode-eslint',
        'esbenp.prettier-vscode',
        'vitest.explorer',
      ]),
    );
  });
});
