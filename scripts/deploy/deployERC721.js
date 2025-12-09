import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", await deployer.getAddress());

  const NFT = await hre.ethers.getContractFactory("ERC721Gbit");
  const nft = await NFT.deploy("Gbit Collectibles", "GBC");
  await nft.deployTransaction.wait();
  console.log("ERC721 deployed at:", nft.target);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
