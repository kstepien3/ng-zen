<div align="center">
  <a href="https://kstepien3.github.io/ng-zen/">
    <img src="https://raw.githubusercontent.com/kstepien3/ng-zen/master/images/logo.png" alt="@ng-zen/cli Logo" width="256" />
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
      <img src="https://img.shields.io/badge/-Storybook%20Demo-FF4785?style=flat&logo=storybook&logoColor=white" alt="Storybook Demo" />
    </a>
  </p>

  <p><strong>Generate production-ready, customizable Angular UI components directly into your project 🚀</strong></p>

  <p>Stop wrestling with rigid UI libraries. @ng-zen/cli generates beautiful, modern Angular components <strong>as source code</strong> in your project, giving you complete control and ownership.</p>
</div>

## 🎯 Why Choose @ng-zen/cli?

### ✨ **Own Your Components**

Unlike traditional UI libraries that give you `<library-button>` black boxes, @ng-zen generates **actual TypeScript, HTML, and SCSS files** directly into your project. You own the code, you control the future.

### 🏎️ **Instant Productivity**

- **Production-Ready Components:** Avatar, Button, Checkbox, Divider, Form Control, Icon, Input, Skeleton, Switch, Textarea
- **Zero Configuration:** Works with Angular 20+ out of the box
- **Complete Setup:** Each component includes unit tests, Storybook stories, and documentation

### 🎨 **Built for Customization**

- **CSS Variables:** Easy theming without touching component internals
- **Editable SCSS:** Modify styles directly when you need deeper customization
- **Modern Architecture:** Standalone components, OnPush change detection, Angular signals

### 📚 **Developer Experience First**

- **Interactive Documentation:** Live Storybook examples for every component
- **TypeScript Ready:** Full type safety and IntelliSense support
- **Test Coverage:** Generated components include comprehensive unit tests
- **JSDoc Annotations:** Detailed inline documentation

## Table of Contents

1. [Quick Start](#-quick-start)
2. [Installation](#-installation)
3. [Available Components](#-available-components)
4. [Usage Examples](#-usage-examples)
5. [Perfect For](#-perfect-for)
6. [Advanced Features](#-advanced-features)
7. [Documentation](#-documentation)
8. [Project Status](#-project-status)
9. [Contributing](#-contributing)
10. [License](#license)
11. [Author](#author)
12. [See Also](#see-also)
13. [FAQ](#faq)

## 🚀 Quick Start

The fastest way to get started:

```bash
ng add @ng-zen/cli
```

This command:

- ✅ Installs the package
- ✅ Sets up your project configuration
- ✅ Ready to generate components

Then generate your first component:

```bash
ng generate @ng-zen/cli:component
```

Select components from an interactive menu and they'll be generated directly into your current directory! 🎉

## 📦 Installation

### Recommended: Using ng add

```bash
ng add @ng-zen/cli
```

### Manual Installation

```bash
# Stable version
pnpm add -D @ng-zen/cli

# Latest features and fixes
pnpm add -D @ng-zen/cli@next
```

## 🧩 Available Components

| Component        | Description                      | Features                                           |
| ---------------- | -------------------------------- | -------------------------------------------------- |
| **Avatar**       | User profile images and initials | Image fallback, size variants, rounded styles      |
| **Button**       | Interactive buttons              | Primary/secondary variants, loading states, icons  |
| **Checkbox**     | Form checkboxes                  | Indeterminate state, custom styling, validation    |
| **Divider**      | Visual separators                | Horizontal/vertical, with labels, custom thickness |
| **Form Control** | Form field wrapper               | Labels, validation messages, required indicators   |
| **Icon**         | SVG icon system                  | Huge Icons integration, size variants, colors      |
| **Input**        | Text input fields                | Validation states, prefixes/suffixes, types        |
| **Skeleton**     | Loading placeholders             | Multiple shapes, animation, responsive             |
| **Switch**       | Toggle controls                  | On/off states, disabled state, custom labels       |
| **Textarea**     | Multi-line text input            | Auto-resize, character counts, validation          |

> 💡 **More components coming soon!** Planned: Directives, Pipes, Services, and additional UI elements.

## 💡 Usage Examples

### Basic Component Generation

```bash
# Interactive mode - choose components from a menu
ng generate @ng-zen/cli:component

# Generate specific components
ng generate @ng-zen/cli:component --components avatar button

# Custom location
ng generate @ng-zen/cli:component ./src/app/ui --components input checkbox

# Include Storybook stories
ng generate @ng-zen/cli:component --components button --stories
```

### What Gets Generated

Each component set includes:

```
src/app/ui/
├── button/
│   ├── button.ts           # Component logic
│   ├── button.scss         # Customizable styles
│   ├── button.spec.ts      # Unit tests
│   ├── button.stories.ts   # Storybook documentation
│   ├── index.ts           # Barrel exports
│   └── README.md          # Component-specific docs
└── input/
    ├── input.ts
    ├── input.scss
    ├── input.spec.ts
    ├── input.stories.ts
    ├── index.ts
    └── README.md
```

### Real-World Usage

```typescript
// After generation, import and use like any Angular component
import { ZenButton } from './ui/button';
import { ZenInput } from './ui/input';

@Component({
  selector: 'app-login',
  imports: [ZenButton, ZenInput],
  template: `
    <form>
      <zen-input placeholder="Enter email" type="email" />
      <button variant="primary" zen-button>Sign In</button>
    </form>
  `,
})
export class LoginComponent {}
```

## 🎯 Perfect For

### 🏢 **Enterprise Teams**

- Build consistent internal component libraries
- Maintain design system compliance across projects
- Avoid vendor lock-in with owned source code

### 🚀 **Startup Projects**

- Rapid prototyping with production-ready components
- Easy customization as requirements evolve
- No licensing concerns or bundle size bloat

### 👩‍💻 **Angular Developers**

- Learn modern Angular patterns (signals, standalone components)
- Speed up UI development workflow
- Maintain full control over component behavior

### 🎨 **Design Systems**

- Use as foundation for custom component libraries
- Extend and modify components to match brand guidelines
- Generate consistent documentation automatically

## ⚡ Advanced Features

### **Modern Angular Architecture**

- **Standalone Components:** No NgModule dependencies
- **OnPush Change Detection:** Optimized performance
- **Angular Signals:** Reactive state management
- **TypeScript 5.8+:** Latest language features

### **Customization System**

```scss
// Easy theming with CSS variables
:root {
  --zen-button-primary-bg: #your-brand-color;
  --zen-button-border-radius: 8px;
  --zen-button-font-weight: 600;
}
```

### **Testing Integration**

- **Jest Ready:** All tests use Jest framework
- **Component Testing:** Isolated unit tests for each component
- **Storybook Testing:** Visual testing and documentation

### **Development Tools**

- **ESLint Integration:** Code quality enforcement
- **Prettier Support:** Consistent code formatting
- **Husky Hooks:** Pre-commit validation

## 📚 Documentation

- **📖 [Live Storybook Demo](https://kstepien3.github.io/ng-zen/)** - Interactive component examples
- **🔧 [Development Guide](https://github.com/kstepien3/ng-zen/blob/master/DEVELOPMENT.md)** - Setup and contribution workflow
- **🤝 [Contributing Guide](https://github.com/kstepien3/ng-zen/blob/master/CONTRIBUTING.md)** - How to contribute to the project
- **📝 [Changelog](https://github.com/kstepien3/ng-zen/blob/master/CHANGELOG.md)** - Version history and breaking changes
- **💬 Component READMEs** - Detailed docs generated with each component

## 🚧 Project Status

**🟢 Actively Developed & Production Ready**

- ✅ **Core Features:** Component generation is stable and tested
- ✅ **Angular 20+ Support:** Compatible with latest Angular versions
- 🔄 **Continuous Improvement:** Regular updates and new components
- 📋 **Roadmap:** Directives, pipes, services, and more UI components planned

### Release Channels

- **`@ng-zen/cli`** - Stable releases from `master` branch
- **`@ng-zen/cli@next`** - Pre-releases from `next` branch with latest features

> **Important:** Since @ng-zen/cli generates code into your project, you own that code completely. Updates to the CLI primarily add new features and components - they won't break your existing generated components.

## 🤝 Contributing

We welcome contributions! Whether it's:

- 🐛 **Bug Reports** - Help us improve reliability
- 💡 **Feature Requests** - Suggest new components or capabilities
- 🔧 **Code Contributions** - Add features or fix issues
- 📚 **Documentation** - Improve guides and examples

> 🚀 **Do you urgently need some new features? Report them in the [`issues`](https://github.com/kstepien3/ng-zen/issues) section! They will be scheduled for the next deployments.**

**Getting Started:**

1. Read our [Contributing Guidelines](https://github.com/kstepien3/ng-zen/blob/master/CONTRIBUTING.md)
2. Check the [Development Setup](https://github.com/kstepien3/ng-zen/blob/master/DEVELOPMENT.md)
3. Browse [open issues](https://github.com/kstepien3/ng-zen/issues)
4. Join the discussion!

## License

This project is licensed under the [BSD 2-Clause License](https://github.com/kstepien3/ng-zen/blob/master/LICENSE) 📜.

## Author

**Konrad Stępień** - Creator & Maintainer

- 🐙 GitHub: [@kstepien3](https://github.com/kstepien3)
- 💼 LinkedIn: [Konrad Stępień](https://www.linkedin.com/in/konradstepien/)
- 📧 Email: [kord.stp@gmail.com](mailto:kord.stp@gmail.com?subject=%5BNG-ZEN%5D%20Question)

## See Also

- **[ngx-schematic-builder](https://github.com/kstepien3/ngx-schematic-builder)** - Custom Angular builder for compiling schematics (used by this project)

## FAQ

### ❓ **How is this different from Angular Material or PrimeNG?**

Traditional UI libraries give you pre-compiled components that you can't modify. @ng-zen/cli generates the actual source code into your project, so you have complete control. You can modify the TypeScript, HTML, and SCSS files however you need.

### ❓ **Can I customize the generated components?**

Absolutely! That's the whole point. Every component is generated as editable source code in your project. You can:

- Modify the TypeScript logic
- Change the HTML templates
- Customize the SCSS styles
- Extend functionality as needed

### ❓ **What happens when I update @ng-zen/cli?**

Updates to the CLI add new features and components but don't affect your already-generated code. Your components belong to you and won't be overwritten. You can always generate new components with the latest features.

### ❓ **Does this work with existing Angular projects?**

Yes! @ng-zen/cli works with any Angular 20+ project. Just run `ng add @ng-zen/cli` in your existing project and start generating components.

### ❓ **Can I use this in production?**

Definitely! The generated components are production-ready with:

- Full TypeScript type safety
- Comprehensive unit tests
- Optimized performance (OnPush change detection)
- Accessibility considerations
- Modern Angular best practices

### ❓ **How do I theme the components?**

Components use CSS variables for easy theming:

```scss
:root {
  --zen-primary-color: #your-brand-color;
  --zen-border-radius: 8px;
}
```

For deeper customization, edit the generated SCSS files directly.

### ❓ **Why no Tailwind CSS?**

You can tweak the code to use Tailwind if you want, but avoid adding extra libraries. Our goal is to create base components that are easy to improve later, work without any CSS libraries, and are fully customizable right out of the box.

---

**Ready to take control of your Angular UI components?** [Get started now!](#-quick-start) 🚀
