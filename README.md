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
