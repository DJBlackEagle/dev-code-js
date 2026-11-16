import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');

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
  run('pnpm', ['add', '-D', 'vitest', '--prefer-offline'], consumerDir);

  writeFileSync(
    path.join(consumerDir, 'tsconfig.json'),
    [
      '{',
      '  "extends": "@djblackeagle/dev-config-js/tsconfig/library.json",',
      '  "compilerOptions": {',
      '    "noEmit": true,',
      '    "types": []',
      '  },',
      '  "include": ["src/**/*.ts", "vitest.config.ts"]',
      '}',
      '',
    ].join('\n'),
    'utf8',
  );

  writeFileSync(path.join(consumerDir, '.prettierignore'), 'pnpm-lock.yaml\n', 'utf8');

  writeFileSync(
    path.join(consumerDir, 'eslint.config.js'),
    "import { presets } from '@djblackeagle/dev-config-js/eslint';\n\nexport default [...presets.library];\n",
    'utf8',
  );

  writeFileSync(
    path.join(consumerDir, 'prettier.config.js'),
    "export { default } from '@djblackeagle/dev-config-js/prettier';\n",
    'utf8',
  );

  writeFileSync(
    path.join(consumerDir, 'vitest.config.ts'),
    "import { vitestPresets } from '@djblackeagle/dev-config-js/vitest';\n\nexport default vitestPresets.base;\n",
    'utf8',
  );

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
