import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function ngAdd(): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info('🔧 Setting up ng-zen...');

    return tree;
  };
}
