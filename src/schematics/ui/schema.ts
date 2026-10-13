import { Path } from '@angular-devkit/core';

export interface GeneratorSchemaBase {
  currentDirectory: Path;
  path?: Path;
  stories: boolean;
  project?: string;
}

export type UiType =
  | 'alert'
  | 'avatar'
  | 'badge'
  | 'button'
  | 'card'
  | 'checkbox'
  | 'dialog'
  | 'divider'
  | 'dot'
  | 'drawer'
  | 'form-control'
  | 'hint'
  | 'icon'
  | 'input'
  | 'label'
  | 'pin'
  | 'popover'
  | 'radio'
  | 'sidenav'
  | 'skeleton'
  | 'switch'
  | 'tabs'
  | 'textarea';

export interface Schema extends GeneratorSchemaBase {
  ui: UiType[];
}
