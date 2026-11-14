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
- [Getting Started](#getting-started)
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
