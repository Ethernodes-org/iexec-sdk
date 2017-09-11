const Debug = require('debug');
const util = require('util');
const { exec } = require('child_process');
const cli = require('commander');
const fs = require('fs-extra');
const copy = require('recursive-copy');

const execAsync = util.promisify(exec);
const debug = Debug('iexec-init');

const IEXEC_GITHUB = 'git@github.com:iExecBlockchainComputing/';
const SAMPLES_REPO = 'iexec-dapp-samples.git';
const ORACLE_REPO = 'iexec-oracle';

cli.parse(process.argv);

debug('cli', cli.args);

async function init() {
  const branchName = cli.args.length ? cli.args[0] : 'hello-world';

  await execAsync(`git clone --depth=1 -b ${branchName} ${IEXEC_GITHUB}${SAMPLES_REPO} .`);
  await fs.remove('./.git');

  await execAsync(`git clone --depth=1 ${IEXEC_GITHUB}${ORACLE_REPO} temp`);

  await copy('./temp/contracts', './contracts');
  await fs.remove('./temp');
}
init();
