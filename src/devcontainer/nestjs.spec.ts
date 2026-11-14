import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

interface DevContainerConfig {
  $schema?: string;
  name?: string;
  image?: string;
  remoteUser?: string;
  postCreateCommand?: string;
  forwardPorts?: number[];
  portsAttributes?: Record<string, unknown>;
  customizations?: {
    vscode?: {
      settings?: Record<string, unknown>;
      extensions?: string[];
    };
  };
}

describe('DevContainer NestJS Template (nestjs.json)', () => {
  it('should configure NestJS ports (3000, 9229) and backend VS Code extensions', () => {
    const filePath = path.join(import.meta.dirname, 'nestjs.json');
    /** JSON.parse returns any; safe to assert to DevContainerConfig structure for spec assertions. */
    const config = JSON.parse(readFileSync(filePath, 'utf8')) as DevContainerConfig;

    expect(config.$schema).toBe(
      'https://raw.githubusercontent.com/devcontainers/spec/main/schemas/devContainer.schema.json',
    );
    expect(config.name).toBe('Node.js 24 NestJS Backend');
    expect(config.image).toBe('mcr.microsoft.com/devcontainers/typescript-node:1-24-bookworm');
    expect(config.forwardPorts).toEqual([3000, 9229]);
    expect(config.portsAttributes).toMatchObject({
      '3000': {
        label: 'NestJS HTTP Server',
        onAutoForward: 'notify',
      },
      '9229': {
        label: 'Node.js Debugger',
        onAutoForward: 'silent',
      },
    });
    expect(config.customizations?.vscode?.extensions).toEqual(
      expect.arrayContaining([
        'dbaeumer.vscode-eslint',
        'esbenp.prettier-vscode',
        'humao.rest-client',
        'mikestead.dotenv',
        'vitest.explorer',
      ]),
    );
  });
});
