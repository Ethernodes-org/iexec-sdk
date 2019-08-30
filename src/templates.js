const main = {
  description:
    'My iExec ressource description, must be at least 150 chars long in order to pass the validation checks. Describe your application, dataset or workerpool to your users',
  license: 'MIT',
  author: '?',
  social: {
    website: '?',
    github: '?',
  },
  logo: 'logo.png',
};

const app = {
  owner: '0x0000000000000000000000000000000000000000',
  name: 'VanityEth',
  type: 'DOCKER',
  multiaddr: 'registry.hub.docker.com/iexechub/vanityeth:1.1.1',
  checksum:
    '0x00f51494d7a42a3c1c43464d9f09e06b2a99968e3b978f6cd11ab3410b7bcd14',
  mrenclave: '',
};

const buyConf = {
  params: { 0: '' },
  tag: '0x0000000000000000000000000000000000000000000000000000000000000000',
  trust: 0,
  callback: '0x0000000000000000000000000000000000000000',
};

const dataset = {
  owner: '0x0000000000000000000000000000000000000000',
  name: 'my-dataset',
  multiaddr: '/ipfs/QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ',
  checksum:
    '0x0000000000000000000000000000000000000000000000000000000000000000',
};

const compatibleDapp = {
  name: 'Recomanded-dapp-for-MyDataset',
  addresses: {
    42: '0x0000000000000000000000000000000000000000',
  },
  buyConf,
};

const dapps = [compatibleDapp];

const workerpool = {
  owner: '0x0000000000000000000000000000000000000000',
  description: 'my-workerpool',
};

const order = {
  apporder: {
    app: '0x0000000000000000000000000000000000000000',
    appprice: '0',
    volume: '1000000',
    tag: '0x0000000000000000000000000000000000000000000000000000000000000000',
    datasetrestrict: '0x0000000000000000000000000000000000000000',
    workerpoolrestrict: '0x0000000000000000000000000000000000000000',
    requesterrestrict: '0x0000000000000000000000000000000000000000',
  },
  datasetorder: {
    dataset: '0x0000000000000000000000000000000000000000',
    datasetprice: '0',
    volume: '1000000',
    tag: '0x0000000000000000000000000000000000000000000000000000000000000000',
    apprestrict: '0x0000000000000000000000000000000000000000',
    workerpoolrestrict: '0x0000000000000000000000000000000000000000',
    requesterrestrict: '0x0000000000000000000000000000000000000000',
  },
  workerpoolorder: {
    workerpool: '0x0000000000000000000000000000000000000000',
    workerpoolprice: '0',
    volume: '1',
    category: '0',
    trust: '0',
    tag: '0x0000000000000000000000000000000000000000000000000000000000000000',
    apprestrict: '0x0000000000000000000000000000000000000000',
    datasetrestrict: '0x0000000000000000000000000000000000000000',
    requesterrestrict: '0x0000000000000000000000000000000000000000',
  },
  requestorder: {
    app: '0x0000000000000000000000000000000000000000',
    appmaxprice: '0',
    dataset: '0x0000000000000000000000000000000000000000',
    datasetmaxprice: '0',
    workerpool: '0x0000000000000000000000000000000000000000',
    workerpoolmaxprice: '0',
    volume: '1',
    category: '0',
    trust: '0',
    tag: '0x0000000000000000000000000000000000000000000000000000000000000000',
    beneficiary: '0x0000000000000000000000000000000000000000',
    callback: '0x0000000000000000000000000000000000000000',
    params: '',
  },
};

const category = {
  name: 'XXL',
  description: 'new hub category',
  workClockTimeRef: '100',
};

const chains = {
  default: 'kovan',
  chains: {
    dev: {
      host: 'http://localhost:8545',
      sms: 'http://localhost:5000',
      id: '1544020727674',
      hub: '0x7C788C2B85E20B4Fa25bd579A6B1D0218D86BDd1',
      // hub: '0x531C0Cf1EF13099C3d3D7D90D522C89A06880113',
      // native: true,
    },
    ropsten: {
      host: 'https://ropsten.infura.io/v3/f3e0664e01504f5ab2b4360853ce0dc7',
      id: '3',
    },
    rinkeby: {
      host: 'https://rinkeby.infura.io/v3/f3e0664e01504f5ab2b4360853ce0dc7',
      id: '4',
    },
    kovan: {
      host: 'https://kovan.infura.io/v3/f3e0664e01504f5ab2b4360853ce0dc7',
      id: '42',
      sms: 'https://sms-kovan.iex.ec',
    },
    goerli: {
      host: 'https://goerli.infura.io/v3/f3e0664e01504f5ab2b4360853ce0dc7',
      hub: '0x99d8717a84d1e97422d04d9a2a82694038470753',
      id: '5',
      bridge: {
        contract: '0x1e32aFA55854B6c015D284E3ccA9aA5a463A1418',
        bridgedNetworkId: '133',
      },
    },
    viviani: {
      host: 'https://viviani.iex.ec',
      id: '133',
      hub: '0xD1c670F25E5D9eC66DC82feD45e38Dc3f3f0Cd65',
      native: true,
      bridge: {
        contract: '0x63CBf84596d0Dc13fCE1d8FA4470dc208390998a',
        bridgedNetworkId: '5',
      },
    },
    mainnet: {
      host: 'https://mainnet.infura.io/v3/f3e0664e01504f5ab2b4360853ce0dc7',
      id: '1',
      sms: 'https://sms-mainnet.iex.ec',
    },
  },
};

const createOrder = (orderName, overwrite = {}) => Object.assign({}, order[orderName], overwrite);
const overwriteObject = (obj, overwrite = {}) => Object.assign({}, obj, overwrite);

module.exports = {
  main,
  app,
  dataset,
  workerpool,
  category,
  buyConf,
  dapps,
  chains,
  overwriteObject,
  createOrder,
};
