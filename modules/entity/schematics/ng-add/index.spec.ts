import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Schema as EntityOptions } from './schema';
import { createWorkspace } from '../../../schematics-core/testing';

describe('Entity ng-add Schematic', () => {
  const schematicRunner = new SchematicTestRunner(
    '@ngrx/entity',
    path.join(__dirname, '../collection.json')
  );
  const defaultOptions: EntityOptions = {
    skipPackageJson: false,
  };

  let appTree: UnitTestTree;

  beforeEach(() => {
    appTree = createWorkspace(schematicRunner, appTree);
  });

  it('should update package.json', () => {
    const options = { ...defaultOptions };

    const tree = schematicRunner.runSchematic('ng-add', options, appTree);
    const packageJson = JSON.parse(tree.readContent('/package.json'));

    expect(packageJson.dependencies['@ngrx/entity']).toBeDefined();
  });

  it('should skip package.json update', () => {
    const options = { ...defaultOptions, skipPackageJson: true };

    const tree = schematicRunner.runSchematic('ng-add', options, appTree);
    const packageJson = JSON.parse(tree.readContent('/package.json'));

    expect(packageJson.dependencies['@ngrx/entity']).toBeUndefined();
  });
});
