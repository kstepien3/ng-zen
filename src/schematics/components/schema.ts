import { GeneratorSchemaBase } from '../../types';

export type ComponentType =
  | 'avatar'
  | 'button'
  | 'checkbox'
  | 'divider'
  | 'form-control'
  | 'icon'
  | 'input'
  | 'skeleton'
  | 'switch'
  | 'textarea'
  | 'alert';

export interface Schema extends GeneratorSchemaBase {
  components: ComponentType[];
}
