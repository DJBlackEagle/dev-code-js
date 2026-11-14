# Agent Guidelines & Engineering Standards: @djblackeagle/dev-config-js

This document defines binding engineering standards, architectural rules, and developer workflows for AI coding
assistants (Gemini, Antigravity, etc.) writing, refactoring, or testing code in this repository.

---

## 1. Tech Stack & Runtime Environment

- **Runtime:** Node.js 24 (LTS) in a DevContainer environment
- **Package Manager:** `pnpm` (exclusively use `pnpm` – never `npm` or `yarn`)
- **Module System:** Pure ECMAScript Modules (`"type": "module"` in `package.json`)
- **Language:** TypeScript 5+ with strict type checking (`"strict": true`, `"verbatimModuleSyntax": true`)
- **Target Stacks Provided by Package:**
  - **Shared Libraries:** Pure TypeScript (Node.js & Universal)
  - **Backend:** NestJS
  - **Frontend:** Angular
- **Testing:** `vitest` with V8 coverage (`@vitest/coverage-v8`) and test UI (`@vitest/ui`)
- **Linting & Formatting:** ESLint 9 (Flat Config `eslint.config.js` with `typescript-eslint` Strict/Stylistic type
  checking), `markdownlint-cli2`, and Prettier
- **Git Tooling:** `husky`, `commitlint` (`@commitlint/config-conventional`), and `lint-staged`

---

## 2. Project Structure & Test Conventions

- **Strict Source / Root Separation:** All exported package presets and configurations reside under `src/` and
  compile/copy into `dist/` during the build step. Root configuration files (`tsconfig*.json`, `eslint.config.js`,
  `.prettierrc.json`, `.markdownlint-cli2.jsonc`, `.lintstagedrc.js`, `commitlint.config.js`, `vitest.config.ts`)
  belong exclusively to this repository's own development workflow (Self-Dogfooding).
- **Co-located Specs:** All unit tests reside directly alongside their corresponding source file as `*.spec.ts`
  (e.g., `src/index.ts` and `src/index.spec.ts`). The file extension `*.test.ts` is strictly prohibited.
- **Integration Tests:** End-to-end and preset verification tests reside under `tests/`.
- **Build Isolation:** `tsconfig.build.json` strictly excludes all `*.spec.ts` files and `tests/` from the production
  build (`dist/`).

```text
├── src/
│   ├── eslint/
│   │   ├── angular.ts               # Angular ESLint Flat Config Building Block
│   │   ├── angular.spec.ts          # Co-located Unit Spec
│   │   ├── base.ts                  # Strict Base JS/TS + JSDoc ESLint Config
│   │   ├── base.spec.ts             # Co-located Unit Spec
│   │   ├── index.ts                 # Central ESLint Exports & Stack Presets
│   │   ├── index.spec.ts            # Co-located Unit Spec
│   │   ├── nestjs.ts                # NestJS ESLint Flat Config Building Block
│   │   ├── nestjs.spec.ts           # Co-located Unit Spec
│   │   ├── prettier.ts              # Prettier Rule Conflict Disabler
│   │   ├── prettier.spec.ts         # Co-located Unit Spec
│   │   ├── vitest.ts                # Vitest Spec/Test ESLint Building Block
│   │   └── vitest.spec.ts           # Co-located Unit Spec
│   ├── prettier/
│   │   ├── index.ts                 # Shared Prettier Configuration Preset
│   │   └── index.spec.ts            # Co-located Unit Spec for Prettier Preset
│   ├── tsconfig/
│   │   ├── angular.json             # Angular TypeScript Preset
│   │   ├── angular.spec.ts          # Co-located Unit Spec
│   │   ├── base.json                # Strict Base TypeScript Preset
│   │   ├── base.spec.ts             # Co-located Unit Spec
│   │   ├── library.json             # Shared Library TypeScript Preset
│   │   ├── library.spec.ts          # Co-located Unit Spec
│   │   ├── nestjs.json              # NestJS TypeScript Preset
│   │   └── nestjs.spec.ts           # Co-located Unit Spec
│   ├── index.ts                     # Public Package Root Exports
│   └── index.spec.ts                # Co-located Unit Spec
├── .devcontainer/                   # Repository DevContainer Setup (Node 18-26 via NVM)
├── .github/
│   ├── ISSUE_TEMPLATE/              # Structured GitHub Issue Forms
│   ├── workflows/                   # GitHub Actions CI & Automation Workflows
│   ├── dependabot.yml               # Automated Dependency Updates
│   ├── labels.yml                   # Repository Label Definitions
│   └── PULL_REQUEST_TEMPLATE.md     # Pull Request Checklist Template
├── .husky/
│   ├── commit-msg                   # Commitlint Git Hook
│   └── pre-commit                   # Lint-Staged Git Hook
├── .vscode/
│   └── settings.json                # Workspace Editor & Formatter Settings
├── .editorconfig                    # IDE Standardization (LF, 2 Spaces, UTF-8)
├── .gitattributes                   # LF Enforcement & Binary Handling
├── .gitignore                       # Node, pnpm, build, env, coverage
├── .lintstagedrc.js                 # Pre-commit Staged Files Linting & Formatting
├── .markdownlint-cli2.jsonc         # Markdownlint Rules & Ignores
├── .prettierrc.json                 # Prettier Rules
├── .prettierignore                  # Prettier Exclusions
├── AGENTS.md                        # AI Agent Guidelines & Engineering Standards
├── CODE_OF_CONDUCT.md               # Contributor Covenant Code of Conduct
├── CODEOWNERS                       # Repository Code Owners
├── commitlint.config.js             # Conventional Commits Configuration
├── CONTRIBUTING.md                  # Contribution & Commit Message Guidelines
├── eslint.config.js                 # ESLint Flat Config (Strict Type-Checked)
├── LICENSE.md                       # MIT License
├── package.json                     # Scripts, Exports & Dependencies
├── pnpm-workspace.yaml              # pnpm Supply-Chain & Build Policies
├── README.md                        # Project Documentation & Quickstart
├── SECURITY.md                      # Security & Vulnerability Disclosure Policy
├── tsconfig.json                    # Base TypeScript Config (Workspace/Editor)
├── tsconfig.build.json              # Production Build (excludes *.spec.ts)
├── tsconfig.eslint.json             # Linting Config (Type-checked across repo)
└── vitest.config.ts                 # Test Runner Config (node env, v8 coverage)
```

---

## 3. Developer Workflows & Commands

Always execute commands via `pnpm`:

- **Run typecheck:** `pnpm typecheck` (`tsc --noEmit`)
- **Run all tests with text coverage:** `pnpm test` (`vitest run --coverage.enabled --coverage.reporter=text`)
- **Run unit tests:** `pnpm test:unit` (`vitest run src --coverage.enabled --coverage.reporter=text`)
- **Run tests in watch mode:** `pnpm test:watch` (`vitest`)
- **Generate coverage report:** `pnpm test:coverage` (`vitest run --coverage`)
- **Lint code & markdown:** `pnpm lint` (`eslint . && markdownlint-cli2`)
- **Automatically fix lint issues:** `pnpm lint:fix` (`eslint . --fix && markdownlint-cli2 --fix`)
- **Check formatting:** `pnpm format` (`prettier --check .`)
- **Apply formatting:** `pnpm format:fix` (`prettier --write .`)
- **Clean workspace:** `pnpm clean` (executes `clean:build`, `clean:node`, `clean:coverage`)
- **Compile production build:** `pnpm build` (`tsc -p tsconfig.build.json && pnpm run build:assets`)

### Verification Strategy by Change Scope

To optimize turnaround times and avoid redundant compute cycles, execute only the verification commands appropriate
for the scope of modified files:

| Change Scope                     | Modified Files                                                         | Required Verification Commands                                                          | Redundant / Skip                                   |
| :------------------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :------------------------------------------------- |
| **Documentation & Config Data**  | `*.md`, `.editorconfig`, `.prettierrc.json`, `.gitignore`, `.vscode/*` | `pnpm format` + `pnpm lint`                                                             | ⏭️ Skip `typecheck` and all `test` suites          |
| **Preset Logic & Specs**         | `src/**/*.ts`, `src/**/*.json`, `src/**/*.jsonc`                       | `pnpm format` + `pnpm lint` + `pnpm typecheck` + `pnpm test:unit`                       | ⏭️ Skip full build unless verifying `dist/` output |
| **Dependencies & Build Tooling** | `package.json`, `pnpm-lock.yaml`, `tsconfig*.json`, `eslint.config.js` | Full suite: `pnpm format` + `pnpm lint` + `pnpm typecheck` + `pnpm test` + `pnpm build` | —                                                  |

---

## 4. TypeScript & Coding Standards

1. **Strict Type Safety:**
   - No `any`. Use `unknown` and narrow types with explicit type guards.
   - Type assertions (`as TargetType`) are strictly forbidden unless technically unavoidable and explicitly justified
     with JSDoc comments.
2. **ESM & Node Built-ins:**
   - Standard ESM only (`import ... from '...'`).
   - Node built-in modules must always use the `node:` prefix (e.g., `import path from 'node:path';`,
     `import { fileURLToPath } from 'node:url';`).
   - No legacy CommonJS artifacts (`require`, `module.exports`, `__dirname` – use `import.meta.dirname` instead).
3. **Source Code Language:**
   - All source code comments (JSDoc, inline) and console messages (`console.warn`, `console.error`) must be written
     in **English**.
4. **Grouped Exports at File End (Revealing Module Pattern):**
   - No inline named exports (`export function ...`, `export const ...`). All functions, classes, constants,
     interfaces, and types must be declared locally.
   - Each file must end with a single, consolidated `export { ... };` block (types explicitly prefixed with `type`
     per `verbatimModuleSyntax`). Default exports (`export default ...`) are only used at the end of configuration
     entrypoints where required by external tooling (e.g., ESLint, Prettier, Vitest, Commitlint, Lint-Staged).
5. **Public Library API (`src/index.ts` & Subpath Exports):**
   - `package.json` `"exports"` and `src/index.ts` define the clean, documented public API of
     `@djblackeagle/dev-config-js`.
   - Internal helper utilities must not be leaked into public exports unless explicitly designed for consumer use.

---

## 5. Configuration Package Specific Guidelines

1. **ESLint 9 Flat Config Exclusively:**
   - All ESLint configurations must strictly use the modern ESLint v9 Flat Config array/object format
     (`typescript-eslint` `tseslint.config(...)`). Legacy `.eslintrc` formats are strictly prohibited.
2. **Modular & Composable Presets:**
   - Configurations must be modularly separated (`base`, `library`, `nestjs`, `angular`, `vitest`, `prettier`) so
     consumers can either use complete stack presets or compose individual building blocks.
3. **Zero Side Effects at Import Time:**
   - Importing any preset or module from `@djblackeagle/dev-config-js` must be completely side-effect-free. Modules
     must only construct and return configuration objects or arrays.
4. **Self-Dogfooding:**
   - As configuration presets (`tsconfig`, `prettier`, `eslint`, `vitest`, `markdownlint`, `commitlint`,
     `lint-staged`) are implemented in `src/`, this repository's own root configurations must adopt and validate them.

---

## 6. Agent Do's & Don'ts

- **DO:**
  - Always co-locate unit tests alongside source files as `*.spec.ts`.
  - Always declare symbols locally and group exports in a single `export { ... };` statement at the end of each file.
  - Apply scoped verification matching the change scope (see Section 3): For pure documentation (`*.md`) or
    formatting rules, running `pnpm format` and `pnpm lint` is sufficient. Run `pnpm typecheck`, `pnpm lint`, and
    relevant tests (`pnpm test:unit` or `pnpm test`) whenever TypeScript source code or dependencies are altered.
  - Monitor test coverage: Run `pnpm test:coverage` whenever adding new features or logic branches, ensuring all new
    paths, edge cases, and error branches are covered without reducing total coverage.
  - Keep `AGENTS.md` and `README.md` synchronized whenever changing architecture, directory structure, scripts, or
    exported presets.
- **DON'T:**
  - Never execute heavy test suites (`pnpm test`) unnecessarily when only markdown documents, JSON config data,
    comments, or formatting rules are modified.
  - Never let `AGENTS.md` or `README.md` become outdated when introducing new features, configuration presets, new
    scripts, or structural adjustments.
  - Never use the file extension `*.test.ts`.
  - Never leave non-English comments or debugging `console.log` statements in code.
  - Never modify build, ESLint, or Prettier configurations without explicit user consultation.
  - Never perform unrequested file modifications when the user only asks for a comparison, explanation, or
    recommendation.
  - Never introduce legacy packages such as `jest`, `@alanta/*`, `eslint-config-airbnb*`, `ts-node`, or
    CommonJS-only tooling.
