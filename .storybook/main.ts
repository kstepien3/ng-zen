import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['./stories/**/*.@(js|jsx|ts|tsx|mdx)', '../src/schematics/**/*.stories.@(ts)'],
  addons: ['@storybook/addon-links', '@chromatic-com/storybook', '@storybook/addon-docs'],
  framework: '@storybook/angular',
  docs: {
    defaultName: 'Docs',
  },
};
export default config;
