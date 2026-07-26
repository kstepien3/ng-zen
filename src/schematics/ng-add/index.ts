import { chain, Rule } from '@angular-devkit/schematics';

import { logEslintManualInstructions, updateEslintConfig } from './eslint-config';
import { installIconLibrary, logIconLibraryManualInstructions } from './icon-library';
import { Schema } from './schema';

export function ngAdd(options: Schema): Rule {
  return (tree, context) => {
    context.logger.info('🔧 Setting up ng-zen...');

    const rules: Rule[] = [];

    if (options.installIconLibrary) {
      rules.push(installIconLibrary());
    } else {
      rules.push(logIconLibraryManualInstructions());
    }

    if (options.updateEslint) {
      rules.push(updateEslintConfig());
    } else {
      rules.push(logEslintManualInstructions());
    }

    return chain(rules)(tree, context);
  };
}
