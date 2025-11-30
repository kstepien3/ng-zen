import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['./stories/**/*.@(js|jsx|ts|tsx|mdx)', '../src/schematics/**/*.stories.@(ts)'],
  addons: ['@storybook/addon-links', '@chromatic-com/storybook', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular',
    options: {
      base: '/ng-zen/',
    },
  },
  staticDirs: ['../assets/'],
  docs: {
    defaultName: 'Docs',
  },
  env: config => ({
    ...config,
    NODE_ENV: 'development',
  }),
};
export default config;
