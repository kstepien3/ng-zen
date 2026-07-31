// @ts-check
const { defineConfig } = require('eslint/config');

/**
 * Config block for UI components inside a `ui/` directory.
 *
 * Enforces:
 * - `zen` prefix for component selectors (`element`, `kebab-case`)
 * - `zen` prefix for directive selectors (`attribute`, `camelCase`)
 * - At most 2 classes per file
 *
 * @type {import('eslint').Linter.Config}
 */
const uiComponent = {
  files: ['**/ui/**/*.ts'],
  rules: {
    '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'zen', style: 'camelCase' }],
    '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'zen', style: 'kebab-case' }],
    'max-classes-per-file': ['error', 2],
  },
};

/**
 * Config block for generated files — specs, tests, and Storybook stories.
 *
 * Relaxes strict rules that are impractical for test/story files:
 * disables `explicit-function-return-type`, `no-unsafe-*`, `max-classes-per-file`,
 * `no-empty-function`, `require-await`, `unbound-method`, and `no-floating-promises`.
 *
 * @type {import('eslint').Linter.Config}
 */
const generatedFiles = {
  files: ['**/ui/**/*.spec.ts', '**/ui/**/*.test.ts', '**/ui/**/*.stories.ts'],
  rules: {
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/require-await': 'off',
    'max-classes-per-file': 'off',
  },
};

/**
 * Creates a custom UI component config block with a custom file glob.
 *
 * @param {Object} [options]
 * @param {string | string[]} [options.uiFiles] - Glob pattern(s) for UI component files.
 *   Uses the same format as the `files` property in flat config.
 * @returns {import('eslint').Linter.Config} A config block with the same rules as
 *   uiComponent but scoped to the provided file pattern.
 *
 * @example
 * ```ts
 * createNgZenConfig({ uiFiles: 'libs/my-ui' })
 * ```
 */
function createNgZenConfig(options = {}) {
  const { uiFiles = ['**/ui/**/*.ts'] } = options;
  return { ...uiComponent, files: [uiFiles].flat() };
}

/**
 * ng-zen ESLint flat config.
 *
 * ## Default import
 *
 * Import the whole array of flat configs:
 * ```ts
 * import ngZen from '@ng-zen/cli/eslint-config';
 * export default defineConfig([...ngZen]);
 * ```
 *
 * ## Named properties
 *
 * | Property | Returns | Description |
 * |---|---|---|
 * | `.uiComponent` | `Config` | Rules for UI component files. Override `files` / `rules` via spread. |
 * | `.generatedFiles` | `Config` | Rules for generated files (stories, spec, test). |
 * | `.createNgZenConfig(opts)` | `Config` | Helper — same rules as uiComponent with a custom file glob. |
 *
 * ## Custom path
 *
 * By default, UI component files are detected via a glob pattern targeting any `ui` directory
 * (glob: `**` + `/ui/` + `**` + `/*`). If your components live in a different location, choose one of the
 * approaches below instead of the default `...ngZen` spread.
 *
 * @example <caption>Custom UI path</caption>
 * ```ts
 * import ngZen from '@ng-zen/cli/eslint-config';
 * export default defineConfig([
 *   ngZen.createNgZenConfig({ uiFiles: 'src/app/shared/ui' }),
 *   ...ngZen.generatedFiles,
 * ]);
 * ```
 *
 * @example <caption>Override prefix or rules</caption>
 * ```ts
 * import ngZen from '@ng-zen/cli/eslint-config';
 * export default defineConfig([
 *   {
 *     files: ['libs/my-ui'],
 *     rules: {
 *       ...ngZen.uiComponent.rules,
 *       '@angular-eslint/component-selector': ['error', { type: 'element', prefix: ['app', 'zen'], style: 'kebab-case' }],
 *     },
 *   },
 *   ...ngZen.generatedFiles,
 * ]);
 * ```
 *
 * @type {import('eslint').Linter.FlatConfig[] &
 *   {
 *     uiComponent: import('eslint').Linter.Config,
 *     generatedFiles: import('eslint').Linter.Config,
 *     createNgZenConfig: (options?: { uiFiles?: string | string[] }) => import('eslint').Linter.Config
 *   }
 * }
 */
const config = Object.assign(defineConfig([uiComponent, generatedFiles]), {
  uiComponent,
  generatedFiles,
  createNgZenConfig,
});

module.exports = config;
