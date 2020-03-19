const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = "70d7f44c7e66409f95dedb7b870343b0";
const mnemonic = "cycle oil chronic business awesome model patient alert throw host great soup";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`),
        network_id: 3,       // ropsten's id
        gas: 4500000,        // ropsten has a lower block limit than mainnet
        gasPrice: 10000000000
    },

    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
        network_id: 4,       // rinkeby's id
        gas: 4500000,        // rinkeby has a lower block limit than mainnet
        gasPrice: 10000000000
    }
  }
};