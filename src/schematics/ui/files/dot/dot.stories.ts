import { Component, signal } from '@angular/core';
import { Tick02Icon } from '@hugeicons/core-free-icons';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenAvatar } from '../avatar';
import { ZenBadge } from '../badge';
import { ZenButton } from '../button';
import { ZenIcon } from '../icon';
import { ZenPin, ZenPinItem } from '../pin';
import { ZenDot } from './dot';
import { ZenDotAnimation, ZenDotSeverity, ZenDotSize, ZenDotVariant } from './dot.types';

type Options = ZenDot & {
  severity: ZenDotSeverity;
  size: ZenDotSize;
  variant: ZenDotVariant;
  animation: ZenDotAnimation;
  bordered: boolean;
  disabled: boolean;
};

@Component({
  selector: 'zen-carousel-pagination-demo',
  imports: [ZenDot, ZenButton],
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        @for (item of items; track item; let i = $index) {
          <zen-dot
            severity="neutral"
            size="sm"
            style="cursor: pointer;"
            [variant]="activeStep() === i ? 'pill' : 'solid'"
            (click)="activeStep.set(i)"
          />
        }
      </div>

      <div style="display: flex; gap: 0.5rem;">
        <button size="sm" variant="outline" zen-button (click)="prev()">Previous</button>
        <button color="primary" size="sm" variant="solid" zen-button (click)="next()">Next</button>
      </div>

      <span style="font-size: 0.75rem; color: #64748b;">Step {{ activeStep() + 1 }} of {{ items.length }}</span>
    </div>
  `,
})
class CarouselPaginationDemo {
  readonly items = [0, 1, 2, 3];
  readonly activeStep = signal(0);

  next = (): void => this.activeStep.update(i => (i + 1) % this.items.length);
  prev = (): void => this.activeStep.update(i => (i - 1 + this.items.length) % this.items.length);
}

export default {
  title: 'Ui/Dot',
  component: ZenDot,
  args: {
    severity: 'neutral',
    size: 'md',
    variant: 'solid',
    animation: 'none',
    bordered: false,
    disabled: false,
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'warning', 'danger', 'info', 'error'],
      description: 'The semantic color theme of the dot.',
      table: { category: 'inputs', type: { summary: 'ZenDotSeverity' }, defaultValue: { summary: 'neutral' } },
    },
    color: {
      control: 'color',
      description: 'Custom CSS color value (hex, rgb, hsl) or semantic severity alias.',
      table: { category: 'inputs', type: { summary: 'string' } },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'The size of the dot (preset or custom size).',
      table: { category: 'inputs', type: { summary: 'ZenDotSize' }, defaultValue: { summary: 'md' } },
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ring', 'dnd', 'pill'],
      description: 'Visual variant: solid, outline, ring (for depth), dnd (Do Not Disturb), or pill.',
      table: { category: 'inputs', type: { summary: 'ZenDotVariant' }, defaultValue: { summary: 'solid' } },
    },
    animation: {
      control: 'select',
      options: ['none', 'wave', 'pulse', 'glow'],
      description: 'Animation style: wave (live status sonar), pulse (breathing), or glow.',
      table: { category: 'inputs', type: { summary: 'ZenDotAnimation' }, defaultValue: { summary: 'none' } },
    },
    bordered: {
      control: 'boolean',
      description: 'Adds an outer ring / border to provide depth separation on images or avatars.',
      table: { category: 'inputs', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dot is disabled (reduced opacity, grayscale).',
      table: { category: 'inputs', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
  render: args => ({
    props: args,
    template: `<zen-dot ${argsToTemplate(args)} />`,
  }),
} satisfies Meta<Options>;

type Story = StoryObj<Options>;

export const Default: Story = {};

export const AllSeverities: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="neutral" /><span>Neutral</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="primary" /><span>Primary</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="success" /><span>Success</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="warning" /><span>Warning</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="danger" /><span>Danger</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="info" /><span>Info</span>
        </div>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1.5rem; align-items: center;">
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="primary" size="xs" /><span>xs (6px)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="primary" size="sm" /><span>sm (8px)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="primary" size="md" /><span>md (10px)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="primary" size="lg" /><span>lg (12px)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="primary" [size]="18" /><span>custom (18px)</span>
        </div>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="success" size="lg" variant="solid" /><span>Solid</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="success" size="lg" variant="outline" /><span>Outline</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; background: #e2e8f0; padding: 0.5rem; border-radius: 0.375rem;">
          <zen-dot severity="success" size="lg" variant="ring" /><span>Ring (Depth)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="danger" size="lg" variant="dnd" /><span>Do Not Disturb (DND)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <zen-dot severity="primary" size="md" variant="pill" /><span>Pill</span>
        </div>
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  decorators: [moduleMetadata({ imports: [ZenIcon] })],
  render: () => ({
    props: { Tick02Icon },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem 2rem; max-width: 520px; font-size: 0.875rem; color: #1e293b;">
        <div style="display: flex; align-items: center; gap: 0.625rem;">
          <zen-dot color="#e2e8f0" [size]="18">
            <zen-icon color="#0f172a" [icon]="Tick02Icon" [size]="12" [strokeWidth]="2.5" />
          </zen-dot>
          <span>Solid natural wood</span>
        </div>

        <div style="display: flex; align-items: center; gap: 0.625rem;">
          <zen-dot color="#e2e8f0" [size]="18">
            <zen-icon color="#0f172a" [icon]="Tick02Icon" [size]="12" [strokeWidth]="2.5" />
          </zen-dot>
          <span>Zero glare & blue light</span>
        </div>

        <div style="display: flex; align-items: center; gap: 0.625rem;">
          <zen-dot color="#e2e8f0" [size]="18">
            <zen-icon color="#0f172a" [icon]="Tick02Icon" [size]="12" [strokeWidth]="2.5" />
          </zen-dot>
          <span>Months of battery</span>
        </div>

        <div style="display: flex; align-items: center; gap: 0.625rem;">
          <zen-dot color="#e2e8f0" [size]="18">
            <zen-icon color="#0f172a" [icon]="Tick02Icon" [size]="12" [strokeWidth]="2.5" />
          </zen-dot>
          <span>100% private · Local-first</span>
        </div>
      </div>
    `,
  }),
};

export const ColorPaletteSwatches: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem; background: #f8fafc; border-radius: 0.75rem; border: 1px solid #e2e8f0; width: fit-content;">
        <span style="font-weight: 600; font-size: 0.875rem; color: #334155;">Palette Swatches</span>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <zen-dot color="#262b2f" size="sm" />
          <zen-dot color="#7b8e7b" size="sm" />
          <zen-dot color="#d5b895" size="sm" />
          <zen-dot color="#bf6240" size="sm" />
        </div>
      </div>
    `,
  }),
};

export const CarouselPagination: Story = {
  decorators: [moduleMetadata({ imports: [CarouselPaginationDemo] })],
  render: () => ({
    template: `<zen-carousel-pagination-demo />`,
  }),
};

export const Animations: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.875rem;">
          <zen-dot animation="wave" severity="danger" size="sm" /><span>Live (Wave)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.875rem;">
          <zen-dot animation="pulse" severity="success" size="sm" /><span>Active (Pulse)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.875rem;">
          <zen-dot animation="glow" severity="primary" size="sm" /><span>Connecting (Glow)</span>
        </div>
      </div>
    `,
  }),
};

export const StatusList: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 280px; padding: 1.25rem; background: #f8fafc; border-radius: 0.75rem; border: 1px solid #e2e8f0;">
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <span style="font-weight: 600; font-size: 0.9375rem; color: #0f172a;">Production API</span>
          <div style="display: flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; color: #475569;">
            <zen-dot severity="success" size="sm" /><span>Active</span>
          </div>
          <span style="font-size: 0.75rem; color: #94a3b8;">99.98% uptime</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <span style="font-weight: 600; font-size: 0.9375rem; color: #0f172a;">Staging Environment</span>
          <div style="display: flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; color: #475569;">
            <zen-dot severity="neutral" size="sm" /><span>Standby</span>
          </div>
          <span style="font-size: 0.75rem; color: #94a3b8;">Idle</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <span style="font-weight: 600; font-size: 0.9375rem; color: #0f172a;">Backup Cluster</span>
          <div style="display: flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; color: #475569;">
            <zen-dot severity="warning" size="sm" /><span>Degraded</span>
          </div>
          <span style="font-size: 0.75rem; color: #94a3b8;">Syncing node 2</span>
        </div>
      </div>
    `,
  }),
};

export const InsideBadge: Story = {
  decorators: [moduleMetadata({ imports: [ZenBadge] })],
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
        <zen-badge color="success" variant="outline">
          <zen-dot animation="wave" severity="success" size="xs" />
          Live
        </zen-badge>

        <zen-badge color="primary" variant="filled">
          <zen-dot animation="pulse" severity="primary" size="xs" />
          In Progress
        </zen-badge>

        <zen-badge color="warning" variant="filled">
          <zen-dot severity="warning" size="xs" />
          Degraded
        </zen-badge>

        <zen-badge color="danger" variant="filled">
          <zen-dot animation="wave" severity="danger" size="xs" />
          Critical
        </zen-badge>

        <zen-badge color="neutral" variant="ghost">
          <zen-dot severity="neutral" size="xs" />
          Offline
        </zen-badge>
      </div>
    `,
  }),
};

export const AvatarStatus: Story = {
  decorators: [moduleMetadata({ imports: [ZenAvatar, ZenPin, ZenPinItem] })],
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <zen-avatar zenPin>
            AL
            <zen-dot bordered severity="success" size="sm" zenPinItem zenPinOffset="-5px" zenPinPosition="bottom right" />
          </zen-avatar>
          <span style="font-size: 0.75rem; color: #64748b;">Online</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <zen-avatar zenPin>
            JD
            <zen-dot bordered severity="danger" size="sm" variant="dnd" zenPinItem zenPinOffset="-5px" zenPinPosition="bottom right" />
          </zen-avatar>
          <span style="font-size: 0.75rem; color: #64748b;">Do Not Disturb</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <zen-avatar zenPin>
            MR
            <zen-dot bordered severity="warning" size="sm" zenPinItem zenPinOffset="-5px" zenPinPosition="bottom right" />
          </zen-avatar>
          <span style="font-size: 0.75rem; color: #64748b;">Away</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <zen-avatar zenPin>
            KS
            <zen-dot animation="wave" bordered severity="danger" size="sm" zenPinItem zenPinOffset="-5px" zenPinPosition="bottom right" />
          </zen-avatar>
          <span style="font-size: 0.75rem; color: #64748b;">In a Call</span>
        </div>

      </div>
    `,
  }),
};

export const IndicatorGroup: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.375rem; align-items: center; padding: 0.5rem; background: #f1f5f9; border-radius: 0.5rem; width: fit-content;">
        <zen-dot severity="danger" size="xs" />
        <zen-dot severity="warning" size="xs" />
        <zen-dot severity="success" size="xs" />
      </div>
    `,
  }),
};
