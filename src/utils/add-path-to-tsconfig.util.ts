import { SchematicsException, Tree } from '@angular-devkit/schematics';

export function addPathToTsconfigUtil(tree: Tree, key: string, value: string[]): void {
  const tsconfigPath = 'tsconfig.json';

  // Check if tsconfig.json exists
  if (!tree.exists(tsconfigPath)) {
    throw new SchematicsException('tsconfig.json does not exist');
  }

  // Read tsconfig.json content as string
  const tsconfigBuffer = tree.read(tsconfigPath);
  if (!tsconfigBuffer) {
    throw new SchematicsException('Failed to read tsconfig.json');
  }
  let tsconfigContent = tsconfigBuffer.toString('utf-8');

  // Extract and preserve the comment
  const commentMatch = tsconfigContent.match(/\/\*[\s\S]*?\*\//);
  const comment = commentMatch ? commentMatch[0] : '';

  // Remove comment from content to parse JSON
  tsconfigContent = tsconfigContent.replace(comment, '');

  // Parse tsconfig.json content
  let tsconfig;
  try {
    tsconfig = JSON.parse(tsconfigContent);
  } catch (e) {
    throw new SchematicsException('Failed to parse tsconfig.json' + e);
  }

  // Modify compilerOptions.paths to add your new mapping
  if (!tsconfig.compilerOptions) {
    tsconfig.compilerOptions = {};
  }
  if (!tsconfig.compilerOptions.paths) {
    tsconfig.compilerOptions.paths = {};
  }
  tsconfig.compilerOptions.paths[key] = value;

  // Convert tsconfig back to JSON string
  tsconfigContent = JSON.stringify(tsconfig, null, 2);

  // Ensure the preserved comment is prepended to the JSON string
  tsconfigContent = `${comment}\n${tsconfigContent}`;

  // Write back to tsconfig.json
  tree.overwrite(tsconfigPath, tsconfigContent);
}
