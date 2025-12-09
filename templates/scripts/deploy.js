import { ethers } from "hardhat";

async function main() {
  console.log("⏳ Deploying contract...");

  const Contract = await ethers.getContractFactory("GbitToken");
  const contract = await Contract.deploy("0x0000000000000000000000000000000000000001");

  await contract.waitForDeployment();

  console.log("🚀 Contract deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


