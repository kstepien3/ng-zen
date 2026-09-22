import { join, normalize, Path } from '@angular-devkit/core';
import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { buildDefaultPath, getWorkspace } from '@schematics/angular/utility/workspace';

import { applyFileTemplateUtil } from '../../utils';
import { Schema as UiOptions, UiType } from './schema';

const DEFAULT_GENERATION_PATH = 'ui'; // src/app/ui

const FORM_CONTROL_DEPS: ReadonlySet<UiType> = new Set(['input', 'checkbox', 'switch', 'radio', 'native-select']);

const FORM_HELPER_COMPONENTS: readonly { name: UiType; file: string }[] = [
  { name: 'form-control', file: 'form-control/form-control.ts' },
  { name: 'hint', file: 'hint/hint.ts' },
  { name: 'label', file: 'label/label.ts' },
];

function resolveFormControlDependency(
  tree: Tree,
  logger: SchematicContext['logger'],
  ui: UiType[],
  workingDirectory: Path
): void {
  if (!ui.some(u => FORM_CONTROL_DEPS.has(u))) return;

  for (const { name, file } of FORM_HELPER_COMPONENTS) {
    if (ui.includes(name)) continue;

    const targetPath = normalize(`${workingDirectory}/${file}`);
    if (tree.exists(targetPath)) {
      logger.info(`ℹ ${name} skipped — already exists`);
    } else {
      ui.push(name);
      logger.info(`✔ ${name} included (auto-included for form components)`);
    }
  }
}

export function uiGenerator({ ui: selected, project, ...options }: UiOptions): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    const projectName = project ?? (workspace.extensions['defaultProject'] as string);
    const projectObj = workspace.projects.get(projectName);

    if (!projectObj) {
      throw new Error(`Project "${projectName}" not found in workspace.`);
    }

    options.path ??= (buildDefaultPath(projectObj) + '/' + DEFAULT_GENERATION_PATH) as Path;

    const workingDirectory = normalize(join(options.currentDirectory, options.path));
    const ui = [...selected];

    resolveFormControlDependency(tree, context.logger, ui, workingDirectory);

    const deduplicatedUi = Array.from(new Set(ui));

    return chain([...applyFileTemplateUtil(deduplicatedUi, { ...options, path: workingDirectory })]);
  };
}
