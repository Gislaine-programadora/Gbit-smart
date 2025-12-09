import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import chalk from "chalk";

export default async function supplyCmd() {
  try {
    const projectDir = process.cwd();

    // Arquivo com o endereço do contrato
    const deployFile = path.join(projectDir, "smartlayer", "deployed-address.json");
    if (!fs.existsSync(deployFile)) {
      console.log(chalk.red("❌ Nenhum contrato encontrado! Rode: gbit deploy"));
      return;
    }

    const { address: contractAddress, network } = JSON.parse(fs.readFileSync(deployFile));

    // ABI
    const abiPath = path.join(projectDir, "smartlayer", "abi", "GbitToken.json");
    const abi = JSON.parse(fs.readFileSync(abiPath)).abi;

    // Provider
    const provider =
      network === "localhost"
        ? new ethers.JsonRpcProvider("http://127.0.0.1:8545")
        : new ethers.JsonRpcProvider(process.env.PRIVATE_RPC);

    const contract = new ethers.Contract(contractAddress, abi, provider);

    // Chamada totalSupply
    const supply = await contract.totalSupply();
    const decimals = await contract.decimals();
    const formattedSupply = ethers.formatUnits(supply, decimals);

    console.log(chalk.cyan("\n📦 TOTAL SUPPLY DO TOKEN GBIT"));
    console.log(chalk.green(`${formattedSupply} GBIT\n`));

  } catch (e) {
    console.log(chalk.red("❌ Erro ao consultar Total Supply"));
    console.error(e.message);
  }
}
