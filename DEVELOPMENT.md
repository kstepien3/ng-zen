# Local Development Setup

This guide details setting up a local development environment for **@ng-zen/cli**. It covers the necessary tools, the project's branching strategy, and the automated workflows in place.

**For a step-by-step guide specifically for external contributors submitting Pull Requests, please refer to `CONTRIBUTING.md`.**

**Key Technologies & Concepts:**

- **pnpm:** The required package manager (version in `package.json`). Use Corepack (`corepack enable`).
- **Storybook:** For UI component development and visualization.
- **Conventional Commits:** **Mandatory format** for commit messages (https://www.conventionalcommits.org/). Crucial for automation.
- **Automated Formatting/Linting:** `husky` + `nano-staged` apply formatting and basic fixes on commit.
- **Automated CI:** GitHub Actions (`ci.yml`) validate Pull Requests.
- **Automated Releases:** `release-it` manages releases based on commits.
- **Branching Strategy:** Detailed below.

## Table of Contents

- [Prerequisites & Setup](#prerequisites--setup)
- [Branching Strategy & Workflow](#branching-strategy--workflow)
- [Commit Messages (Crucial!)](#commit-messages-crucial)
- [Release Process (Maintainer Task)](#release-process-maintainer-task)
- [Working with Storybook](#working-with-storybook)
- [Running Tests and Linting](#running-tests-and-linting)
- [Building the Library](#building-the-library)
- [Optional: Local Testing with Verdaccio](#optional-local-testing-with-verdaccio)

## Prerequisites & Setup

1.  Ensure **Node.js** is installed (use a version compatible with the project's Angular version; check CI workflows for reference).
2.  Enable **Corepack**: `corepack enable`.
3.  Clone the repository.
4.  Install dependencies using **pnpm**: `pnpm install`.

## Branching Strategy & Workflow

This project employs a branching model designed for stability and automated releases:

- **`master`**: Contains only **stable, production-ready** code. Receives merges only from `next` during official releases or for critical hotfixes. Automated stable releases (`vX.Y.Z`) are triggered from here. **Direct work is forbidden.**
- **`next`**: The **pre-release / release candidate** branch. Code merged here from `develop` should be stable enough for final testing. Merges trigger automated pre-releases (`vX.Y.Z-next.N`) published to NPM under the `next` dist-tag.
- **`develop`**: The main **integration branch**. All feature branches are merged here first. This branch collects changes intended for the _next_ release cycle. **Target Pull Requests here.**
- **Feature/Fix Branches (`feature/*`, `fix/*`, etc.)**: Used for individual tasks. Always branch **off `develop`**.

**General Flow:** `Feature/Fix Branch` -> **`develop`** -> `next` -> `master`

## Commit Messages (Crucial!)

Strict adherence to the **Conventional Commits** specification (https://www.conventionalcommits.org/) is **required**.

- **Why?** Commit messages directly control automatic version bumping (`release-it`) and `CHANGELOG.md` generation.
- **Format:** `<type>(<scope>): <subject>` (e.g., `feat(button): add loading spinner`).
- **Key Types & Impact (on Stable Release):**
  - `feat`: New feature -> `minor` version bump.
  - `fix`: Bug fix -> `patch` version bump.
  - `!` (e.g., `refactor(core)!:`) or `BREAKING CHANGE:` footer -> `major` version bump.
  - Other types (`docs`, `chore`, `style`, `test`, `ci`, `build`, `refactor`, `perf`) document changes but don't trigger version bumps alone.
- **Validation:** `husky` + `commitlint` automatically check message format upon commit. Invalid messages will fail the commit.

_(See `CONTRIBUTING.md` for a concise summary focused on the commit action itself)._

## Release Process (Maintainer Task)

### Overview

This project uses [release-it](https://github.com/release-it/release-it) with the
[@release-it/conventional-changelog](https://github.com/release-it/conventional-changelog) plugin
for automated versioning, changelog generation, GitHub releases, and npm publishing.

Releases follow [Conventional Commits](https://www.conventionalcommits.org/) and
[Semantic Versioning](https://semver.org/).

### How to trigger a release

Releases are triggered manually via GitHub Actions:

1. Go to **Actions → Release → Run workflow**
2. Select the target branch:
   - `master` → stable release (e.g. `22.1.0`)
   - `next` → pre-release (e.g. `22.2.0-next.1`)
3. Choose pre-release channel (`next`) or leave empty for stable
4. Click **Run workflow**

The workflow will automatically:

- Run lint and tests
- Build the project
- Bump version in `package.json` based on conventional commits
- Generate / update `CHANGELOG.md`
- Commit and tag the release (`vX.Y.Z`)
- Create a GitHub Release with changelog notes
- Publish `@ng-zen/cli` to npm

### Local dry-run

To preview what the next release would look like without making any changes:

```bash
pnpm release:dry
```

### Version bump rules

| Commit type                         | Version bump                |
| ----------------------------------- | --------------------------- |
| `feat:`                             | minor (`22.1.0` → `22.2.0`) |
| `fix:`, `perf:`, `refactor:`        | patch (`22.1.0` → `22.1.1`) |
| `BREAKING CHANGE`                   | major (`22.0.0` → `23.0.0`) |
| `chore:`, `ci:`, `build:`, `style:` | no release                  |

### Skipping a release

To push commits without triggering a release, use `scope: no-release` is NOT supported
in release-it. Simply do not trigger the workflow manually. Commits pile up until
you decide to release.

### Required GitHub Secrets

| Secret      | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| `GH_TOKEN`  | Personal Access Token with `repo` scope — needed to push release commits and tags |
| `NPM_TOKEN` | npm Automation token — needed to publish to registry                              |

### Branch Synchronization

**General Update Step:** Fetch latest remote state:

```bash
git fetch origin --prune --tags
```

### 1. Sync `next` with `master` (After Stable Release or Hotfix)

This is the most comprehensive synchronization, ensuring all development branches are aligned with the latest production code.

- **Purpose:** Incorporate stable changes into the release candidate branch.
- **Flow:** `master` -> `next`.

  ```bash
  # Update local 'next', merge 'origin/master', push 'next'
  git switch next && git pull origin next && git merge origin/master && git push origin next
  ```

  _(Note: Merge conflicts might occur at either merge step and need manual resolution before continuing/pushing.)_

### 2. Sync `develop` with `next` (After Pre-release on next OR after syncing next with master)

- **Purpose:** Keep `develop` aligned with the latest pre-release state or the latest stable code propagated through next. Includes release commits (`chore(release): ...`).
- **Flow:** `next` -> `develop`.

  ```bash
  # Update local 'next', merge 'origin/master', push 'next'
  git switch develop && git pull origin develop && git merge origin/next && git push origin develop
  ```

  _(Note: Resolve conflicts before pushing.)_

---

Contributors should regularly update their local `develop` branch (`git switch develop && git pull origin develop`).

## Working with Storybook

Develop and visualize components using Storybook.

- **Start Storybook:**
  ```bash
  pnpm run storybook
  ```
- **Build Static Storybook:**
  ```bash
  pnpm run storybook:build
  ```

## Running Tests and Linting

`nano-staged` auto-formats/fixes on commit, but manual verification is recommended before creating a PR. The CI (`ci.yml`) runs these checks automatically on PRs.

- **Lint:** `pnpm run lint` (checks for errors not auto-fixed)
- **Test:** `pnpm run test` (runs unit tests)

## Building the Library

Build the distributable library files:

```bash
pnpm run build
```

Output artifacts are placed in the `dist/` directory

## Optional: Local Testing with Verdaccio

Test your local build in a separate project before submitting a PR to develop.

1. Install & Run Verdaccio: `npm install -g verdaccio` (or `pnpm add -g verdaccio`),
2. Build Library: `pnpm run build`.
3. Publish Locally: `pnpm run publish:verdaccio`.
4. Install in Test Project: `ng add @ng-zen/cli --registry http://localhost:4873/` (or pnpm add ...).
