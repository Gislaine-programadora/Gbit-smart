import { ethers } from "ethers";
import inquirer from "inquirer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

export default async function deployContract() {
  console.log("🚀 Deploy SmartLayer\n");

  // Selecionar rede
  const { network } = await inquirer.prompt([
    {
      type: "list",
      name: "network",
      message: "Selecione a rede:",
      choices: ["localhost", "sepolia", "bsc-testnet"],
    }
  ]);

  // Provider por rede
  const RPC = {
    localhost: "http://127.0.0.1:8545",
    sepolia: process.env.SEPOLIA_RPC,
    "bsc-testnet": process.env.BSC_TESTNET_RPC
  };

  const PRIVATE_KEY =
    process.env.PRIVATE_KEY || process.env.DEPLOYER_KEY;

  if (!PRIVATE_KEY) {
    console.log("❌ PRIVATE_KEY não encontrado no .env");
    return;
  }

  const provider = new ethers.JsonRpcProvider(RPC[network]);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  // Localizar ABI + bytecode
  const artifactPath = path.join(
    process.cwd(),
    "artifacts/contracts/MyToken.sol/MyToken.json"
  );

  if (!fs.existsSync(artifactPath)) {
    console.log("❌ Artefato não encontrado. Execute: npx hardhat compile");
    return;
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  const factory = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    wallet
  );

  console.log(`🚀 Deploying contract to ${network}...`);

  try {
    const contract = await factory.deploy();
    await contract.waitForDeployment();

    const address = await contract.getAddress();

    console.log(`\n🎉 CONTRATO DEPLOYADO COM SUCESSO!`);
    console.log(`📌 Endereço: ${address}\n`);

    // Salvar endereço na pasta smartlayer
    const saveDir = path.join(process.cwd(), "smartlayer");
    if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir);

    fs.writeFileSync(
      path.join(saveDir, `deployed-${network}.json`),
      JSON.stringify({ address }, null, 2)
    );

    return address;

  } catch (err) {
    console.log("❌ Erro no deploy:");
    console.log(err.message);
  }
}
