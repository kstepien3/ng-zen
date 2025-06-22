import { chain, Rule, schematic, SchematicContext, Tree } from '@angular-devkit/schematics';

import { NgZenGeneratorSchema } from './ng-zen-generator';

export function ngAdd(options: NgZenGeneratorSchema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    _context.logger.info('Adding library to the project');

    // Run other schematics from ng-add
    return chain([schematic('component', options)]);
  };
}
