import { NodeDependencyType } from '@schematics/angular/utility/dependencies';

import { UiType } from '../schematics/ui/schema';

type Kind = Record<NodeDependencyType, Record<string, string>>;

export type FilesConfig = Record<UiType, Partial<Kind>>;
