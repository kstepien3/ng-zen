import { normalize, strings } from '@angular-devkit/core';
import { apply, applyTemplates, chain, filter, mergeWith, move, Rule, url } from '@angular-devkit/schematics';

import { selectedElements } from '../services/selected-elements';
import { GeneratorSchemaBase, SchematicsFolder } from '../types';

const createTemplateRules = (folder: string, path: string): Rule[] => [
  applyTemplates({
    name: folder,
    localeDate: new Date().toLocaleString(),
    ...strings,
  }),
  move(normalize(`${path}/${folder}`)),
];

const getTemplates = (rules: Rule[]) => apply(url(`./templates`), rules);
const includeStories = (include: boolean) => filter(filePath => include || !filePath.endsWith('.stories.ts'));

export function applyFileTemplateUtil(folders: SchematicsFolder[], config: GeneratorSchemaBase): Rule[] {
  selectedElements.push(...folders);
  return folders.map(folder => {
    const RULES = createTemplateRules(folder, config.path as string);

    const folderSource = apply(url(`./files/${folder}`), [includeStories(config.stories), ...RULES]);

    return chain([folderSource, getTemplates(RULES)].map(mergeWith));
  });
}
