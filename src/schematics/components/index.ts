import { join, normalize } from '@angular-devkit/core';
import { chain, Rule, schematic } from '@angular-devkit/schematics';

import { applyFileTemplateUtil } from '../../utils';
import { Schema as ComponentOptions } from './schema';

export function componentGenerator({ components, ...options }: ComponentOptions): Rule {
  return async () => {
    const workingDirectory = normalize(join(options.currentDirectory, options.path ?? './'));

    return chain([
      ...applyFileTemplateUtil(components, { ...options, path: workingDirectory }),
      schematic('dependency-manager', {}),
    ]);
  };
}
