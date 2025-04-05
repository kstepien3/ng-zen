import { createBuilder } from '@angular-devkit/architect';
import { execa } from 'execa';
import cpy from 'cpy';
import path from 'node:path';
import fs from 'fs-extra';

const LOG = {
  log: (logger, level, type, message) => {
    const timestamp = new Date().toISOString();
    const output = `[${timestamp}] [${type}] ${message}`;

    // Use the appropriate logger method based on the log level
    switch (level) {
      case 'INFO':
        logger.info(output);
        break;
      case 'ERROR':
        logger.error(output);
        break;
      default:
        logger.log(output);
    }
  },

  info: (logger, type, message) => LOG.log(logger, 'INFO', type, message),
  error: (logger, type, message) => LOG.log(logger, 'ERROR', type, message),
};
async function cleanOutputDirectory(outputDir, context) {
  try {
    if (await fs.pathExists(outputDir)) {
      await fs.rm(outputDir, { recursive: true, force: true });
    }
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    LOG.error(context.logger, 'ERROR', `Failed to clean output directory: ${error.message}`);
    context.logger.error();
    throw error;
  }
}

async function getOutputDir(tsConfigPath, workspaceRoot) {
  const fullPath = path.resolve(workspaceRoot, tsConfigPath);
  const configContent = await fs.readFile(fullPath, 'utf-8');
  const config = JSON.parse(configContent);

  const outDir = config.compilerOptions?.outDir || 'dist';
  const tsConfigDir = path.dirname(fullPath);

  return path.resolve(tsConfigDir, outDir);
}

async function compileTypeScript(tsConfig, context) {
  await execa('tsc', ['-p', tsConfig], {
    stdio: 'inherit',
    cwd: context.currentDirectory,
  });
}

async function copyProjectFiles(files, outputDir, context) {
  await cpy(files, outputDir, {
    parents: true,
    cwd: context.currentDirectory,
  });
}

async function cleanPackageJson(outputDir) {
  const distPackageJson = path.join(outputDir, 'package.json');
  const pkg = await fs.readJson(distPackageJson);
  delete pkg.scripts;
  delete pkg.devDependencies;
  await fs.writeJson(distPackageJson, pkg, { spaces: 2 });
}

export default createBuilder(async (options, context) => {
  try {
    const outputDir = await getOutputDir(options.tsConfig, context.workspaceRoot);
    LOG.info(context.logger, 'BUILD', 'Starting build process...');

    LOG.info(context.logger, 'CLEANING', `Cleaning old distribution files in ${outputDir}`);
    await cleanOutputDirectory(outputDir, context);
    LOG.info(context.logger, 'CLEANING', `Cleaning completed successfully.`);

    LOG.info(context.logger, 'COMPILING', `Compiling TypeScript files using config: ${options.tsConfig}`);
    await compileTypeScript(options.tsConfig, context);
    LOG.info(context.logger, 'COMPILING', 'Compilation completed successfully.');

    LOG.info(context.logger, 'COPYING', `Copying project files to: ${outputDir}`);
    await copyProjectFiles(options.files, outputDir, context);
    LOG.info(context.logger, 'COPYING', 'Copy completed successfully.');

    LOG.info(context.logger, 'UPDATING', `Updating package.json file.`);
    await cleanPackageJson(outputDir);
    LOG.info(context.logger, 'UPDATING', 'Update completed successfully.');

    return { success: true };
  } catch (error) {
    LOG.error(context.logger, 'ERROR', `Build failed: ${error.message}`);
    return { success: false };
  }
});
