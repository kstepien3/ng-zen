import { Component, inject, input, output, signal } from '@angular/core';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenButton } from '../button';
import { ZenDialog } from './dialog';
import { DIALOG_REF, type DialogRef, ZenDialogService } from './dialog.service';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

type Story = StoryObj<ZenDialog>;

@Component({
  template: `
    <p>{{ message() }}</p>
    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
      <button (click)="confirmClick.emit('confirmed!')" zen-btn>Confirm</button>
      <button (click)="cancelClick.emit()" zen-btn>Cancel</button>
    </div>
  `,
  standalone: true,
  imports: [ZenButton],
})
class DemoDialogContent {
  readonly message = input.required<string>();
  readonly confirmClick = output<string>();
  readonly cancelClick = output<void>();
}

@Component({
  template: `
    <p>{{ message() }}</p>
    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
      <button (click)="onConfirm()" zen-btn>Confirm & Close</button>
      <button (click)="onCancel()" zen-btn>Cancel</button>
    </div>
  `,
  standalone: true,
  imports: [ZenButton],
})
class DemoDialogContentWithRef {
  readonly message = input.required<string>();
  private readonly dialogRef = inject(DIALOG_REF) as DialogRef<DemoDialogContentWithRef>;

  onConfirm(): void {
    alert('Confirmed from inside component!');
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-service-demo',
  template: `
    <button (click)="openDialog()" zen-btn>Open via Service</button>
  `,
  standalone: true,
  imports: [ZenButton],
  providers: [ZenDialogService],
})
class ServiceDemoComponent {
  private readonly dialogService = inject(ZenDialogService);

  openDialog(): void {
    const ref = this.dialogService.open(DemoDialogContent, {
      header: 'Service Dialog',
      size: 'md',
      inputs: { message: 'This dialog was opened via service!' },
      outputs: {
        confirmClick: (value: string) => {
          alert(`Confirmed: ${value}`);
          ref.close();
        },
        cancelClick: () => ref.close(),
      },
    });
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-service-demo-ref',
  template: `
    <button (click)="openDialog()" zen-btn>Open with DIALOG_REF</button>
  `,
  standalone: true,
  imports: [ZenButton],
  providers: [ZenDialogService],
})
class ServiceDemoRefComponent {
  private readonly dialogService = inject(ZenDialogService);

  openDialog(): void {
    this.dialogService.open(DemoDialogContentWithRef, {
      header: 'Dialog with DIALOG_REF',
      size: 'md',
      inputs: { message: 'This dialog closes itself using inject(DIALOG_REF)!' },
    });
  }
}

const meta = {
  title: 'Ui/Dialog',
  component: ZenDialog,
  decorators: [
    moduleMetadata({
      imports: [ZenButton, ZenDialog],
      providers: [ZenDialogService],
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
  },
  args: {
    size: 'md',
    header: 'Dialog Title',
    closable: true,
    backdrop: true,
    closeOnEscape: true,
    id: 'zen-dialog-story',
  },
  tags: ['ui', 'dialog', 'modal'],
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

export const ServiceUsage: Story = {
  decorators: [
    moduleMetadata({
      imports: [ServiceDemoComponent],
    }),
  ],
  render: () => ({
    template: `<app-service-demo />`,
  }),
};

export const ServiceWithDialogRef: Story = {
  decorators: [
    moduleMetadata({
      imports: [ServiceDemoRefComponent],
    }),
  ],
  render: () => ({
    template: `<app-service-demo-ref />`,
  }),
};
