import { chain, Rule } from '@angular-devkit/schematics';

import { applyFileTemplateUtil } from '../../utils';
import { ComponentGeneratorSchema } from './components-generator';

export function componentGenerator({ components, ...config }: ComponentGeneratorSchema): Rule {
  return () => {
    return chain(applyFileTemplateUtil(components, config));
  };
}
