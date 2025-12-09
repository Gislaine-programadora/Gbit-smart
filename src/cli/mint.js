import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import chalk from "chalk";

export default async function mintCmd(to, amount) {
  try {
    const projectDir = process.cwd();

    // Verifica se o contrato foi implantado
    const deployFile = path.join(projectDir, "smartlayer", "deployed-address.json");
    if (!fs.existsSync(deployFile)) {
      console.log(chalk.red("❌ Nenhum contrato encontrado! Rode: gbit deploy"));
      return;
    }

    const { address: contractAddress, network } = JSON.parse(fs.readFileSync(deployFile));

    // Carrega ABI do token
    const abiPath = path.join(projectDir, "smartlayer", "abi", "GbitToken.json");
    const abi = JSON.parse(fs.readFileSync(abiPath)).abi;

    // Configura provider + signer
    const provider =
      network === "localhost"
        ? new ethers.JsonRpcProvider("http://127.0.0.1:8545")
        : new ethers.JsonRpcProvider(process.env.PRIVATE_RPC);

    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    console.log(chalk.cyan(`\n🚀 Minting ${amount} GBIT para ${to}...`));

    // Executa mint (assumindo que seu contrato tem função mint)
    const tx = await contract.mint(to, ethers.parseUnits(amount, 18));

    console.log(chalk.yellow(`⏳ Tx Hash: ${tx.hash}`));
    await tx.wait();

    console.log(chalk.green(`✅ Mint concluído!`));
    console.log(chalk.green(`📌 ${amount} GBIT → ${to}\n`));
  } catch (e) {
    console.log(chalk.red("❌ Erro ao mintar tokens"));
    console.error(e.message);
  }
}
