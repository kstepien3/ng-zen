import { GeneratorSchemaBase } from '../../types';

export type AbstractType = 'control-value-accessor';

export interface AbstractGeneratorSchema extends GeneratorSchemaBase {
  abstract: AbstractType[];
}
