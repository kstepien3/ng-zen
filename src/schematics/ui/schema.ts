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
  | 'button'
  | 'card'
  | 'checkbox'
  | 'dialog'
  | 'divider'
  | 'form-control'
  | 'icon'
  | 'input'
  | 'popover'
  | 'radio'
  | 'skeleton'
  | 'switch'
  | 'textarea';

export interface Schema extends GeneratorSchemaBase {
  ui: UiType[];
}
