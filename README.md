<div align="center">
  <a href="https://kstepien3.github.io/ng-zen/">
    <img src="https://raw.githubusercontent.com/kstepien3/ng-zen/master/assets/logo.png" alt="@ng-zen/cli Logo" width="256" />
  </a>

  <h1>@ng-zen/cli</h1>

  <p style="display: flex; gap: 1rem; justify-content: center;">
    <a href="https://github.com/kstepien3/ng-zen/actions/workflows/ci.yml">
      <img src="https://img.shields.io/github/actions/workflow/status/kstepien3/ng-zen/ci.yml?branch=master&label=build" alt="Build Status" />
    </a>
    <a href="https://www.npmjs.com/package/@ng-zen/cli">
      <img src="https://img.shields.io/npm/v/@ng-zen/cli/latest?label=npm%40latest" alt="NPM Version" />
    </a>
    <a href="https://github.com/kstepien3/ng-zen/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/kstepien3/ng-zen" alt="License" />
    </a>
  </p>

  <p style="display: flex; gap: 1rem; justify-content: center;">
    <a href="https://github.com/kstepien3/ng-zen">
      <img src="https://img.shields.io/badge/-Repository-181818?style=flat&logo=github&logoColor=white" alt="Repository" />
    </a>
    <a href="https://kstepien3.github.io/ng-zen/">
      <img src="https://img.shields.io/badge/-Storybook-FF4785?style=flat&logo=storybook&logoColor=white" alt="Storybook" />
    </a>
  </p>

  <p>
    <a href="https://deepwiki.com/kstepien3/ng-zen">
      <img src="https://deepwiki.com/badge.svg" alt="DeepWiki" />
    </a>
  </p>

  <p>
    <strong>Standalone Angular UI Kit Generator — the shadcn/ui alternative for Angular.</strong><br/>
    Generate production-ready, highly customizable Angular UI components directly into your workspace. No rigid libraries, full code ownership.
  </p>
</div>

<!-- TODO: Insert terminal recording GIF/WebM here showing the CLI in action -->

---

## 🚀 Getting Started

The fastest way to install the CLI and generate your first component.

**1. Add the package to your Angular 20+ project:**

```bash
ng add @ng-zen/cli
```

**2. Generate UI components (interactive mode):**

```bash
ng generate @ng-zen/cli:ui
```

**3. Use the generated standalone component:**

```typescript
import { ZenButton } from './ui/button';

@Component({
  imports: [ZenButton],
  template: `
    <button variant="primary" zen-button>Action</button>
  `,
})
export class MyComponent {}
```

## Table of Contents

1. [Getting Started](#-getting-started)
2. [Features](#-features)
3. [CLI Usage & Options](#-cli-usage--options)
4. [Available UIs](#-available-uis)
5. [Customization](#-customization)
6. [Philosophy & Architecture](#-philosophy--architecture)
7. [Community & Contributions](#-community--contributions)
8. [Documentation & Links](#-documentation--links)

## ✨ Features

- **Signal First Architecture:** Designed natively for Angular's reactive model. Full support for Signal Inputs, Queries, Model signals, and the new **Signal Forms** API.
- **Own Your Code:** Components are generated as raw `.ts`, `.html`, and `.scss` files directly in your project. You control the implementation.
- **Agnostic Styling:** Built with raw SCSS and CSS Variables. No forced dependencies on Tailwind CSS, but fully adaptable if needed.
- **Modern Angular:** Leverages Standalone Components, OnPush change detection, and eliminates unnecessary RxJS overhead in UI layers.
- **Production Ready:** Includes Vitest unit tests, Storybook stories, and accessibility features out of the box.

## 🛠️ CLI Usage & Options

Generate multiple components at once, specify custom paths, or include Storybook documentation files directly from the terminal.

```bash
ng generate @ng-zen/cli:ui [path] --ui <elements...> --stories
```

### Arguments & Flags

| Property        | Status     | Default       | Description                                                                                                                  |
| :-------------- | :--------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| **`[path]`**    | _Optional_ | `src/app/ui`  | The directory where components will be generated (e.g., `./src/app/shared/components`).                                      |
| **`--ui`**      | _Required_ | -             | A space-separated list of components to generate (e.g., `button`, `alert`, `dialog`). Interactive prompt appears if omitted. |
| **`--stories`** | _Optional_ | `false`       | Generates `.stories.ts` files alongside the component, instantly ready for your Storybook integration.                       |
| **`--project`** | _Optional_ | auto-detected | Specify the target project name in a multi-project workspace.                                                                |

### Examples

**Interactive mode (Recommended):**

```bash
ng generate @ng-zen/cli:ui
```

**Generate specific components to a custom path:**

```bash
ng generate @ng-zen/cli:ui ./src/app/shared/components --ui avatar badge card
```

**Generate components with Storybook files:**

```bash
ng generate @ng-zen/cli:ui --ui button input --stories
```

## 🧩 Available UIs

### Forms & Inputs

| Component        | Description           | Features                                                         |
| ---------------- | --------------------- | ---------------------------------------------------------------- |
| **Checkbox**     | Form checkboxes       | Indeterminate state, custom styling, validation                  |
| **Form Control** | Form field wrapper    | Labels, validation messages, required indicators                 |
| **Input**        | Text input fields     | Validation states, prefixes/suffixes, types                      |
| **Radio**        | Form radio buttons    | Group selection, two-way binding, custom styling, disabled state |
| **Switch**       | Toggle controls       | On/off states, disabled state, custom labels                     |
| **Textarea**     | Multi-line text input | Auto-resize, character counts, validation                        |

### Data Display

| Component   | Description                      | Features                                                                       |
| ----------- | -------------------------------- | ------------------------------------------------------------------------------ |
| **Avatar**  | User profile images and initials | Image fallback, size variants, rounded styles                                  |
| **Badge**   | Status indicators and labels     | 6 variants, icons support, focus-visible ring                                  |
| **Card**    | Content container                | Multi-slot projection (header, title, subtitle, footer), CSS custom properties |
| **Divider** | Visual separators                | Horizontal/vertical, with labels, custom thickness                             |
| **Icon**    | SVG icon system                  | Built to support any SVG icon library. Size variants, colors                   |

### Feedback

| Component    | Description            | Features                                 |
| ------------ | ---------------------- | ---------------------------------------- |
| **Alert**    | Informational messages | Customizable styles, dismissible options |
| **Skeleton** | Loading placeholders   | Multiple shapes, animation, responsive   |

### Actions & Overlays

| Component   | Description                  | Features                                                                  |
| ----------- | ---------------------------- | ------------------------------------------------------------------------- |
| **Button**  | Interactive buttons          | Primary/secondary variants, loading states, icons                         |
| **Dialog**  | Native modal dialogs         | Native dialog element, service API, size variants, backdrop config        |
| **Popover** | Native Popover API directive | Template/string content, placements, click toggle, CSS anchor positioning |

## 🎨 Customization

Every generated component utilizes CSS variables for immediate theming without touching the core logic. Overwrite them globally or locally:

```scss
/* styles.scss */
:root {
  /* Global theme variables */
  --zen-primary: hsl(221deg 83% 53%);
  --zen-transition-duration: 0.3s;
  --zen-outline: 2px solid hsl(221deg 83% 53% / 50%);

  /* Component-specific overrides */
  --zen-button-primary: hsl(221deg 83% 40%);
  --zen-button-shadow: 0 4px 6px hsl(0deg 0% 0% / 15%);
}
```

For structural changes (e.g., modifying the default `0.625rem` border radius or internal padding), simply edit the generated `.scss` files in your `./ui` directory.

## 🏛️ Philosophy & Architecture

### Perfect For

- **Enterprise Teams:** Build consistent internal design systems without vendor lock-in.
- **Startup Projects:** Rapid prototyping with components that can be easily customized as requirements scale.
- **Angular Developers:** Maintain full control over component behavior while enforcing modern Angular patterns (Signals, Signal Forms, Standalone).

### Advanced Details

- **Zero Configuration:** Works seamlessly with standard Angular CLI workspaces.
- **Reactive by Design:** Built from the ground up to utilize Angular Signals for state management, making integration with modern state libraries and Signal Forms seamless.
- **Continuous Updates:** Updating `@ng-zen/cli` brings new features and component blueprints, but will **never** overwrite or break your already generated code.
- **Icon Agnostic:** The optional `zen-icon` is built to be completely library-agnostic. While `@hugeicons/core-free-icons` is used in examples, you can integrate it with any SVG icon provider.

## 🤝 Community & Contributions

**Built by developers, for developers.**

This project is actively developed and shaped by community feedback. We are highly open to suggestions, new features, and improvements.

- **Missing a component?** Open a feature request.
- **Found a bug?** Submit an issue.
- **Have an idea?** Start a discussion.

We prioritize community requests in our roadmap. [Report issues or suggest features here](https://github.com/kstepien3/ng-zen/issues).

## 📚 Documentation & Links

- **📖 [Live Storybook Demo](https://kstepien3.github.io/ng-zen/)** - Interactive examples
- **🤝 [Contributing Guide](https://github.com/kstepien3/ng-zen/blob/master/CONTRIBUTING.md)** - Workflow & bug reporting
- **📝 [Releases & Changelog](https://github.com/kstepien3/ng-zen/releases)** - Version history and release notes
- **📦 [ngx-schematic-builder](https://github.com/kstepien3/ngx-schematic-builder)** - Custom compiler for this project

---

**License:** [BSD 2-Clause](https://github.com/kstepien3/ng-zen/blob/master/LICENSE)  
**Maintainer:** Konrad Stępień ([@kstepien3](https://github.com/kstepien3))
