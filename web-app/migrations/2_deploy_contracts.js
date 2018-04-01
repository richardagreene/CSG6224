var WineSecure = artifacts.require("./wineSecure.sol");

module.exports = function(deployer) {
  deployer.deploy(WineSecure);
};
