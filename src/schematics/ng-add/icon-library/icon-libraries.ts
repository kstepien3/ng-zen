import { NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';

export const HugeiconsCoreFree: NodeDependency = {
  name: '@hugeicons/core-free-icons',
  version: 'latest',
  type: NodeDependencyType.Default,
  overwrite: false,
};
