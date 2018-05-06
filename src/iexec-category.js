#!/usr/bin/env node

const cli = require('commander');
const hub = require('./hub');
const {
  handleError, help, desc, option,
} = require('./cli-helper');
const { loadIExecConf } = require('./fs');
const { loadChain } = require('./chains.js');

const objName = 'category';

cli.option(...option.chain()).option(...option.hub());

cli
  .command('create')
  .description(desc.createObj(objName))
  .action(async () => {
    try {
      const [iexecConf, chain] = await Promise.all([
        loadIExecConf(),
        loadChain(cli.chain),
      ]);
      const hubAddress = cli.hub || chain.hub;
      await hub.createCategory(chain.contracts, iexecConf[objName], {
        hub: hubAddress,
      });
    } catch (error) {
      handleError(error, objName);
    }
  });

cli
  .command('show <index>')
  .description(desc.showObj(objName, 'hub'))
  .action(async (index) => {
    try {
      const chain = await loadChain(cli.chain);
      const hubAddress = cli.hub || chain.hub;
      await hub.showCategory(chain.contracts, index, { hub: hubAddress });
    } catch (error) {
      handleError(error, objName);
    }
  });

cli
  .command('count')
  .description(desc.showObj(objName, 'hub'))
  .action(async () => {
    try {
      const chain = await loadChain(cli.chain);
      const hubAddress = cli.hub || chain.hub;
      await hub.countCategory(chain.contracts, { at: hubAddress });
    } catch (error) {
      handleError(error, objName);
    }
  });

help(cli);
