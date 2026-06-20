import { join, normalize, Path } from '@angular-devkit/core';
import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { buildDefaultPath, getWorkspace } from '@schematics/angular/utility/workspace';

import { applyFileTemplateUtil } from '../../utils';
import { Schema as UiOptions, UiType } from './schema';

const DEFAULT_GENERATION_PATH = 'ui'; // src/app/ui

const FORM_CONTROL_DEPS: ReadonlySet<UiType> = new Set(['input', 'checkbox', 'switch', 'radio']);

function resolveFormControlDependency(
  tree: Tree,
  logger: SchematicContext['logger'],
  ui: UiType[],
  workingDirectory: Path
): void {
  if (!ui.some(u => FORM_CONTROL_DEPS.has(u))) return;

  const fcPath = normalize(`${workingDirectory}/form-control/form-control.ts`);
  if (tree.exists(fcPath)) {
    logger.info('ℹ form-control skipped — already exists');
  } else {
    ui.push('form-control');
    logger.info('✔ form-control included (auto-included for form components)');
  }
}

export function uiGenerator({ ui: selected, project, ...options }: UiOptions): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    const projectName = project || (workspace.extensions['defaultProject'] as string);
    const projectObj = workspace.projects.get(projectName);

    if (!projectObj) {
      throw new Error(`Project "${projectName}" not found in workspace.`);
    }

    if (options.path === undefined) {
      options.path = (buildDefaultPath(projectObj) + '/' + DEFAULT_GENERATION_PATH) as Path;
    }

    const workingDirectory = normalize(join(options.currentDirectory, options.path));
    const ui = [...selected];

    resolveFormControlDependency(tree, context.logger, ui, workingDirectory);

    return chain([...applyFileTemplateUtil(ui, { ...options, path: workingDirectory })]);
  };
}
