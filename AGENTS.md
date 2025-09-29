# Agent Guidelines for ng-zen

## Commands

- **Build**: `ng build` or `pnpm run build`
- **Test all**: `ng test` or `pnpm run test`
- **Test single**: `ng test --include="**/component.spec.ts"`
- **Lint**: `ng lint` or `pnpm run lint`
- **Lint fix**: `ng lint --fix` or `pnpm run lint:fix`

## Code Style

- **TypeScript**: Strict mode enabled, use Angular signals (input(), model())
- **Formatting**: Prettier (2 spaces, single quotes, trailing commas es5, printWidth 120)
- **Imports**: Sorted with simple-import-sort plugin
- **Angular**: `zen-` prefix, camelCase directives, kebab-case components
- **SCSS**: stylelint-config-standard-scss
- **Naming**: PascalCase classes, camelCase methods/properties
- **Change Detection**: OnPush strategy
- **Templates**: Self-closing tags preferred
