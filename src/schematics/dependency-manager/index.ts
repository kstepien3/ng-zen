import { Rule, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency } from '@schematics/angular/utility/dependencies';

import { selectedElements } from '../../services/selected-elements';
import { DEPENDENCIES_CONFIG } from './dependencies.constant';
import { getDependencies } from './utils/get-dependencies';

export function dependencyManager(): Rule {
  return (tree: Tree, context) => {
    const dependenciesToInstall: NodeDependency[] = getDependencies(selectedElements, DEPENDENCIES_CONFIG);

    if (!dependenciesToInstall.length) {
      context.logger.info('✅ No dependencies to install for the selected elements.');
      return tree;
    }

    context.logger.info(`📦 Installing ${dependenciesToInstall.length} dependencies...`);

    for (const dependency of dependenciesToInstall) {
      addPackageJsonDependency(tree, dependency);
    }

    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
