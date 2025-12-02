# Agent Guidelines for ng-zen

## Introduction

"ng-zen" is a project that generates production-ready, customizable Angular code via CLI.

Every logic follows the same structure by type:

### Component structure

```text
src/schematics/components/files
└── *name*/
    ├── *name*.ts                # Component logic
    ├── *name*.scss              # Customizable styles (optional)
    ├── *name*.html              # Customizable html (optional)
    ├── *name*.spec.ts           # Unit tests
    ├── *name*.stories.ts        # Storybook documentation
    └── index.ts                 # Barrel exports
```

## Commands

- **Build**: `ng build` or `pnpm run build`
- **Test all**: `ng test:no-watch` or `pnpm run test:no-watch`
- **Test single**: `ng test:no-watch --include="**/component.spec.ts"`
- **Lint**: `ng lint` or `pnpm run lint`
- **Lint fix**: `ng lint --fix` or `pnpm run lint:fix`
- **Storybook serve**: `ng run cli:storybook` or `pnpm run storybook`
- **Storybook build**: `ng run cli:build-storybook` or `pnpm run storybook:build`

### Avoid commands:

- `ng test` or `pnpm run test` - avoid watch mode. Run tests witch `--no-watch` flag like `ng test:no-watch` or `pnpm run test:no-watch`.

## Code Style

- **TypeScript**: Strict mode enabled, use Angular signals (input(), model())
- **Formatting**: Prettier (2 spaces, single quotes, trailing commas es5, printWidth 120)
- **Imports**: Sorted with simple-import-sort plugin
- **Angular**: `zen-` prefix, camelCase directives, kebab-case components
- **SCSS**: stylelint-config-standard-scss
- **Naming**: PascalCase classes, camelCase methods/properties
- **Change Detection**: OnPush strategy
- **Templates**: Self-closing tags preferred
