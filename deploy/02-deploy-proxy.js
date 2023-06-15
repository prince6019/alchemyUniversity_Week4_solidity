const { ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  const proxy = await deploy("Proxy", {
    from: deployer,
    args: "",
    log: true,
  });

  log("deployed proxy ..................");
  log("proxy Address : ", proxy.address);

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("verifying....");
    await verify(proxy.address, "");
  }
};

module.exports.tags = ["proxy", "all"];
