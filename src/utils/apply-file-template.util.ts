import { normalize, strings } from '@angular-devkit/core';
import { apply, applyTemplates, chain, filter, mergeWith, move, Rule, url } from '@angular-devkit/schematics';
import { GeneratorSchemaBase } from '../types';
import { SchematicsFolder } from '../types/schematics-folder.type';

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
  return folders.map(folder => {
    const RULES = createTemplateRules(folder, config.path);

    const folderSource = apply(url(`./files/${folder}`), [includeStories(config.stories), ...RULES]);

    return chain([folderSource, getTemplates(RULES)].map(mergeWith));
  });
}
