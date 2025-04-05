import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

import { addPathToTsconfigUtil } from '../../utils';
import { NgZenGeneratorSchema } from './ng-zen-generator';

export function ngAdd(options: NgZenGeneratorSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info('Adding library to the project');

    addPathToTsconfigUtil(tree, 'ng-zen/*', [`${options.path}/*`]);

    return tree;
  };
}
