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
  | 'textarea';

export interface Schema extends GeneratorSchemaBase {
  components: ComponentType[];
}
