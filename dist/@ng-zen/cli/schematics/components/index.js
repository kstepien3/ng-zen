"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentGenerator = componentGenerator;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("../../utils");
function componentGenerator({ components, ...config }) {
    return () => {
        return (0, schematics_1.chain)((0, utils_1.applyFileTemplateUtil)(components, config));
    };
}
//# sourceMappingURL=index.js.map