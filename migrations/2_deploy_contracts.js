// migrating the appropriate contracts
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
let SquareVerifier = artifacts.require('SquareVerifier');

module.exports = function(deployer, network, accounts) {
  deployer.deploy(SquareVerifier, {from: accounts[0]})
    .then(() => {
      return deployer.deploy(SolnSquareVerifier, SquareVerifier.address)
    });
}