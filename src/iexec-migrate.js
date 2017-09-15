#!/usr/bin/env node

const Debug = require('debug');
const fs = require('fs');
const Web3 = require('web3');
const Promise = require('bluebird');
const cli = require('commander');
const path = require('path');
const tx = require('@warren-bank/ethereumjs-tx-sign');
const truffle = require('./truffle-cli');
const wallet = require('./wallet');
// eslint-disable-next-line
const truffleConfig = require(path.join(process.cwd(), 'truffle.js'));
// eslint-disable-next-line
const iexecConfig = require(path.join(process.cwd(), 'iexec.js'));

const debug = Debug('iexec:iexec-migrate');
const readFileAsync = Promise.promisify(fs.readFile);

cli
  .option('--network [name]', 'migrate to network name', 'ropsten')
  .option('--wallet <type>', 'choose type of wallet', /^(local|remote)$/i, 'local')
  .parse(process.argv);

const migrate = async () => {
  const network = truffleConfig.networks[cli.network];
  const web3 = new Web3(new Web3.providers.HttpProvider(network.host));

  await truffle.compile();

  console.log(`Deploying ${iexecConfig.name} contract...`);
  const compiledFile = await readFileAsync(`build/contracts/${iexecConfig.name}.json`);
  const { abi, unlinked_binary } = JSON.parse(compiledFile);

  const contract = new web3.eth.Contract(abi);

  const unsignedTx = contract.deploy({
    data: unlinked_binary,
    arguments: [iexecConfig.oracleAddress],
  }).encodeABI();

  if (cli.wallet === 'local') {
    const userWallet = await wallet.load();
    const [networkGasPrice, nonce, networkChainId] = await Promise.all([
      web3.eth.getGasPrice(),
      web3.eth.getTransactionCount(userWallet.address),
      web3.eth.net.getId(),
    ]);
    debug('networkGasPrice', networkGasPrice);
    debug('nonce', nonce);

    const gasPriceMultiplier = network.gasPriceMultiplier || 3;
    const gasPrice = network.gasPrice || networkGasPrice * gasPriceMultiplier;
    debug('gasPrice', gasPrice);
    const gasLimit = network.gas || 4400000;
    debug('gasLimit', gasLimit);
    const chainId = network.chainId || networkChainId;
    debug('chainId', chainId);

    const { rawTx } = tx.sign({
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      data: unsignedTx,
      chainId,
    }, userWallet.privateKey);

    // const txReceipt = await web3.eth.sendSignedTransaction('0x'.concat(rawTx))
    //   .once('transactionHash', hash => debug('hash', hash))
    //   .on('error', error => debug('error', error));
    // debug('txReceipt', txReceipt);
  } else if (cli.wallet === 'remote') {
    debug('remote');
  }
};
migrate();
