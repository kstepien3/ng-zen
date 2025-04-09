# Contributing to @ng-zen/cli

Thank you for your interest in contributing! This document outlines the essential steps and requirements for submitting contributions.

**For detailed information on project setup, the full branching strategy, specific tool usage (Storybook, Verdaccio), and the reasoning behind our workflows, please refer to the [DEVELOPMENT.md](DEVELOPMENT.md) file.**

## Key Requirements for Contributors

1.  **Conventional Commits (Mandatory):** All commit messages **must** adhere to the Conventional Commits specification (https://www.conventionalcommits.org/). This is critical for automated releases. Invalid messages will block commits. See [Commit Messages](DEVELOPMENT.md#commit-messages-crucial) for details on commit types and their impact.
2.  **Target Branch:** Pull Requests **must target the `develop` branch.** PRs targeting `master` or `next` directly will generally be closed unless specifically requested for hotfixes.
3.  **Automated Checks:**

- Code formatting and basic lint fixes are applied automatically on commit via `husky` and `nano-staged`.
- Full CI checks (linting, testing, building) run automatically on Pull Requests via GitHub Actions (`ci.yml`). **Your PR must pass all CI checks to be eligible for merging.**

## Contribution Steps

1.  **Fork & Clone:** Fork the [ng-zen repository](https://github.com/kstepien3/ng-zen) and clone your fork locally. _(See [Prerequisites & Setup](DEVELOPMENT.md#prerequisites--setup) if needed)_.
2.  **Sync `develop`:** Ensure your local `develop` branch is up-to-date:
    ```bash
    git switch develop
    git pull origin develop
    ```
3.  **Create Branch:** Create your working branch **from `develop`**:
    ```bash
    # Use format: <type>/<short-description>
    git switch -c feat/add-hover-effect develop
    ```
4.  **Develop:** Implement your code changes. Remember to add or update relevant unit tests (`*.spec.ts`) and documentation/Storybook stories (`*.stories.ts`, etc.) as necessary. _(See [Working with Storybook](DEVELOPMENT.md#working-with-storybook) section for more details)_.
5.  **Commit:** Commit your work using **Conventional Commit** messages.
    ```bash
    git add .
    git commit -m "feat(button): add configurable hover effect"
    ```
6.  **Verify Locally:** Before pushing, ensure all local checks pass:
    ```bash
    pnpm run lint
    pnpm run test
    ```
    _(See [Running Tests and Linting](DEVELOPMENT.md#running-tests-and-linting) for details on these commands)_.
7.  **Push:** Push your branch to your fork: `git push origin feat/add-hover-effect`
8.  **Create Pull Request:** Open a Pull Request on GitHub from **your branch** to the **`kstepien3/ng-zen:develop`** branch. Provide a clear title and description.

## After Your PR is Submitted

- Wait for the automated CI checks to complete. Address any failures.
- Respond to code review comments and feedback from maintainers.
- Once approved and CI passes, a maintainer will merge your PR into `develop`. Your changes will then be included in future pre-releases (from `next`) and stable releases (from `master`).

## Communication

- Use [GitHub Issues](https://github.com/kstepien3/ng-zen/issues) for bug reports, feature proposals, or questions _before_ starting significant work.

Thank you for contributing to **@ng-zen/cli**
