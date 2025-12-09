import hre from "hardhat";

async function main() {
  const Contract = await hre.ethers.getContractFactory("MyToken");
  const contract = await Contract.deploy();
  await contract.waitForDeployment();
  console.log("🚀 Deploy:", await contract.getAddress());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
