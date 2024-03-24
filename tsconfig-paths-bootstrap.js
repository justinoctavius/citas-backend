/* eslint-disable @typescript-eslint/no-var-requires */
// tsconfig-paths-bootstrap.js

const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.outDir,
  paths: tsConfig.compilerOptions.paths,
});
