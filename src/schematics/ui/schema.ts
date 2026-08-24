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
  | 'drawer'
  | 'form-control'
  | 'icon'
  | 'input'
  | 'pin'
  | 'popover'
  | 'radio'
  | 'skeleton'
  | 'switch'
  | 'textarea';

export interface Schema extends GeneratorSchemaBase {
  ui: UiType[];
}
