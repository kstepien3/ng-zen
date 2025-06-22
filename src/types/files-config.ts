import { NodeDependencyType } from '@schematics/angular/utility/dependencies';

import { ComponentType } from '../schematics/components/components-generator';

type Kind = Record<NodeDependencyType, Record<string, string>>;

export type FilesConfig = Record<ComponentType, Partial<Kind>>;
