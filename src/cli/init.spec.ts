import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  HELP_TEXT,
  SUPPORTED_STACKS,
  getTemplatesForStack,
  initProject,
  isStackType,
  parseCliArgs,
  runCli,
} from './init.js';

describe('CLI Init (init.ts)', () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
      rmSync(dir, { recursive: true, force: true });
    }
    vi.restoreAllMocks();
  });

  function createTempDir(): string {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'dev-config-js-cli-test-'));
    tempDirs.push(dir);
    return dir;
  }

  it('should validate supported stacks via isStackType', () => {
    expect(SUPPORTED_STACKS).toEqual(['library', 'nestjs', 'angular']);
    expect(isStackType('library')).toBe(true);
    expect(isStackType('nestjs')).toBe(true);
    expect(isStackType('angular')).toBe(true);
    expect(isStackType('react')).toBe(false);
  });

  it('should generate stack-specific templates for library, nestjs, and angular', () => {
    const libraryTemplates = getTemplatesForStack('library');
    expect(Object.keys(libraryTemplates)).toContain('vitest.config.ts');
    expect(libraryTemplates['tsconfig.json']).toContain('tsconfig/library.json');
    expect(libraryTemplates['eslint.config.js']).toContain('presets.library');
    expect(libraryTemplates['vitest.config.ts']).toContain('vitestPresets.base');

    const nestjsTemplates = getTemplatesForStack('nestjs');
    expect(nestjsTemplates['tsconfig.json']).toContain('tsconfig/nestjs.json');
    expect(nestjsTemplates['eslint.config.js']).toContain('presets.nestjs');
    expect(nestjsTemplates['vitest.config.ts']).toContain('vitestPresets.nestjs');

    const angularTemplates = getTemplatesForStack('angular');
    expect(Object.keys(angularTemplates)).not.toContain('vitest.config.ts');
    expect(angularTemplates['tsconfig.json']).toContain('tsconfig/angular.json');
    expect(angularTemplates['eslint.config.js']).toContain('presets.angular');
  });

  it('should scaffold files, skip existing ones, and overwrite when force is true', () => {
    const dir = createTempDir();

    const firstRun = initProject({ stack: 'library', cwd: dir });
    expect(firstRun.created).toEqual([
      'tsconfig.json',
      'eslint.config.js',
      'prettier.config.mjs',
      'commitlint.config.js',
      '.lintstagedrc.js',
      '.markdownlint-cli2.jsonc',
      'vitest.config.ts',
    ]);
    expect(firstRun.skipped).toEqual([]);

    writeFileSync(path.join(dir, 'prettier.config.mjs'), '// custom\n', 'utf8');

    const secondRun = initProject({ stack: 'library', cwd: dir });
    expect(secondRun.created).toEqual([]);
    expect(secondRun.skipped).toEqual(firstRun.created);
    expect(readFileSync(path.join(dir, 'prettier.config.mjs'), 'utf8')).toBe('// custom\n');

    const forcedRun = initProject({ stack: 'library', cwd: dir, force: true });
    expect(forcedRun.created).toEqual(firstRun.created);
    expect(forcedRun.skipped).toEqual([]);
    expect(readFileSync(path.join(dir, 'prettier.config.mjs'), 'utf8')).toContain(
      '@djblackeagle/dev-config-js/prettier',
    );
  });

  it('should parse CLI arguments accurately', () => {
    expect(parseCliArgs(['init', '--stack', 'library'])).toEqual({
      command: 'init',
      stack: 'library',
      force: false,
      help: false,
    });

    expect(parseCliArgs(['init', '--stack=nestjs', '-f'])).toEqual({
      command: 'init',
      stack: 'nestjs',
      force: true,
      help: false,
    });

    expect(parseCliArgs(['--help'])).toEqual({
      force: false,
      help: true,
    });

    expect(parseCliArgs(['init', '--stack'])).toEqual({
      command: 'init',
      force: false,
      help: false,
    });

    expect(parseCliArgs(['init', '--unknown', 'extra'])).toEqual({
      command: 'init',
      force: false,
      help: false,
      unknownArg: '--unknown',
    });
  });

  it('should handle help, validation errors, and successful runs in runCli', () => {
    const stdoutMessages: string[] = [];
    const stderrMessages: string[] = [];
    const io = {
      stdout: (message: string) => stdoutMessages.push(message),
      stderr: (message: string) => stderrMessages.push(message),
    };

    expect(runCli(['-h'], io)).toBe(0);
    expect(stdoutMessages).toEqual([HELP_TEXT]);

    expect(runCli(['init', '--bogus'], io)).toBe(1);
    expect(stderrMessages[0]).toContain('Unknown argument: --bogus');

    stderrMessages.length = 0;
    expect(runCli([], io)).toBe(1);
    expect(stderrMessages[0]).toContain('Missing command');

    stderrMessages.length = 0;
    expect(runCli(['unknown'], io)).toBe(1);
    expect(stderrMessages[0]).toContain('Unknown command: unknown');

    stderrMessages.length = 0;
    expect(runCli(['init', '--stack', 'invalid'], io)).toBe(1);
    expect(stderrMessages[0]).toContain('Invalid or missing --stack');

    const dir = createTempDir();
    stdoutMessages.length = 0;
    expect(runCli(['init', '--stack', 'angular'], io, dir)).toBe(0);
    expect(stdoutMessages[0]).toContain('Created (angular):');

    stdoutMessages.length = 0;
    expect(runCli(['init', '--stack=angular'], io, dir)).toBe(0);
    expect(stdoutMessages[0]).toContain('Skipped (already exists):');
  });

  it('should write to process.stdout and process.stderr using default IO', () => {
    const stdoutSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    expect(runCli(['--help'])).toBe(0);
    expect(stdoutSpy).toHaveBeenCalledWith(`${HELP_TEXT}\n`);

    expect(runCli([])).toBe(1);
    expect(stderrSpy).toHaveBeenCalled();
  });
});
