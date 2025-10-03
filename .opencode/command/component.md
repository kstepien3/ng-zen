---
description: Create a new component
agent: build
---

Create a new Angular component named $ARGUMENTS following ng-zen conventions: use `zen-` prefix, OnPush change detection, Angular signals (input(), model()), and the standard file structure.

Component structure:

- _name_.ts: Component logic
- _name_.scss: Customizable styles (optional)
- _name_.html: Customizable template (optional)
- _name_.spec.ts: Unit tests
- _name_.stories.ts: Storybook documentation
- index.ts: Barrel exports

Include proper TypeScript typing, PascalCase classes, camelCase methods/properties, and self-closing tags in templates.

Update the following files:

- src/schematics/components/schema.ts
- src/schematics/components/schema.json
- README.md

Review and update documentation files as needed.
