import { GeneratorSchemaBase } from '../../types';

export type ComponentType =
  | 'avatar'
  | 'button'
  | 'checkbox'
  | 'divider'
  | 'icon'
  | 'input'
  | 'skeleton'
  | 'switch'
  | 'textarea';

export interface ComponentGeneratorSchema extends GeneratorSchemaBase {
  components: ComponentType[];
}
