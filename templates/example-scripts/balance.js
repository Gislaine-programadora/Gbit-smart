import hre from "hardhat";

async function main() {
  const contractAddress = process.argv[2];
  const account = process.argv[3];

  const Contract = await hre.ethers.getContractAt("MyToken", contractAddress);

  const bal = await Contract.balanceOf(account);
  console.log(`Saldo: ${bal.toString()}`);
}

main();
