import { GeneratorSchemaBase } from '../ui/schema';

export type LayoutType = 'dashboard' | 'focus';

export interface Schema extends GeneratorSchemaBase {
  layouts: LayoutType[];
}
