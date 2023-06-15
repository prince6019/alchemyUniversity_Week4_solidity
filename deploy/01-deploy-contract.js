const { ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  log("deploying contract ...................");

  const contract = await deploy("Contract", {
    from: deployer,
    args: "",
    log: true,
  });
  log("deployed ...............");
  log("contract address : ", contract.address);

  async () => {
    if (
      !developmentChains.includes(network.name) &&
      process.env.ETHERSCAN_API_KEY
    ) {
      log("verifying....");
      await verify(contract.address, "");
    }
  };
};

module.exports.tags = ["contract", "all"];
