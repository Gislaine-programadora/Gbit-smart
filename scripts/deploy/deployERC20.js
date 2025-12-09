import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", await deployer.getAddress());

  const ERC20 = await hre.ethers.getContractFactory("ERC20Gbit");
  const token = await ERC20.deploy("Gbit Token", "GBT", hre.ethers.parseUnits("1000000", 18));
  await token.deployTransaction.wait();
  console.log("ERC20 deployed at:", token.target);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
