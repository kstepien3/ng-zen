import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, StoryObj } from '@storybook/angular';

import { ZenRadio } from './radio';

interface StoryParams {
  selectedColor?: string;
}

type Options = ZenRadio & StoryParams;

export default {
  title: 'Ui/Radio',
  component: ZenRadio,
  argTypes: {
    value: {
      table: {
        category: 'models',
        type: {
          summary: 'string | null',
        },
        defaultValue: {
          summary: 'null',
        },
      },
      control: 'text',
    },
    name: {
      table: {
        category: 'models',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'radio',
        },
      },
      control: 'text',
    },
    option: {
      table: {
        category: 'inputs',
        type: {
          summary: 'string',
        },
      },
      control: 'text',
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'models',
        type: {
          summary: 'boolean',
        },
      },
    },
    required: {
      control: 'boolean',
      table: {
        category: 'inputs',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onInput: {
      table: {
        readonly: true,
        type: {
          summary: '(value: string | null) => void',
        },
      },
    },
  },
  args: {
    value: null,
    name: 'radio-group',
    option: 'option1',
    disabled: false,
    required: false,
  },
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 0.25rem">
        <zen-radio name="label-example" option="option1" />
        <label for="label-example"> With label </label>
      </div>
  `,
  }),
};

export const NgModel: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [FormsModule],
    },
    props: {
      selectedColor: 'blue',
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <div>
            <strong>Selected value:</strong>
            <p> {{ selectedColor || 'None' }}</p>
         </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem">
          <div style="display: flex; align-items: center; gap: 0.25rem">
            <zen-radio name="color-group" option="red" [(ngModel)]="selectedColor" />
            <label>Red</label>
          </div>
          <div style="display: flex; align-items: center; gap: 0.25rem">
            <zen-radio name="color-group" option="green" [(ngModel)]="selectedColor" />
            <label>Green</label>
          </div>
          <div style="display: flex; align-items: center; gap: 0.25rem">
            <zen-radio name="color-group" option="blue" [(ngModel)]="selectedColor" />
            <label>Blue</label>
          </div>
        </div>
      </div>
  `,
  }),
};

export const AsFromControl: Story = {
  render: () => {
    return {
      moduleMetadata: {
        imports: [ReactiveFormsModule],
      },
      props: {
        colorControl: new FormControl('green'),
      },
      template: `
        <div style="display: flex; flex-direction: column; gap: 1rem">
          <div>
            <strong>Selected value:</strong>
            <p> {{ colorControl.value || 'None' }}</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem">
            <div style="display: flex; align-items: center; gap: 0.25rem">
              <zen-radio name="working-group" option="red" [formControl]="colorControl" />
              <label>Red</label>
            </div>
            <div style="display: flex; align-items: center; gap: 0.25rem">
              <zen-radio name="working-group" option="green" [formControl]="colorControl" />
              <label>Green</label>
            </div>
            <div style="display: flex; align-items: center; gap: 0.25rem">
              <zen-radio name="working-group" option="blue" [formControl]="colorControl" />
              <label>Blue</label>
            </div>
          </div>
        </div>
      `,
    };
  },
};
