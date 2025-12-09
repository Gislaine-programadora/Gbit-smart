import hre from "hardhat";

async function main() {
  const contractAddress = process.argv[2];
  const to = process.argv[3];
  const amount = process.argv[4];

  const Contract = await hre.ethers.getContractAt("MyToken", contractAddress);

  const tx = await Contract.mint(to, amount);
  await tx.wait();

  console.log("Mintado com sucesso!");
}

main();
