import { Component, inject, input, output } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenButton } from '../button';
import { ZenDialog } from './dialog';
import { DIALOG_REF, type DialogRef, ZenDialogService } from './dialog.service';
import DialogMeta from './dialog.stories';

type Story = StoryObj<ZenDialogService>;

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
  title: 'UI/Dialog/Dynamic',
  component: ZenDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      canvas: {
        // This will remove the "show code" button
        // https://storybook.js.org/docs/api/doc-blocks/doc-block-canvas#sourcestate
        sourceState: 'none',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ServiceDemoComponent, ServiceDemoRefComponent],
      providers: [ZenDialogService],
    }),
  ],
  args: { ...DialogMeta.args, open: false },
  argTypes: { ...DialogMeta.argTypes, open: { table: { disable: true } } },
} satisfies Meta<ZenDialog>;

export default meta;

export const ServiceUsage: Story = {
  render: () => ({
    template: `<app-service-demo />`,
  }),
};

export const ServiceWithDialogRef: Story = {
  render: () => ({
    template: `<app-service-demo-ref />`,
  }),
};
