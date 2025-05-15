// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintPluginImport = require('eslint-plugin-import');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const unicorn = require('eslint-plugin-unicorn');
const unusedImports = require('eslint-plugin-unused-imports');
const storybook = require('eslint-plugin-storybook');

module.exports = tseslint.config(
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      'simple-import-sort': simpleImportSort,
      'import/recommended': eslintPluginImport.flatConfigs,
      unicorn: unicorn,
      'unused-imports': unusedImports,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'zen',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'zen',
          style: 'kebab-case',
        },
      ],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'unused-imports/no-unused-imports': 'warn',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-self-closing-tags': ['error'],
    },
  },
  {
    files: ['**/*.html', '**/*.ts'],
    extends: [prettierRecommended],
    rules: {
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
  {
    ignores: ['!.storybook'],
  }
);
