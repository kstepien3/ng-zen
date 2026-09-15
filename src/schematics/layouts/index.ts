import { join, normalize, Path } from '@angular-devkit/core';
import { chain, Rule } from '@angular-devkit/schematics';
import { buildDefaultPath, getWorkspace } from '@schematics/angular/utility/workspace';

import { applyFileTemplateUtil } from '../../utils';
import { Schema as LayoutsOptions } from './schema';

const DEFAULT_GENERATION_PATH = 'layouts'; // src/app/layouts

export function layoutsGenerator({ layouts: selected, project, ...options }: LayoutsOptions): Rule {
  return async tree => {
    const workspace = await getWorkspace(tree);
    const projectName = project ?? (workspace.extensions['defaultProject'] as string);
    const projectObj = workspace.projects.get(projectName);

    if (!projectObj) {
      throw new Error(`Project "${projectName}" not found in workspace.`);
    }

    options.path ??= (buildDefaultPath(projectObj) + '/' + DEFAULT_GENERATION_PATH) as Path;

    const workingDirectory = normalize(join(options.currentDirectory, options.path));

    return chain([...applyFileTemplateUtil([...selected], { ...options, path: workingDirectory })]);
  };
}
