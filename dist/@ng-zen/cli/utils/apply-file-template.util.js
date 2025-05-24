"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFileTemplateUtil = applyFileTemplateUtil;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const createTemplateRules = (folder, path) => [
    (0, schematics_1.applyTemplates)({
        name: folder,
        localeDate: new Date().toLocaleString(),
        ...core_1.strings,
    }),
    (0, schematics_1.move)((0, core_1.normalize)(`${path}/${folder}`)),
];
const getTemplates = (rules) => (0, schematics_1.apply)((0, schematics_1.url)(`./templates`), rules);
const includeStories = (include) => (0, schematics_1.filter)(filePath => include || !filePath.endsWith('.stories.ts'));
function applyFileTemplateUtil(folders, config) {
    return folders.map(folder => {
        const RULES = createTemplateRules(folder, config.path);
        const folderSource = (0, schematics_1.apply)((0, schematics_1.url)(`./files/${folder}`), [includeStories(config.stories), ...RULES]);
        return (0, schematics_1.chain)([folderSource, getTemplates(RULES)].map(schematics_1.mergeWith));
    });
}
//# sourceMappingURL=apply-file-template.util.js.map