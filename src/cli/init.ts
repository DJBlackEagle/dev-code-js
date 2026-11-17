import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SUPPORTED_STACKS = ['library', 'nestjs', 'angular'] as const;

type StackType = (typeof SUPPORTED_STACKS)[number];

interface InitOptions {
  stack: StackType;
  cwd?: string;
  force?: boolean;
}

interface InitResult {
  created: string[];
  skipped: string[];
}

interface ParsedCliArgs {
  command?: string;
  stack?: string;
  force: boolean;
  help: boolean;
  unknownArg?: string;
}

interface CliIo {
  stdout: (message: string) => void;
  stderr: (message: string) => void;
}

const DEFAULT_IO: CliIo = {
  stdout: (message) => {
    process.stdout.write(`${message}\n`);
  },
  stderr: (message) => {
    process.stderr.write(`${message}\n`);
  },
};

const HELP_TEXT = [
  'Usage: dev-config-js init --stack <library|nestjs|angular> [--force]',
  '',
  'Options:',
  '  --stack <stack>   Target stack preset (library, nestjs, angular)',
  '  -f, --force       Overwrite existing configuration files',
  '  -h, --help        Show this help message',
].join('\n');

const MARKDOWNLINT_TEMPLATE = [
  '{',
  '  "config": {',
  '    "default": true,',
  '    "MD013": {',
  '      "line_length": 120,',
  '      "tables": false,',
  '      "code_blocks": false',
  '    }',
  '  },',
  '  "globs": ["**/*.md"],',
  '  "ignores": ["**/node_modules/**", "**/dist/**", "**/coverage/**"]',
  '}',
  '',
].join('\n');

function isStackType(value: string): value is StackType {
  return (SUPPORTED_STACKS as readonly string[]).includes(value);
}

function getTsConfigTemplate(stack: StackType): string {
  return [
    '{',
    `  "extends": "@djblackeagle/dev-config-js/tsconfig/${stack}.json",`,
    '  "compilerOptions": {',
    '    "outDir": "./dist",',
    '    "rootDir": "./src"',
    '  },',
    '  "include": ["src"]',
    '}',
    '',
  ].join('\n');
}

function getTemplatesForStack(stack: StackType): Record<string, string> {
  const templates: Record<string, string> = {
    'tsconfig.json': getTsConfigTemplate(stack),
    'eslint.config.js': [
      "import { presets } from '@djblackeagle/dev-config-js/eslint';",
      '',
      `export default [...presets.${stack}];`,
      '',
    ].join('\n'),
    'prettier.config.mjs': "export { default } from '@djblackeagle/dev-config-js/prettier';\n",
    'commitlint.config.js': "export { default } from '@djblackeagle/dev-config-js/commitlint';\n",
    '.lintstagedrc.js': "export { default } from '@djblackeagle/dev-config-js/lint-staged';\n",
    '.markdownlint-cli2.jsonc': MARKDOWNLINT_TEMPLATE,
  };

  if (stack === 'library') {
    templates['vitest.config.ts'] = [
      "import { vitestPresets } from '@djblackeagle/dev-config-js/vitest';",
      '',
      'export default vitestPresets.base;',
      '',
    ].join('\n');
  } else if (stack === 'nestjs') {
    templates['vitest.config.ts'] = [
      "import { vitestPresets } from '@djblackeagle/dev-config-js/vitest';",
      '',
      'export default vitestPresets.nestjs;',
      '',
    ].join('\n');
  }

  return templates;
}

function initProject(options: InitOptions): InitResult {
  const { stack, cwd = process.cwd(), force = false } = options;
  const templates = getTemplatesForStack(stack);
  const created: string[] = [];
  const skipped: string[] = [];

  for (const [relativePath, content] of Object.entries(templates)) {
    const targetPath = path.join(cwd, relativePath);
    if (!force && existsSync(targetPath)) {
      skipped.push(relativePath);
      continue;
    }

    mkdirSync(path.dirname(targetPath), { recursive: true });
    writeFileSync(targetPath, content, 'utf8');
    created.push(relativePath);
  }

  return { created, skipped };
}

function parseCliArgs(argv: readonly string[]): ParsedCliArgs {
  const result: ParsedCliArgs = {
    force: false,
    help: false,
  };

  let expectStackValue = false;

  for (const arg of argv) {
    if (expectStackValue) {
      result.stack = arg;
      expectStackValue = false;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      result.help = true;
    } else if (arg === '--force' || arg === '-f') {
      result.force = true;
    } else if (arg === '--stack') {
      expectStackValue = true;
    } else if (arg.startsWith('--stack=')) {
      result.stack = arg.slice('--stack='.length);
    } else if (!arg.startsWith('-') && result.command === undefined) {
      result.command = arg;
    } else {
      result.unknownArg = arg;
      break;
    }
  }

  return result;
}

function runCli(
  argv: readonly string[] = process.argv.slice(2),
  io: CliIo = DEFAULT_IO,
  cwd: string = process.cwd(),
): number {
  const parsed = parseCliArgs(argv);

  if (parsed.help) {
    io.stdout(HELP_TEXT);
    return 0;
  }

  if (parsed.unknownArg !== undefined) {
    io.stderr(`Unknown argument: ${parsed.unknownArg}`);
    io.stderr(HELP_TEXT);
    return 1;
  }

  if (parsed.command !== 'init') {
    io.stderr(
      parsed.command === undefined
        ? 'Missing command. Expected "init".'
        : `Unknown command: ${parsed.command}. Expected "init".`,
    );
    io.stderr(HELP_TEXT);
    return 1;
  }

  if (parsed.stack === undefined || !isStackType(parsed.stack)) {
    io.stderr(`Invalid or missing --stack. Expected one of: ${SUPPORTED_STACKS.join(', ')}.`);
    io.stderr(HELP_TEXT);
    return 1;
  }

  const result = initProject({
    stack: parsed.stack,
    cwd,
    force: parsed.force,
  });

  if (result.created.length > 0) {
    io.stdout(`Created (${parsed.stack}): ${result.created.join(', ')}`);
  }
  if (result.skipped.length > 0) {
    io.stdout(`Skipped (already exists): ${result.skipped.join(', ')}`);
  }

  return 0;
}

export {
  HELP_TEXT,
  SUPPORTED_STACKS,
  getTemplatesForStack,
  initProject,
  isStackType,
  parseCliArgs,
  runCli,
  type CliIo,
  type InitOptions,
  type InitResult,
  type ParsedCliArgs,
  type StackType,
};
