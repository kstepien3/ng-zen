# Local Development Setup

This guide details setting up a local development environment for **@ng-zen/cli**. It covers the necessary tools, the project's branching strategy, and the automated workflows in place.

**For a step-by-step guide specifically for external contributors submitting Pull Requests, please refer to `CONTRIBUTING.md`.**

**Key Technologies & Concepts:**

- **pnpm:** The required package manager (version in `package.json`). Use Corepack (`corepack enable`).
- **Storybook:** For UI component development and visualization.
- **Conventional Commits:** **Mandatory format** for commit messages (https://www.conventionalcommits.org/). Crucial for automation.
- **Automated Formatting/Linting:** `husky` + `nano-staged` apply formatting and basic fixes on commit.
- **Automated CI:** GitHub Actions (`ci.yml`) validate Pull Requests.
- **Automated Releases:** `semantic-release` manages releases based on commits.
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

- **Why?** Commit messages directly control automatic version bumping (`semantic-release`) and `CHANGELOG.md` generation.
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

This project uses Pull Requests (PRs) for controlled release management through branch progression:  
`develop` → `next` (pre-release) → `master` (stable release)

### Release Steps

1. **Create Pre-release PR (`develop` → `next`)**

- **Create PR**: [develop → next](https://github.com/kstepien3/ng-zen/compare/next...develop)
- **Title**: `release: merge develop into next`
- **Merge Strategy**: Regular merge commit (preserves commit history)
- **Automation**:
  - Triggers automated pre-release via `semantic-release`
  - Publishes to NPM under `next` dist-tag

2. **Create Stable Release PR (`next` → `master`)**

- **Create PR**: [next → master](https://github.com/kstepien3/ng-zen/compare/master...next)
- **Title**: `release: promote next to stable`
- **Merge Strategy**: Regular merge commit
- **Automation**:
  - Triggers automated stable release via `semantic-release`
  - Publishes to NPM under `latest` dist-tag

### Critical Requirements

- ✅ **Merge Commits Only**  
  Required to preserve conventional commit history that `semantic-release` analyzes
- ✅ **Valid Conventional Commits**  
  All commits must follow Angular Conventional Commit standards
- ✅ **CI Passes**  
  All automated checks must complete successfully before merging

### Post-Merge Automation

`semantic-release` automatically handles:

1. Version determination from commit history
2. CHANGELOG generation/updates
3. NPM package publishing
4. GitHub release creation
5. Git tagging

### Hotfix Procedure

Create PR directly to master and then follow Branch Synchronization

### Automated Branch Synchronization

Branch syncing is automated in `release.yml` via a `sync-branches` job that runs after every successful release. To comply with branch protection rules and trigger required CI checks, this process automatically opens Pull Requests and sets them to auto-merge:

- **`master` released** → Creates PRs to sync `next` ← `master`, and subsequently `develop` ← `next`.
- **`next` pre-released** → Creates a PR to sync `develop` ← `next`.

**Merge Conflicts:** If a merge conflict occurs during synchronization, the automated PR will remain open and the auto-merge will fail. The maintainer must resolve the conflict manually via the GitHub UI or locally, and then merge the PR.

> **Maintainer Infrastructure Note (`BOT_TOKEN`):**
> The `sync-branches` workflow relies on a Fine-grained Personal Access Token stored as a repository secret named `BOT_TOKEN`. The default `GITHUB_TOKEN` is intentionally restricted by GitHub from triggering downstream CI workflows.
> _If the automation stops working (e.g., the token expires), the repository administrator must generate a new Fine-grained PAT (scoped only to this repository with Read & Write access to `Contents` and `Pull requests`) and update the `BOT_TOKEN` secret._

---

### Manual Branch Synchronization & Local Updates

While automation handles post-release syncing, contributors should regularly update their local branches to prevent conflicts.

**General Update Step:** Fetch the latest remote state:

```bash
git fetch origin --prune --tags
```

**Syncing your local `develop` branch:**
Contributors should always ensure their local `develop` is up to date before branching out for new features.

```bash
git switch develop
git pull origin develop
```

**Resolving Release Sync Conflicts (Maintainer Task):**
If the automated bot PR encounters a conflict (e.g., when syncing `next` into `develop`), fetch the branches and resolve the conflict locally before pushing back to the PR branch.

```bash
git switch develop
git pull origin develop
git merge origin/next
# -> Resolve conflicts in your editor <-
git commit -m "chore: resolve sync conflicts"
git push origin develop
```

---

Contributors should regularly update their local `develop` branch (`git switch develop && git pull origin develop`). The automated sync in `release.yml` covers this after releases, but regular pulls are still recommended between releases.

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
