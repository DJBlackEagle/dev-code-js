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

describe('DevContainer Angular Template (angular.json)', () => {
  it('should configure Angular Dev Server port (4200) and Angular Language Service extension', () => {
    const filePath = path.join(import.meta.dirname, 'angular.json');
    /** JSON.parse returns any; safe to assert to DevContainerConfig structure for spec assertions. */
    const config = JSON.parse(readFileSync(filePath, 'utf8')) as DevContainerConfig;

    expect(config.$schema).toBe(
      'https://raw.githubusercontent.com/devcontainers/spec/main/schemas/devContainer.schema.json',
    );
    expect(config.name).toBe('Node.js 24 Angular Frontend');
    expect(config.image).toBe('mcr.microsoft.com/devcontainers/typescript-node:1-24-bookworm');
    expect(config.forwardPorts).toEqual([4200]);
    expect(config.portsAttributes).toMatchObject({
      '4200': {
        label: 'Angular Dev Server',
        onAutoForward: 'notify',
      },
    });
    expect(config.customizations?.vscode?.extensions).toEqual(
      expect.arrayContaining([
        'Angular.ng-template',
        'dbaeumer.vscode-eslint',
        'esbenp.prettier-vscode',
        'vitest.explorer',
      ]),
    );
  });
});
