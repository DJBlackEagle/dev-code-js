import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');

const EXPECTED_CLI_FILES = [
  'tsconfig.json',
  'eslint.config.js',
  'prettier.config.mjs',
  'commitlint.config.js',
  '.lintstagedrc.js',
  '.markdownlint-cli2.jsonc',
  'vitest.config.ts',
];

function run(command, args, cwd) {
  process.stdout.write(`> ${command} ${args.join(' ')}\n`);
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
  });
}

function writeJson(filePath, data) {
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function createConsumerProject(consumerDir, tarballPath) {
  const srcDir = path.join(consumerDir, 'src');
  mkdirSync(srcDir, { recursive: true });

  writeJson(path.join(consumerDir, 'package.json'), {
    name: 'dev-config-js-smoke-consumer',
    version: '0.0.0',
    description: 'Minimal consumer project for smoke testing.',
    private: true,
    type: 'module',
  });

  run('pnpm', ['add', tarballPath], consumerDir);
  run('pnpm', ['add', '-D', 'vitest', '@types/node', '--prefer-offline'], consumerDir);
  run('pnpm', ['exec', 'dev-config-js', 'init', '--stack', 'library'], consumerDir);

  for (const file of EXPECTED_CLI_FILES) {
    if (!existsSync(path.join(consumerDir, file))) {
      throw new Error(`Expected CLI-generated file to exist: ${file}`);
    }
  }

  writeFileSync(path.join(consumerDir, '.prettierignore'), 'pnpm-lock.yaml\n', 'utf8');

  writeFileSync(
    path.join(srcDir, 'index.ts'),
    [
      'function greet(name: string): string {',
      '  return `Hello, ${name}!`;',
      '}',
      '',
      'export { greet };',
      '',
    ].join('\n'),
    'utf8',
  );

  writeFileSync(
    path.join(srcDir, 'index.spec.ts'),
    [
      "import { describe, expect, it } from 'vitest';",
      "import { greet } from './index.js';",
      '',
      "describe('greet', () => {",
      "  it('returns a greeting message', () => {",
      "    expect(greet('world')).toBe('Hello, world!');",
      '  });',
      '});',
      '',
    ].join('\n'),
    'utf8',
  );

  writeFileSync(
    path.join(consumerDir, 'README.md'),
    '# Smoke Consumer\n\nMinimal consumer project for smoke testing.\n',
    'utf8',
  );
}

function main() {
  const tempRoot = mkdtempSync(path.join(os.tmpdir(), 'dev-config-js-smoke-'));
  const packDir = path.join(tempRoot, 'pack');
  const consumerDir = path.join(tempRoot, 'consumer');

  try {
    mkdirSync(packDir, { recursive: true });
    run('pnpm', ['pack', '--pack-destination', packDir], repoRoot);

    const tarballs = readdirSync(packDir).filter((file) => file.endsWith('.tgz'));
    if (tarballs.length !== 1) {
      throw new Error(`Expected 1 packed tarball in ${packDir}, found ${String(tarballs.length)}`);
    }

    const tarballPath = path.join(packDir, tarballs[0]);
    createConsumerProject(consumerDir, tarballPath);

    run('pnpm', ['exec', 'tsc', '--noEmit'], consumerDir);
    run('pnpm', ['exec', 'eslint', '.'], consumerDir);
    run('pnpm', ['exec', 'prettier', '--check', '.'], consumerDir);
    run('pnpm', ['exec', 'vitest', 'run'], consumerDir);
    run(
      'pnpm',
      [
        'exec',
        'markdownlint-cli2',
        '--config',
        'node_modules/@djblackeagle/dev-config-js/dist/markdownlint/index.jsonc',
      ],
      consumerDir,
    );

    process.stdout.write('Consumer smoke test passed!\n');
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
}

main();
