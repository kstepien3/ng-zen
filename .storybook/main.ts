import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['./stories/**/*.@(js|jsx|ts|tsx|mdx)', '../src/schematics/**/*.stories.@(ts)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/angular',
  docs: {
    autodocs: true,
    defaultName: 'Docs',
  },
};
export default config;
