const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const content = `export const SDK_VERSION = "${pkg.version}";`

fs.writeFileSync(path.resolve(__dirname, '../src/version.ts'), content);
console.log(`Automatically generated version.ts with version ${pkg.version}`);