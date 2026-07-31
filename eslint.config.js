// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const { importX } = require('eslint-plugin-import-x');
const unusedImports = require('eslint-plugin-unused-imports');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const { createTypeScriptImportResolver } = require('eslint-import-resolver-typescript');
const ngZenConfig = require('./src/eslint-config');

module.exports = defineConfig([
  {
    ignores: [
      '**/.angular/**',
      '**/coverage/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/out-tsc/**',
      '**/.storybook-out/**',
      '**/*.d.ts',
    ],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      angular.configs.tsRecommended,
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript,
    ],
    plugins: {
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    processor: angular.processInlineTemplates,
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: ['./tsconfig.json', './tsconfig.app.json'],
        }),
      ],
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/prefer-output-readonly': 'warn',
      '@angular-eslint/prefer-signals': 'warn',
      '@angular-eslint/prefer-standalone': 'warn',

      // --- Unused Imports & Vars ---
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import-x/no-duplicates': 'warn',

      // --- TypeScript Best Practices ---
      '@typescript-eslint/array-type': ['warn'],
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-assertions': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
      '@typescript-eslint/naming-convention': [
        'warn',
        { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
      ],
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-shadow': 'warn',

      // --- JavaScript Best Practices ---
      eqeqeq: 'error',
      complexity: ['error', 20],
      curly: 'error',
      'guard-for-in': 'error',
      'max-classes-per-file': ['error', 1],
      'max-len': ['warn', { code: 120, comments: 160 }],
      'max-lines': ['error', 400],
      'no-bitwise': 'error',
      'no-console': 'off',
      'no-new-wrappers': 'error',
      'no-useless-concat': 'error',
      'no-var': 'error',
      'no-restricted-syntax': 'off',
      'no-shadow': 'off',
      'one-var': ['error', 'never'],
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
    },
  },
  ...ngZenConfig,
  {
    files: ['src/schematics/ui/files/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-shadow': 'off',
      'max-classes-per-file': 'off',
      '@angular-eslint/template/attributes-order': 'off',
      'import-x/no-duplicates': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility, prettierRecommended],
    rules: {
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          alphabetical: true,
          order: [
            'STRUCTURAL_DIRECTIVE',
            'TEMPLATE_REFERENCE',
            'ATTRIBUTE_BINDING',
            'INPUT_BINDING',
            'TWO_WAY_BINDING',
            'OUTPUT_BINDING',
          ],
        },
      ],
      '@angular-eslint/template/button-has-type': ['warn', { ignoreWithDirectives: ['zen-button', 'zen-btn'] }],
      '@angular-eslint/template/cyclomatic-complexity': ['warn', { maxComplexity: 10 }],
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-ngsrc': 'warn',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',
      '@angular-eslint/template/use-track-by-function': 'warn',

      'prettier/prettier': [
        'error',
        {
          parser: 'angular',
          endOfLine: 'auto',
        },
      ],
    },
  },
  prettierRecommended,
]);
