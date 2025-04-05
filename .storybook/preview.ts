import { setCompodocJson } from '@storybook/addon-docs/angular';
import type { Preview } from '@storybook/angular';

import docJson from '../documentation/documentation.json';
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
};

export default preview;
