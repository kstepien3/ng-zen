import { Meta, moduleMetadata } from '@storybook/angular';

import { ZenCheckbox } from '../checkbox';
import { ZenInput } from '../input';
import { ZenSwitch } from '../switch';
import { ZenFormControl } from './form-control';

export default {
  title: 'Components/FormControl',
  component: ZenFormControl,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ZenCheckbox, ZenInput, ZenSwitch] })],
  args: {
    value: '',
    disabled: false,
    required: false,
  },
  argTypes: {
    value: { control: false },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  parameters: {
    docs: {
      canvas: {
        // This will remove the "show code" button
        // https://storybook.js.org/docs/api/doc-blocks/doc-block-canvas#sourcestate
        sourceState: 'none',
      },
    },
  },
} satisfies Meta<ZenFormControl<unknown>>;

export { Default as Checkbox } from '../checkbox/checkbox.stories';
export { Default as Input } from '../input/input.stories';
export { Default as Switch } from '../switch/switch.stories';
