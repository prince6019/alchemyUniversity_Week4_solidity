require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x";
const SEPOLIA_API_KEY = process.env.SEPOLIA_API_KEY || "0x";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.0" }, { version: "0.8.17" }],
  },

  defaultNetwork: "hardhat",

  networks: {
    localhost: {
      chainId: 31337,
    },
    sepolia: {
      url: SEPOLIA_API_KEY,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      saveDeployments: true,
      blockConfirmations: 6,
      gasPrice: 35000000000,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    player: {
      default: 1,
    },
  },

  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
  mocha: {
    timeout: 500000, // 500 seconds max for running tests
  },
};
