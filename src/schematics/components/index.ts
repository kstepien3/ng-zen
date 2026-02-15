import { join, normalize, Path } from '@angular-devkit/core';
import { chain, Rule, schematic, Tree } from '@angular-devkit/schematics';
import { buildDefaultPath, getWorkspace } from '@schematics/angular/utility/workspace';

import { applyFileTemplateUtil } from '../../utils';
import { Schema as ComponentOptions } from './schema';

const DEFAULT_GENERATION_PATH = 'ui'; // src/app/ui

export function componentGenerator({ components, ...options }: ComponentOptions): Rule {
  return async (tree: Tree) => {
    const workspace = await getWorkspace(tree);
    const projectName = options.project || (workspace.extensions['defaultProject'] as string);
    const project = workspace.projects.get(projectName);

    if (!project) {
      throw new Error(`Project "${projectName}" not found in workspace.`);
    }

    if (options.path === undefined) {
      options.path = (buildDefaultPath(project) + '/' + DEFAULT_GENERATION_PATH) as Path;
    }

    const workingDirectory = normalize(join(options.currentDirectory, options.path));

    return chain([
      ...applyFileTemplateUtil(components, { ...options, path: workingDirectory }),
      schematic('dependency-manager', {}),
    ]);
  };
}
