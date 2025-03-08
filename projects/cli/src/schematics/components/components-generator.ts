import { GeneratorSchemaBase } from '../../types';

export type ComponentType = 'avatar' | 'button' | 'input';

export interface ComponentGeneratorSchema extends GeneratorSchemaBase {
  components: ComponentType[];
}
