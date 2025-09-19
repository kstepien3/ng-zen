import { setCompodocJson } from '@storybook/addon-docs/angular';
import type { Preview } from '@storybook/angular';
import { themes } from 'storybook/theming';

import docJson from '../documentation/documentation.json';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    layout: 'centered',
    docs: {
      theme: themes.light,
      codePanel: true,
    },
  },
  tags: ['autodocs'],
};

export default preview;
