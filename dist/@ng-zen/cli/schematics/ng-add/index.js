"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngAdd = ngAdd;
const schematics_1 = require("@angular-devkit/schematics");
function ngAdd(options) {
    return (_tree, _context) => {
        _context.logger.info('Adding library to the project');
        // Run other schematics from ng-add
        return (0, schematics_1.chain)([(0, schematics_1.schematic)('component', options)]);
    };
}
//# sourceMappingURL=index.js.map