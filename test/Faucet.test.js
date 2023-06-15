const { ethers, deployments } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { assert, expect } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("faucet", () => {
      let faucet, deployer, player;
      beforeEach(async () => {
        const accounts = await ethers.getSigners();
        deployer = accounts[0];
        player = accounts[1];
        await deployments.fixture(["faucet"]);
        faucet = await ethers.getContract("Faucet");
      });

      describe("Constructor", () => {
        it("should set the owner of the contract correctly ", async () => {
          const owner = await faucet.owner();
          assert.equal(owner, deployer.address);
        });
      });

      describe("Withdraw", () => {
        it("users can not withdraw more than 0.1 eth at a time ", async () => {
          const amount = ethers.utils.parseEther("0.2");
          await expect(faucet.withdraw(amount)).to.be.reverted;
        });

        it("updated the user balance by 0.1 eth", async () => {
          const initialBalance = await ethers.provider.getBalance(
            faucet.address
          );
          const amount = ethers.utils.parseEther("0.01");
          await faucet.connect(player).withdraw(amount);
          const updatedBalance = await ethers.provider.getBalance(
            faucet.address
          );
          expect(updatedBalance).to.equal(initialBalance.sub(amount));
        });
      });

      describe("WithdrawAll", () => {
        it("only owner can withdraw all the funds of the contract otherwise fail", async () => {
          await expect(faucet.connect(player).withdrawAll()).to.be.reverted;
        });
      });

      describe("selfDestruct", () => {
        it("self Destruct the contract which only can be call by owner", async () => {
          await expect(faucet.connect(player).destroyFaucet()).to.be.reverted;
        });
      });
    });
