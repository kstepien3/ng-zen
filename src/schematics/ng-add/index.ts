import { Rule } from '@angular-devkit/schematics';

import { installIconLibrary, logIconLibraryManualInstructions } from './icon-library';
import { Schema } from './schema';

export function ngAdd(options: Schema): Rule {
  return (tree, context) => {
    context.logger.info('🔧 Setting up ng-zen...');

    if (options.installIconLibrary) {
      return installIconLibrary()(tree, context);
    }

    return logIconLibraryManualInstructions()(tree, context);
  };
}
