/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@ng-zen/cli/(.*)': '<rootDir>/src/$1',
    '^ng-zen/components/(.*)': '<rootDir>/src/schematics/components/files/$1',
    '^ng-zen/directives/(.*)': '<rootDir>/src/schematics/directives/files/$1',
  },
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
} satisfies Config;
