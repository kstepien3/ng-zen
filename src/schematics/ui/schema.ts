import { GeneratorSchemaBase } from '../../types';

export type UiType =
  | 'alert'
  | 'avatar'
  | 'button'
  | 'checkbox'
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
