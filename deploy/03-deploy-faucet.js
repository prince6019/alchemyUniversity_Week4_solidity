const { ethers } = require("hardhat");

// const AMOUNT = ethers.utils.parseEther("3");

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  log("deploying faucet contract -------------");
  const faucet = await deploy("Faucet", {
    from: deployer,
    args: "",
    value: "5000000000000000000",
    log: true,
  });
  log("--------------------------");
  log("faucet deployed at address : ", faucet.address);
};

module.exports.tags = ["faucet", "all"];
