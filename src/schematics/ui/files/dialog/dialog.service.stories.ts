import { Component, inject, input, output } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenButton } from '../button';
import { ZenDialog } from './dialog';
import { DIALOG_REF, DialogConfig, ZenDialogService } from './dialog.service';

type Story = StoryObj<ZenDialogService>;

const component = `

ZenDialogService stories demonstrate dynamic dialog usage via service.

### Usage

\`\`\`typescript
// Dialog content component
@Component({
  template: \`
    <p>{{ message() }}</p>
    <button (click)="confirm.emit()">Confirm</button>
  \`
})
class MyDialogContent {
  readonly message = input<string>();
  readonly confirm = output<void>();
}

// Open dialog
@Component({
  template: \`<button (click)="open()">Open</button>\`,
   providers: [ZenDialogService],
})
export class OpenComponent {
  private readonly dialogService = inject(ZenDialogService);

  open(): void {
    const ref = this.dialogService.open(MyDialogContent, {
      header: 'My Dialog',
      size: 'md',
      inputs: { message: 'Hello!' },
      outputs: { confirm: () => ref.close() },
    });
  }
}
\`\`\`

### DIALOG_REF

Close dialog from within the content component:

\`\`\`typescript
@Component({...})
class MyDialogContent {
  private readonly dialogRef = inject(DIALOG_REF);

  close() {
    this.dialogRef.close();
  }
}
\`\`\`

See [GitHub](https://github.com/kstepien3/ng-zen), [MDN Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
`;

@Component({
  template: `
    <p>{{ message() }}</p>
    <div style="display: flex; gap: 0.5rem; margin-top: 1rem; justify-content: end">
      <button (click)="cancel()" variant="secondary" zen-btn>Cancel</button>
      <button (click)="confirmClick.emit('confirmed!')" zen-btn>Confirm</button>
    </div>
  `,
  standalone: true,
  imports: [ZenButton],
})
class DemoDialogContent {
  readonly message = input.required<string>();
  readonly confirmClick = output<string>();
  readonly cancelClick = output<void>();
  readonly dialogRef = inject(DIALOG_REF);

  cancel(): void {
    this.cancelClick.emit();
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
  readonly args = input<DialogConfig<DemoDialogContent>>();

  private readonly dialogService = inject(ZenDialogService);

  openDialog(): void {
    const ref = this.dialogService.open(DemoDialogContent, {
      ...this.args(),
      inputs: { message: 'This dialog was opened via service!' },
      outputs: {
        confirmClick: (value: string) => {
          alert(`Confirmed: ${value}`);
          ref.close();
        },
        cancelClick: () => {
          console.info('Actually canceled via DIALOG_REF');
        },
      },
    });
  }
}

const meta = {
  title: 'UI/Dialog/Dynamic',
  component: ZenDialog,
  tags: [],
  parameters: {
    docs: {
      description: {
        component,
      },
      canvas: {
        sourceState: 'none',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ServiceDemoComponent],
      providers: [ZenDialogService],
    }),
  ],
  argTypes: {
    size: {
      name: 'size',
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      table: {
        category: 'inputs',
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    header: { control: 'text', table: { category: 'inputs' } },
    closable: { control: 'boolean', table: { category: 'inputs', defaultValue: { summary: 'true' } } },
    backdrop: { control: 'boolean', table: { category: 'inputs', defaultValue: { summary: 'true' } } },
    closeOnEscape: { control: 'boolean', table: { category: 'inputs', defaultValue: { summary: 'true' } } },
    open: { control: 'boolean', table: { disable: true } },
  },
  args: {
    size: 'md',
    header: 'Dialog Title',
    closable: true,
    backdrop: true,
    closeOnEscape: true,
  },
} satisfies Meta<ZenDialog>;

export default meta;

export const Default: Story = {
  render: args => ({
    props: { args },
    template: `<app-service-demo [args]="args" />`,
  }),
};
