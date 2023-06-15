const { ethers } = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();
  const account = accounts[0].address;
  console.log(account);
  const proxyContract = await ethers.getContractAt(
    "Proxy",
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    account
  );
  try {
    const tx = await proxyContract.callContract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    );
    console.log("success");
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    process.exit(1);
  });
