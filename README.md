# Welcome to @djblackeagle/dev-config-js <!-- omit in toc -->

[![npm version](https://img.shields.io/npm/v/@djblackeagle/dev-config-js.svg)][REF_INTERN_URL_NPMJS_PACKAGE]
[![Downloads](https://img.shields.io/npm/dm/@djblackeagle/dev-config-js.svg)][REF_INTERN_URL_NPMJS_PACKAGE]
[![License](https://img.shields.io/badge/License-MIT-blue.svg)][REF_INTERN_FILE_MD_LICENSE]
[![CodeQL](https://github.com/DJBlackEagle/dev-code-js/actions/workflows/codeql.yml/badge.svg)][REF_INTERN_URL_WORKFLOW_CODEQL]
[![Build Status](https://github.com/DJBlackEagle/dev-code-js/actions/workflows/pullrequest-status-checks.yml/badge.svg)][REF_INTERN_URL_WORKFLOW_CQAT]
[![Code Style](https://img.shields.io/badge/code_style-@djblackeagle--dev--config--js-blue.svg)][REF_INTERN_FILE_MD_README]

Centralized, modular TypeScript, ESLint (Flat Config), Prettier, Markdownlint, Vitest, and Git tooling configuration
for Node.js, NestJS, and Angular projects.

## Table of Contents <!-- omit in toc -->

- [Benefits](#benefits)
- [Package Exports Overview](#package-exports-overview)
- [Getting Started](#getting-started)
- [End-to-End Stack Integration Guides](#end-to-end-stack-integration-guides)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [Security](#security)
- [License](#license)
- [Additional Resources](#additional-resources)

## Benefits

Using `@djblackeagle/dev-config-js` offers several advantages for your projects:

- **Single Source of Truth:** Unified configuration presets for TypeScript, ESLint, Prettier, Vitest, Markdownlint,
  Commitlint, and Lint-Staged across all repositories.
- **Modern ESM & Flat Config Architecture:** Built natively as an ECMAScript Module (`"type": "module"`) using the
  modern ESLint Flat Config system.
- **Modular & Composable:** Dedicated presets tailored for Shared TypeScript Libraries, NestJS Backends, and Angular
  Frontends.

## Package Exports Overview

| Export Path                                         | Target Tool       | Description                                                                      |
| :-------------------------------------------------- | :---------------- | :------------------------------------------------------------------------------- |
| `@djblackeagle/dev-config-js`                       | Central API       | Re-exports all JavaScript/TypeScript presets, factories, and types               |
| `@djblackeagle/dev-config-js/tsconfig/base.json`    | TypeScript        | Strict ES2023 / NodeNext base compiler configuration                             |
| `@djblackeagle/dev-config-js/tsconfig/library.json` | TypeScript        | Shared TypeScript library preset (`declaration`, `sourceMap`)                    |
| `@djblackeagle/dev-config-js/tsconfig/nestjs.json`  | TypeScript        | NestJS backend preset (`experimentalDecorators`, `emitDecoratorMetadata`)        |
| `@djblackeagle/dev-config-js/tsconfig/angular.json` | TypeScript        | Angular frontend preset (`bundler` resolution, `angularCompilerOptions`)         |
| `@djblackeagle/dev-config-js/prettier`              | Prettier          | Shared Prettier configuration (`singleQuote`, `printWidth: 100`, JSONC override) |
| `@djblackeagle/dev-config-js/eslint`                | ESLint 9+         | Stack presets (`presets.library`, `presets.nestjs`, `presets.angular`) & blocks  |
| `@djblackeagle/dev-config-js/markdownlint`          | markdownlint-cli2 | Shared Markdownlint ruleset (`MD013` 120 chars, standard ignores)                |
| `@djblackeagle/dev-config-js/vitest`                | Vitest            | Base Node.js / library test & V8 coverage preset (`vitestBaseConfig`)            |
| `@djblackeagle/dev-config-js/vitest/nestjs`         | Vitest            | NestJS test & V8 coverage preset (`vitestNestjsConfig`)                          |
| `@djblackeagle/dev-config-js/commitlint`            | Commitlint        | Conventional Commits preset (`commitlintConfig`, `createCommitlintConfig`)       |
| `@djblackeagle/dev-config-js/lint-staged`           | lint-staged       | Pre-commit staged files preset (`lintStagedConfig`, `createLintStagedConfig`)    |
| `@djblackeagle/dev-config-js/devcontainer/*.json`   | DevContainer      | Ready-to-use Node 24 DevContainer templates (`library`, `nestjs`, `angular`)     |

## Getting Started

This section will guide you through setting up and configuring `@djblackeagle/dev-config-js`
in your project.

```bash
pnpm add -D @djblackeagle/dev-config-js
```

### TypeScript (`tsconfig`) Presets

Extend one of the modular TypeScript presets in your project's `tsconfig.json`:

- **Shared Library (`@djblackeagle/dev-config-js/tsconfig/library.json`):**

  ```json
  {
    "$schema": "https://json.schemastore.org/tsconfig",
    "extends": "@djblackeagle/dev-config-js/tsconfig/library.json",
    "compilerOptions": {
      "outDir": "./dist",
      "rootDir": "./src"
    },
    "include": ["src/**/*"]
  }
  ```

- **NestJS Backend (`@djblackeagle/dev-config-js/tsconfig/nestjs.json`):**

  ```json
  {
    "$schema": "https://json.schemastore.org/tsconfig",
    "extends": "@djblackeagle/dev-config-js/tsconfig/nestjs.json",
    "compilerOptions": {
      "outDir": "./dist",
      "baseUrl": "./"
    },
    "include": ["src/**/*"]
  }
  ```

- **Angular Frontend (`@djblackeagle/dev-config-js/tsconfig/angular.json`):**

  ```json
  {
    "$schema": "https://json.schemastore.org/tsconfig",
    "extends": "@djblackeagle/dev-config-js/tsconfig/angular.json"
  }
  ```

- **Base Configuration (`@djblackeagle/dev-config-js/tsconfig/base.json`):**

  ```json
  {
    "$schema": "https://json.schemastore.org/tsconfig",
    "extends": "@djblackeagle/dev-config-js/tsconfig/base.json"
  }
  ```

### Prettier Preset

Reference the shared Prettier preset directly in your `package.json`:

```json
{
  "prettier": "@djblackeagle/dev-config-js/prettier"
}
```

Or import and extend it in `prettier.config.js` to customize options:

```js
import prettierConfig from '@djblackeagle/dev-config-js/prettier';

export default {
  ...prettierConfig,
};
```

### ESLint Flat Config Presets

Use one of the pre-assembled stack presets (`presets.library`, `presets.nestjs`, `presets.angular`) in your project's
`eslint.config.js`:

- **Shared TypeScript Library:**

  ```js
  import { presets } from '@djblackeagle/dev-config-js/eslint';

  export default [...presets.library];
  ```

- **NestJS Backend:**

  ```js
  import { presets } from '@djblackeagle/dev-config-js/eslint';

  export default [...presets.nestjs];
  ```

- **Angular Frontend:**

  ```js
  import { presets } from '@djblackeagle/dev-config-js/eslint';

  export default [...presets.angular];
  ```

- **Custom Composition (Individual Building Blocks):**

  ```js
  import {
    createBaseConfig,
    nestjsConfig,
    prettierEslintConfig,
    vitestConfig,
  } from '@djblackeagle/dev-config-js/eslint';

  export default [
    ...createBaseConfig({
      project: ['./tsconfig.eslint.json'],
      tsconfigRootDir: import.meta.dirname,
    }),
    ...nestjsConfig,
    ...vitestConfig,
    ...prettierEslintConfig,
  ];
  ```

### Markdownlint Preset

Run `markdownlint-cli2` with the shared configuration preset (`@djblackeagle/dev-config-js/markdownlint`):

```bash
pnpm exec markdownlint-cli2 --config node_modules/@djblackeagle/dev-config-js/dist/markdownlint/index.jsonc
```

Or extend/copy the preset in your project's `.markdownlint-cli2.jsonc`:

```jsonc
{
  "config": {
    "default": true,
    "MD013": {
      "line_length": 120,
      "tables": false,
      "code_blocks": false,
    },
  },
  "globs": ["**/*.md"],
  "ignores": ["**/node_modules/**", "**/dist/**", "**/coverage/**", "**/.tmp/**"],
}
```

### Vitest Presets

Use the modular Vitest presets in your project's `vitest.config.ts`:

- **Shared TypeScript Library / Node.js (`@djblackeagle/dev-config-js/vitest`):**

  ```ts
  import { vitestBaseConfig } from '@djblackeagle/dev-config-js/vitest';

  export default vitestBaseConfig;
  ```

- **NestJS Backend (`@djblackeagle/dev-config-js/vitest/nestjs`):**

  ```ts
  import { vitestNestjsConfig } from '@djblackeagle/dev-config-js/vitest/nestjs';

  export default vitestNestjsConfig;
  ```

- **Custom Overrides (`createVitestConfig` / `createNestjsVitestConfig`):**

  ```ts
  import { createVitestConfig } from '@djblackeagle/dev-config-js/vitest';

  export default createVitestConfig({
    test: {
      setupFiles: ['./test/setup.ts'],
    },
  });
  ```

### Commitlint Preset

Use the shared Commitlint Conventional Commits preset in your project's `commitlint.config.js`:

```js
import commitlintConfig from '@djblackeagle/dev-config-js/commitlint';

export default commitlintConfig;
```

Or customize rules using `createCommitlintConfig`:

```js
import { createCommitlintConfig } from '@djblackeagle/dev-config-js/commitlint';

export default createCommitlintConfig({
  rules: {
    'header-max-length': [2, 'always', 120],
  },
});
```

### Lint-Staged Preset

Use the shared `lint-staged` pre-commit preset in your project's `.lintstagedrc.js`:

```js
import lintStagedConfig from '@djblackeagle/dev-config-js/lint-staged';

export default lintStagedConfig;
```

Or extend the preset with custom file globs using `createLintStagedConfig`:

```js
import { createLintStagedConfig } from '@djblackeagle/dev-config-js/lint-staged';

export default createLintStagedConfig({
  '*.{html,scss}': ['prettier --write'],
});
```

### DevContainer Templates

Ready-to-use `.devcontainer/devcontainer.json` templates are included for Node.js 24 TypeScript projects:

- **Shared TypeScript Library:**

  ```bash
  mkdir -p .devcontainer && cp node_modules/@djblackeagle/dev-config-js/dist/devcontainer/library.json .devcontainer/devcontainer.json
  ```

- **NestJS Backend (forwards ports `3000` and `9229`):**

  ```bash
  mkdir -p .devcontainer && cp node_modules/@djblackeagle/dev-config-js/dist/devcontainer/nestjs.json .devcontainer/devcontainer.json
  ```

- **Angular Frontend (forwards port `4200` and includes Angular Language Service):**

  ```bash
  mkdir -p .devcontainer && cp node_modules/@djblackeagle/dev-config-js/dist/devcontainer/angular.json .devcontainer/devcontainer.json
  ```

## End-to-End Stack Integration Guides

Below are complete, copy-paste-ready setup recipes for integrating `@djblackeagle/dev-config-js` into new or existing
projects across all three supported stacks.

### 1. Shared TypeScript Library (Node.js / Universal)

1. **Install dependencies:**

   ```bash
   pnpm add -D @djblackeagle/dev-config-js typescript eslint husky
   ```

2. **Configure `package.json`:**

   ```json
   {
     "type": "module",
     "prettier": "@djblackeagle/dev-config-js/prettier",
     "scripts": {
       "prepare": "husky",
       "build": "tsc -p tsconfig.build.json",
       "typecheck": "tsc --noEmit",
       "lint": "eslint . && markdownlint-cli2 --config node_modules/@djblackeagle/dev-config-js/dist/markdownlint/index.jsonc",
       "lint:fix": "eslint . --fix && markdownlint-cli2 --fix --config node_modules/@djblackeagle/dev-config-js/dist/markdownlint/index.jsonc",
       "format": "prettier --check .",
       "format:fix": "prettier --write .",
       "test": "vitest run --coverage.enabled --coverage.reporter=text",
       "test:watch": "vitest"
     }
   }
   ```

3. **Create `tsconfig.json`, `tsconfig.build.json`, and `tsconfig.eslint.json`:**

   ```json
   // tsconfig.json
   {
     "$schema": "https://json.schemastore.org/tsconfig",
     "extends": "@djblackeagle/dev-config-js/tsconfig/library.json",
     "compilerOptions": {
       "outDir": "./dist",
       "rootDir": "."
     },
     "include": ["src/**/*", "tests/**/*", "eslint.config.js", "vitest.config.ts"]
   }
   ```

   ```json
   // tsconfig.build.json
   {
     "$schema": "https://json.schemastore.org/tsconfig",
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "rootDir": "./src"
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist", "coverage", "**/*.spec.ts", "**/*.test.ts"]
   }
   ```

   ```json
   // tsconfig.eslint.json
   {
     "$schema": "https://json.schemastore.org/tsconfig",
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "noEmit": true,
       "allowJs": true
     },
     "include": [
       "src/**/*",
       "tests/**/*",
       ".lintstagedrc.js",
       "commitlint.config.js",
       "eslint.config.js",
       "vitest.config.ts"
     ]
   }
   ```

4. **Create `eslint.config.js`, `vitest.config.ts`, `commitlint.config.js`, and `.lintstagedrc.js`:**

   ```js
   // eslint.config.js
   import { presets } from '@djblackeagle/dev-config-js/eslint';

   export default [...presets.library];
   ```

   ```ts
   // vitest.config.ts
   import { vitestBaseConfig } from '@djblackeagle/dev-config-js/vitest';

   export default vitestBaseConfig;
   ```

   ```js
   // commitlint.config.js
   import commitlintConfig from '@djblackeagle/dev-config-js/commitlint';

   export default commitlintConfig;
   ```

   ```js
   // .lintstagedrc.js
   import lintStagedConfig from '@djblackeagle/dev-config-js/lint-staged';

   export default lintStagedConfig;
   ```

---

### 2. NestJS Backend Service

1. **Install dependencies:**

   ```bash
   pnpm add -D @djblackeagle/dev-config-js typescript eslint husky
   ```

2. **Create `tsconfig.json`:**

   ```json
   {
     "$schema": "https://json.schemastore.org/tsconfig",
     "extends": "@djblackeagle/dev-config-js/tsconfig/nestjs.json",
     "compilerOptions": {
       "outDir": "./dist",
       "baseUrl": "./"
     },
     "include": ["src/**/*", "test/**/*"]
   }
   ```

3. **Create `eslint.config.js` and `vitest.config.ts`:**

   ```js
   // eslint.config.js
   import { presets } from '@djblackeagle/dev-config-js/eslint';

   export default [...presets.nestjs];
   ```

   ```ts
   // vitest.config.ts
   import { vitestNestjsConfig } from '@djblackeagle/dev-config-js/vitest/nestjs';

   export default vitestNestjsConfig;
   ```

---

### 3. Angular Frontend Application

1. **Install dependencies:**

   ```bash
   pnpm add -D @djblackeagle/dev-config-js typescript eslint husky
   ```

2. **Create `tsconfig.json`:**

   ```json
   {
     "$schema": "https://json.schemastore.org/tsconfig",
     "extends": "@djblackeagle/dev-config-js/tsconfig/angular.json"
   }
   ```

3. **Create `eslint.config.js` and `.lintstagedrc.js`:**

   ```js
   // eslint.config.js
   import { presets } from '@djblackeagle/dev-config-js/eslint';

   export default [...presets.angular];
   ```

   ```js
   // .lintstagedrc.js
   import { createLintStagedConfig } from '@djblackeagle/dev-config-js/lint-staged';

   export default createLintStagedConfig({
     '*.{html,scss}': ['prettier --write'],
   });
   ```

## Contributing

We welcome contributions from the community! If you're interested in helping to
improve `@djblackeagle/dev-config-js`, please take a look at our
[Contributing Guidelines][REF_INTERN_FILE_MD_CONTRIBUTING] for more information on how to get started.

## Code of Conduct

We are committed to fostering a welcoming and inclusive community. Please review
our [Code of Conduct][REF_INTERN_FILE_MD_CODE_OF_CONDUCT] to understand our
expectations for behavior within the project.

## Security

If you discover a security vulnerability in `@djblackeagle/dev-config-js`, please
follow our [Security Guidelines][REF_INTERN_FILE_MD_SECURITY] to report it responsibly.

## License

This project is licensed under the [MIT License][REF_INTERN_FILE_MD_LICENSE].

## Additional Resources

- [Agent & Engineering Guidelines][REF_INTERN_FILE_MD_AGENTS] – For detailed information
  on development standards, project structure, and `package.json` scripts.

[REF_INTERN_FILE_MD_AGENTS]: ./AGENTS.md
[REF_INTERN_FILE_MD_CODE_OF_CONDUCT]: ./CODE_OF_CONDUCT.md
[REF_INTERN_FILE_MD_CONTRIBUTING]: ./CONTRIBUTING.md
[REF_INTERN_FILE_MD_LICENSE]: ./LICENSE.md
[REF_INTERN_FILE_MD_README]: ./README.md
[REF_INTERN_FILE_MD_SECURITY]: ./SECURITY.md
[REF_INTERN_URL_NPMJS_PACKAGE]: https://www.npmjs.com/package/@djblackeagle/dev-config-js
[REF_INTERN_URL_WORKFLOW_CODEQL]: https://github.com/DJBlackEagle/dev-code-js/actions/workflows/codeql.yml
[REF_INTERN_URL_WORKFLOW_CQAT]: https://github.com/DJBlackEagle/dev-code-js/actions/workflows/pullrequest-status-checks.yml
