import { Rule, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';

import { selectedElements } from '../../services/selected-elements';
import { DEPENDENCIES_CONFIG } from './dependencies.constant';

export function dependencyManager(): Rule {
  return (tree: Tree, context) => {
    for (const component of selectedElements) {
      for (const type of [
        NodeDependencyType.Default,
        NodeDependencyType.Dev,
        NodeDependencyType.Peer,
        NodeDependencyType.Optional,
      ]) {
        const dependencies = DEPENDENCIES_CONFIG?.[`${component}`]?.[type] ?? {};

        for (const [name, version] of Object.entries(dependencies)) {
          addPackageJsonDependency(tree, {
            type,
            name,
            version,
            overwrite: false,
          });
        }
      }
    }

    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
