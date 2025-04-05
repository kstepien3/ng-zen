# Local Development Setup

This guide will help you set up a local development environment for **@ng-zen/cli**.

## Prerequisites

- Node.js (preferably the latest LTS version)
- pnpm
- Angular CLI installed globally
- verdaccio

## Working with Storybook

**Storybook** is the primary tool for developing and testing UI components. To start Storybook, run:

```bash
pnpm run storybook
```

This command will launch Storybook in your default browser, allowing you to interact with and test the components visually.

### Building Storybook

To build a static version of Storybook for deployment, testing or release, use:

```bash
pnpm run storybook:build
```

## Setting Up Verdaccio

1. **Install Verdaccio**:
   Follow the instructions on the [Verdaccio website](https://verdaccio.org/docs/installation#installing-the-cli) to install Verdaccio.

2. **Start Local Registry**:
   Run the following command to start the local registry:

   ```bash
   pnpm run verdaccio
   ```

3. **Configure npm to Use Local Registry**:
   Follow the prompts from Verdaccio to configure npm to use the local registry.

## Publishing Locally

1. **Publish Package Locally**:
   Use the following command to publish the package to your local registry:
   ```bash
   pnpm run publish:local
   ```
2. **Test in Angular Project**:
   Add the package to an Angular project using the local registry:
   ```bash
   ng add @ng-zen/cli --registry http://localhost:4873/
   ```

## Running Tests

- **Unit Tests**: Run unit tests using the command:
  ```bash
  pnpm run test
  ```
- **Linting**: Check code style and fix issues with:
  ```bash
  pnpm run lint
  pnpm run lint:fix
  ```

## Building and Packaging

**Build** the project using:

```bash
pnpm run build
```

---

By following these steps, you should be able to set up a fully functional local development environment for **@ng-zen/cli**.
