import { create } from 'storybook/theming';

import { brand } from './base';

export default create({
  base: 'light',

  // Brand configuration
  ...brand,
  brandImage: './logo_storybook.png',

  // Color palette based on zen design system
  colorPrimary: 'hsl(200 100% 50%)', // Focus/accent color from design system
  colorSecondary: 'hsl(0 0% 20%)', // Hover state color

  // UI colors
  appBg: 'hsl(240 10% 96%)',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: 'hsl(0 0% 90%)',
  appBorderRadius: 8,

  // Text colors
  textColor: 'hsl(0 0% 20%)',
  textInverseColor: '#ffffff',
  textMutedColor: 'hsl(0 0% 60%)',

  // Toolbar
  barTextColor: 'hsl(0 0% 40%)',
  barSelectedColor: 'hsl(200 100% 50%)',
  barHoverColor: 'hsl(200 100% 60%)',
  barBg: 'hsl(240 10% 96%)',

  // Form inputs
  inputBg: '#ffffff',
  inputBorder: 'hsl(0 0% 80%)',
  inputTextColor: 'hsl(0 0% 20%)',
  inputBorderRadius: 6,

  // Button styling to match zen components
  buttonBg: 'hsl(0 0% 0%)',
  buttonBorder: 'transparent',
});
