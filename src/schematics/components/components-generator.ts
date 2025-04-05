import { GeneratorSchemaBase } from '../../types';

export type ComponentType = 'avatar' | 'button' | 'checkbox' | 'input' | 'textarea';

export interface ComponentGeneratorSchema extends GeneratorSchemaBase {
  components: ComponentType[];
}
