import { Path } from '@angular-devkit/core';

export interface GeneratorSchemaBase {
  currentDirectory: Path;
  path: Path;
  stories: boolean;
}
