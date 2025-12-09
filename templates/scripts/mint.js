import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  const contractAddress = process.env.CONTRACT_ADDRESS;

  const Token = await ethers.getContractFactory("GbitToken");
  const token = Token.attach(contractAddress);

  const to = process.argv[2];
  const amount = ethers.parseEther(process.argv[3]);

  const tx = await token.mint(to, amount);
  await tx.wait();

  console.log("Minted:", amount, "to", to);
}
main().catch(console.error);
