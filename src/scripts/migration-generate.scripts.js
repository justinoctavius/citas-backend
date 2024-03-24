/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

exec(
  `npm run typeorm --- migration:generate src/database/migrations/${args['name']}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  },
);
