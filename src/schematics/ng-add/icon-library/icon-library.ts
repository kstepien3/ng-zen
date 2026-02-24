import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency } from '@schematics/angular/utility/dependencies';

import { HugeiconsCoreFree } from './icon-libraries';

export function installIconLibrary(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('📦 Installing @hugeicons/core-free-icons...');

    addPackageJsonDependency(tree, HugeiconsCoreFree);
    context.addTask(new NodePackageInstallTask());

    context.logger.info('✅ @hugeicons/core-free-icons has been added to your project.');

    return tree;
  };
}

export function logIconLibraryManualInstructions(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('To use <zen-icon>, install an SVG icon library (one-time setup):');
    context.logger.info('  - Recommended: @hugeicons/core-free-icons');
    context.logger.info('  - Or use any other SVG icon library and pass icons via the [icon] input.');

    return tree;
  };
}
