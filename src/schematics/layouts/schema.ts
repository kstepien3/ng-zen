import { GeneratorSchemaBase } from '../ui/schema';

export type LayoutType = 'dashboard';

export interface Schema extends GeneratorSchemaBase {
  layouts: LayoutType[];
}
