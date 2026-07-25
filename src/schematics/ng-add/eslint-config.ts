import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

type ModuleFormat = 'cjs' | 'esm';

export function findEslintConfig(tree: Tree): string | null {
  for (const name of ['eslint.config.js', 'eslint.config.mjs', 'eslint.config.ts']) {
    if (tree.exists(name)) return name;
  }
  return null;
}

function detectFormat(code: string): ModuleFormat {
  return code.includes('require(') || code.includes('module.exports') ? 'cjs' : 'esm';
}

function getImportStatement(code: string): string {
  if (detectFormat(code) === 'cjs') {
    return "const ngZen = require('@ng-zen/cli/eslint-config');\n";
  }
  return "import ngZen from '@ng-zen/cli/eslint-config';\n";
}

function addImport(code: string): string {
  if (code.includes('@ng-zen/cli/eslint-config')) return code;

  const statement = getImportStatement(code);

  if (detectFormat(code) === 'cjs') {
    const lastRequire = code.lastIndexOf('\nconst ');
    if (lastRequire < 0) return code;
    const insertAt = code.indexOf('\n', lastRequire + 1) + 1;
    return code.slice(0, insertAt) + statement + code.slice(insertAt);
  }

  const importEnd = code.lastIndexOf('\nimport ');
  const insertAt = importEnd > 0 ? code.indexOf('\n', importEnd + 1) + 1 : code.indexOf('\n') + 1;
  return code.slice(0, insertAt) + statement + code.slice(insertAt);
}

function spreadConfig(code: string): string {
  const defineConfigMatch = /defineConfig\(\s*\[([\s\S]*?)\]\s*\)/.exec(code);
  if (!defineConfigMatch) return code;

  const existingArray = defineConfigMatch[0];
  if (existingArray.includes('...ngZen')) return code;

  const newArray = existingArray.replace(/\]\s*\)$/, ', ...ngZen,\n  ])');
  return code.replace(existingArray, newArray);
}

export function logEslintManualInstructions(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const configPath = findEslintConfig(tree);
    if (!configPath) return tree;

    context.logger.info('');
    context.logger.info('⚠️ To add ng-zen ESLint config manually:');
    context.logger.info('  1. Run: npm install -D @ng-zen/cli');
    context.logger.info('  2. In eslint.config.js, add:');
    context.logger.info("       import ngZen from '@ng-zen/cli/eslint-config';");
    context.logger.info('       // then spread ...ngZen into the defineConfig array');
    context.logger.info('  See: Manual Configuration page in Storybook');

    return tree;
  };
}

export function updateEslintConfig(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const configPath = findEslintConfig(tree);

    if (!configPath) {
      context.logger.info('ℹ️ No flat ESLint config found — skip ESLint update');
      return tree;
    }

    let code = tree.read(configPath)!.toString('utf-8');

    if (!code.includes('defineConfig')) {
      context.logger.warn('⚠️ ESLint config does not use defineConfig — skip automatic update');
      return tree;
    }

    const hadImport = code.includes('@ng-zen/cli/eslint-config');
    code = addImport(code);
    code = spreadConfig(code);

    tree.overwrite(configPath, code);

    if (hadImport) {
      context.logger.info('✅ ESLint config already has @ng-zen/cli config — ensured it is in defineConfig array');
    } else {
      context.logger.info('✅ Added @ng-zen/cli/eslint-config to ESLint config');
    }

    return tree;
  };
}
