import { signal } from '@angular/core';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenButton } from '../button';
import { ZenDialog } from './dialog';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

type Story = StoryObj<ZenDialog>;

const meta = {
  title: 'UI/Dialog/Dialog',
  component: ZenDialog,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ZenButton, ZenDialog],
    }),
  ],
  argTypes: {
    size: {
      name: 'size',
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'] satisfies DialogSize[],
      table: {
        category: 'inputs',
        type: { summary: 'string' },
        defaultValue: { summary: 'md' satisfies DialogSize },
      },
    },
    header: { control: 'text', table: { category: 'inputs' } },
    closable: { control: 'boolean', table: { category: 'inputs', defaultValue: { summary: 'true' } } },
    backdrop: { control: 'boolean', table: { category: 'inputs', defaultValue: { summary: 'true' } } },
    closeOnEscape: { control: 'boolean', table: { category: 'inputs', defaultValue: { summary: 'true' } } },
    id: { control: 'text', table: { defaultValue: { summary: 'zen-dialog-*X*' } } },
    open: { control: 'boolean', table: { readonly: true, category: 'models' } },
  },
  args: {
    size: 'md',
    header: 'Dialog Title',
    closable: true,
    backdrop: true,
    closeOnEscape: true,
    id: 'zen-dialog-story',
  },
} satisfies Meta<ZenDialog>;

export default meta;

export const Default: Story = {
  render: args => ({
    props: { ...args, isOpen: signal(false) },
    template: `
      <button zen-btn (click)="isOpen.set(true)">Open Dialog</button>

      <dialog zen-dialog [(open)]="isOpen" ${argsToTemplate(args)}>
        <p>This is the dialog content. You can put any content here.</p>
        <button zen-btn (click)="isOpen.set(false)">Close</button>
      </dialog>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: {
      openSm: signal(false),
      openMd: signal(false),
      openLg: signal(false),
      openXl: signal(false),
      openFull: signal(false),
    },
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button zen-btn (click)="openSm.set(true)">Small</button>
        <button zen-btn (click)="openMd.set(true)">Medium</button>
        <button zen-btn (click)="openLg.set(true)">Large</button>
        <button zen-btn (click)="openXl.set(true)">Extra Large</button>
        <button zen-btn (click)="openFull.set(true)">Full Screen</button>
      </div>

      <dialog zen-dialog [(open)]="openSm" header="Small Dialog" size="sm">
        <p>Small dialog content</p>
      </dialog>

      <dialog zen-dialog [(open)]="openMd" header="Medium Dialog" size="md">
        <p>Medium dialog content</p>
      </dialog>

      <dialog zen-dialog [(open)]="openLg" header="Large Dialog" size="lg">
        <p>Large dialog content with more space for complex layouts.</p>
      </dialog>

      <dialog zen-dialog [(open)]="openXl" header="Extra Large Dialog" size="xl">
        <p>Extra large dialog content for data tables, forms, etc.</p>
      </dialog>

      <dialog zen-dialog [(open)]="openFull" header="Full Screen Dialog" size="full">
        <p>Full screen dialog content</p>
      </dialog>
    `,
  }),
};
