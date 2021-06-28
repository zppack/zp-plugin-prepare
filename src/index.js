import { execSync } from 'child_process';
import path from 'path';
import chalk from 'chalk';
import log from '@zppack/log';

const plugin = async (ctx) => {
  const { appPath } = ctx;

  const shellCwd = appPath;
  log.d('Zp Prepare Plugin: shell working directory = ' + chalk.underline(shellCwd));

  const pkg = await import(path.resolve(shellCwd, 'package.json'));
  log.d('Zp Prepare Plugin: reading package.json: \n', chalk.gray(JSON.stringify(pkg)));

  if (pkg.scripts && pkg.scripts.prepare) {
  const sh = 'npm run prepare';
    log.i('Zp Prepare Plugin: npm preparing...');
    log.d('Zp Prepare Plugin: executing shell ' + chalk.blue(sh));
    try {
      execSync(sh, { cwd: shellCwd });
      log.i('Zp Prepare Plugin: npm prepared successfully.');
    } catch (err) {
      log.e(chalk.redBright(`${err} (Error Code: 3002)`));
    }
  }
};

export default plugin;
