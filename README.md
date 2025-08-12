# @ng-zen/cli

[![Build Status ](https://img.shields.io/github/actions/workflow/status/kstepien3/ng-zen/ci.yml?branch=master&label=build)](https://github.com/kstepien3/ng-zen/actions/workflows/ci.yml)
[![NPM Version ](https://img.shields.io/npm/v/@ng-zen/cli/latest?label=npm%40latest)](https://www.npmjs.com/package/@ng-zen/cli)
[![License](https://img.shields.io/github/license/kstepien3/ng-zen)](https://github.com/kstepien3/ng-zen/blob/master/LICENSE)

[![](https://img.shields.io/badge/-Repository-181818?style=flat&logo=github&logoColor=white)](https://github.com/kstepien3/ng-zen)
[![](https://img.shields.io/badge/-Storybook%20Demo-FF4785?style=flat&logo=storybook&logoColor=white)](https://kstepien3.github.io/ng-zen/)

Generate modern, customizable Angular UI components and elements directly into your project 🚀

Built with the best practices and developer experience in mind 💡

## Table of Contents

1. [Features](#features)
2. [Ideal for](#ideal-for)
3. [Quick Start](#quick-start)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Why @ng-zen/cli?](#why-ng-zencli)
7. [Examples](#examples)
8. [Documentation](#documentation)
9. [Project Status](#project-status)
10. [Contributing](#contributing)
11. [License](#license)
12. [Author](#author)
13. [See also](#see-also)
14. [FAQ](#faq)

## Features

- 🧩 **Component Schematics:** Generates ready-to-use UI component code (`.ts`, `.html`, `.scss`).
- 🎨 **Fully Customizable:** Easily theme and modify components via CSS variables and editable SCSS.
- 📱 **Responsive Design:** Components designed to adapt across various screen sizes.
- 📚 **Comprehensive Documentation:** Includes Storybook examples, JSDoc annotations, and `README.md` per component.
- ✅ **Test Coverage:** Generated components include unit tests (`.spec.ts`).
- 🚀 **Modern Angular:** Leverages standalone components, `OnPush` change detection, signals, and current best practices.
- 🛠 **Extensible:** Planned support for generating directives, pipes, services, and more.

## Ideal for

- 🏢 **Enterprise UI Kits:** A great starting point for building consistent, internal component libraries.
- 📈 **Custom Projects:** Accelerates development when custom UI elements are needed, avoiding vendor lock-in.
- 👩‍💻 **Developers:** Speeds up UI creation and ensures adherence to modern Angular patterns.

## Quick Start

The easiest way to add `@ng-zen/cli` and its schematics to your project:

```bash
ng add @ng-zen/cli
```

This command installs the package and performs initial setup.

## Installation

Alternatively, you can install it manually:

```bash
# For the latest stable version
pnpm add -D @ng-zen/cli

# For the latest pre-release version (includes newest features/fixes)
pnpm add -D @ng-zen/cli@next
```

## Usage

### Generating Components

You can create a new component in your Angular project using the `@ng-zen/cli` schematic.

```bash
ng generate @ng-zen/cli:component
```

> 💡 Run the command inside a subfolder of your project, the schematic will place the new components in that directory.

### Examples

```bash
ng generate @ng-zen/cli:component ./src/app/ui #insert an optional path
ng generate @ng-zen/cli:component --components avatar button # declare components without interactive prompt
ng generate @ng-zen/cli:component ./src/app/ui --components avatar button --stories # generate stories files
```

This interactive prompt guides you through selecting and configuring the desired component(s) 📊.

To see available options without running interactively:

```bash
ng generate @ng-zen/cli:component --help
```

### Future Generators

Support for generating other Angular building blocks is planned:

- 📝 Directives
- 💧 Pipes
- 🛠 Services
- ... and more!

## Why @ng-zen/cli?

Unlike pre-compiled UI libraries, `@ng-zen/cli`:

- **Generates Source Code:** You get actual, editable component code in your project, not opaque `<library-button>` tags.
- **Full Control:** Modify the generated code and styles freely to perfectly match your application's needs.
- **Modern Foundation:** Built on current Angular features (standalone, signals, etc.).
- **Transparency:** Understand exactly how components work and evolve them with your project.
- **Developer Experience:** Focuses on ease of use, customization, and maintainability.

## Examples

Each generated component set includes:

- Angular component code (`.ts`, `.html`, `.scss`)
- Unit tests (`.spec.ts`)
- Storybook stories (`.stories.ts`) for visual development and documentation.
- An `index.ts` for easy exporting.
- A component-specific `README.md` (generated from a template).

## Documentation

- **Storybook:** The primary source for visual examples and interactive demos: [View Storybook Demo](https://kstepien3.github.io/ng-zen/)
- **JSDoc:** Code includes documentation comments.
- **READMEs:** Project-level (`README.md`, `DEVELOPMENT.md`, `CONTRIBUTING.md`) and component-level READMEs.
- **Changelog:** Automatically generated history of changes: [CHANGELOG.md](https://github.com/kstepien3/ng-zen/blob/master/CHANGELOG.md)

## Project Status

🚧 **Actively Developed** 🚧

- The core schematics and existing components are functional but continuously improved.
- New generators (directives, pipes, etc.) are planned.
- The `master` branch represents the latest **stable** release.
- The `next` branch contains **pre-release** versions with the newest features and fixes – use `@ng-zen/cli@next` to try them out.

Since the tool generates code directly into your project, you own and control that code. Updates to `@ng-zen/cli` itself primarily bring new generator features or improvements to the generation process, not breaking changes to already generated components.

## Contributing

Contributions are highly welcome! If you'd like to help improve `@ng-zen/cli`, please read our **[Contribution Guidelines (CONTRIBUTING.md)](https://github.com/kstepien3/ng-zen/blob/master/CONTRIBUTING.md)** for details on the workflow, commit message requirements, and setup. 🤝

## License

This project is licensed under the [BSD 2-Clause License](https://github.com/kstepien3/ng-zen/blob/master/LICENSE) 📜.

## Author

Maintained by Konrad Stępień.

- GitHub: [@kstepien3](https://github.com/kstepien3)
- LinkedIn: [Konrad Stępień](https://www.linkedin.com/in/konradstepien/) 👥
- Email: [kord.stp@gmail.com](mailto:kord.stp@gmail.com?subject=%5BNG-ZEN%5D%20Query) 📨

## See also

- [ngx-schematic-builder](https://github.com/kstepien3/ngx-schematic-builder) - A custom Angular builder for compiling and bundling Angular schematics.

## FAQ

### How do I customize a generated component?

Generated components reside entirely within your project's source code. You can directly edit the `.ts`, `.html`, and `.scss` files. Components are structured to use CSS variables and SCSS for easier theming and modification.
