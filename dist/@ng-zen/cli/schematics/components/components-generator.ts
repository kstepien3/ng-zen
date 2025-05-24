import { GeneratorSchemaBase } from '../../types';

export type ComponentType = 'avatar' | 'button' | 'checkbox' | 'divider' | 'input' | 'switch' | 'textarea';

export interface ComponentGeneratorSchema extends GeneratorSchemaBase {
  components: ComponentType[];
}
