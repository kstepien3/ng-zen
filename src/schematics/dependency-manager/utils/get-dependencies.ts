import { NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';

import { FilesConfig } from '../../../types';
import { ComponentType } from '../../components/schema';

export function getDependencies(
  selectedElements: ComponentType[],
  dependenciesConfig: Partial<FilesConfig>
): NodeDependency[] {
  const dependencies: NodeDependency[] = [];

  for (const component of selectedElements) {
    if (!dependenciesConfig[component]) continue;

    for (const type of Object.values(NodeDependencyType)) {
      const typeDeps = dependenciesConfig[component][type];
      if (!typeDeps) continue;

      for (const [name, version] of Object.entries(typeDeps)) {
        dependencies.push({
          type,
          name,
          version,
          overwrite: false,
        });
      }
    }
  }

  return dependencies;
}
