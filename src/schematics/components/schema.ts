import { GeneratorSchemaBase } from '../../types';

export type ComponentType =
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
  components: ComponentType[];
}
