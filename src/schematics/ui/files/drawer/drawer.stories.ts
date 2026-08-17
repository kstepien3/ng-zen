import { signal } from '@angular/core';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ZenButton } from '../button';
import { ZenDrawer } from './drawer';

type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

type Story = StoryObj<ZenDrawer>;

const meta = {
  title: 'UI/Drawer',
  component: ZenDrawer,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ZenButton, ZenDrawer],
    }),
  ],
  argTypes: {
    side: {
      name: 'side',
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'] satisfies DrawerSide[],
      table: {
        category: 'inputs',
        type: { summary: 'string' },
        defaultValue: { summary: 'right' satisfies DrawerSide },
      },
    },
    size: {
      name: 'size',
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'] satisfies DrawerSize[],
      table: {
        category: 'inputs',
        type: { summary: 'string' },
        defaultValue: { summary: 'md' satisfies DrawerSize },
      },
    },
    backdrop: { control: 'boolean', table: { category: 'inputs', defaultValue: { summary: 'true' } } },
    closeOnEscape: { control: 'boolean', table: { category: 'inputs', defaultValue: { summary: 'true' } } },
    swipeHandle: { control: 'boolean', table: { category: 'inputs', defaultValue: { summary: 'true' } } },
    handleOnly: { control: 'boolean', table: { category: 'inputs', defaultValue: { summary: 'false' } } },
    scaleBackground: { control: 'boolean', table: { category: 'inputs', defaultValue: { summary: 'false' } } },
    open: { control: 'boolean', table: { readonly: false, category: 'models' } },
  },
  args: {
    side: 'right',
    size: 'md',
    backdrop: true,
    closeOnEscape: true,
    swipeHandle: true,
    handleOnly: false,
    scaleBackground: false,
    open: false,
  },
} satisfies Meta<ZenDrawer>;

export default meta;

export const Default: Story = {
  render: ({ open, ...args }) => {
    const mutatedArgs = { ...args, open: signal(open) };
    return {
      props: { ...mutatedArgs },
      template: `
      <button zen-btn (click)="open.set(true)">Open Drawer</button>

      <zen-drawer #drawer [(open)]="open" ${argsToTemplate(args)}>
        <h2 drawer-header>Drawer Title</h2>
        <p>This is the drawer content. You can put any content here.</p>
        <div drawer-footer>
          <button zen-btn (click)="drawer.close()" variant="filled" color="danger">Close</button>
        </div>
      </zen-drawer>
    `,
    };
  },
};

export const Sides: Story = {
  render: () => ({
    props: {
      openLeft: signal(false),
      openRight: signal(false),
      openTop: signal(false),
      openBottom: signal(false),
    },
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button zen-btn (click)="openLeft.set(true)">Left</button>
        <button zen-btn (click)="openRight.set(true)">Right</button>
        <button zen-btn (click)="openTop.set(true)">Top</button>
        <button zen-btn (click)="openBottom.set(true)">Bottom</button>
      </div>

      <zen-drawer [(open)]="openLeft" side="left">
        <h2 drawer-header>Left Drawer</h2>
        <p>Drawer slides in from the left</p>
      </zen-drawer>

      <zen-drawer [(open)]="openRight" side="right">
        <h2 drawer-header>Right Drawer</h2>
        <p>Drawer slides in from the right</p>
      </zen-drawer>

      <zen-drawer [(open)]="openTop" side="top">
        <h2 drawer-header>Top Drawer</h2>
        <p>Drawer slides in from the top</p>
      </zen-drawer>

      <zen-drawer [(open)]="openBottom" side="bottom">
        <h2 drawer-header>Bottom Drawer</h2>
        <p>Drawer slides in from the bottom</p>
      </zen-drawer>
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

      <zen-drawer [(open)]="openSm" size="sm">
        <h2 drawer-header>Small Drawer</h2>
        <p>Small drawer content</p>
      </zen-drawer>

      <zen-drawer [(open)]="openMd" size="md">
        <h2 drawer-header>Medium Drawer</h2>
        <p>Medium drawer content</p>
      </zen-drawer>

      <zen-drawer [(open)]="openLg" size="lg">
        <h2 drawer-header>Large Drawer</h2>
        <p>Large drawer content with more space for complex layouts.</p>
      </zen-drawer>

      <zen-drawer [(open)]="openXl" size="xl">
        <h2 drawer-header>Extra Large Drawer</h2>
        <p>Extra large drawer content for data tables, forms, etc.</p>
      </zen-drawer>

      <zen-drawer [(open)]="openFull" size="full">
        <h2 drawer-header>Full Screen Drawer</h2>
        <p>Full screen drawer content</p>
      </zen-drawer>
    `,
  }),
};

export const SnapPoints: Story = {
  render: () => ({
    props: {
      openSnap: signal(false),
    },
    template: `
      <button zen-btn (click)="openSnap.set(true)">Open Snap Points</button>

      <zen-drawer [(open)]="openSnap" side="bottom" [snapPoints]="[0.25, 0.5, 1]">
        <h2 drawer-header>Snap Drawer</h2>
        <p>Drag up/down to snap between 25%, 50%, and 100% of viewport.</p>
        <div style="height: 300px; background: hsl(200deg 80% 95%); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-top: 1rem;">
          <p>Scrollable content area</p>
        </div>
        <div style="height: 300px; background: hsl(200deg 80% 95%); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-top: 1rem;">
          <p>More content</p>
        </div>
      </zen-drawer>
    `,
  }),
};

export const HandleOnly: Story = {
  render: () => ({
    props: {
      openHandle: signal(false),
    },
    template: `
      <button zen-btn (click)="openHandle.set(true)">Handle Only</button>

      <zen-drawer [(open)]="openHandle" side="bottom" [handleOnly]="true">
        <h2 drawer-header>Handle Only Drawer</h2>
        <p>Only the grab handle can drag this drawer. Click or drag anywhere else on the content.</p>
        <div style="height: 200px; background: hsl(120deg 80% 95%); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-top: 1rem;">
          <p>Content that won't drag</p>
        </div>
      </zen-drawer>
    `,
  }),
};

export const ScaleBackground: Story = {
  render: () => ({
    props: {
      openScale: signal(false),
    },
    template: `
      <style>body.zen-drawer-open { transform: scale(0.98); transition: transform 0.3s ease; }</style>
      <button zen-btn (click)="openScale.set(true)">Scale Background</button>

      <zen-drawer [(open)]="openScale" side="bottom" [scaleBackground]="true">
        <h2 drawer-header>Scale Drawer</h2>
        <p>The page behind scales down slightly while this drawer is open.</p>
      </zen-drawer>
    `,
  }),
};
