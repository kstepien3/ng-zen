import { GeneratorSchemaBase } from '../../types';

export type ComponentType = 'avatar' | 'button' | 'checkbox' | 'input';

export interface ComponentGeneratorSchema extends GeneratorSchemaBase {
  components: ComponentType[];
}
